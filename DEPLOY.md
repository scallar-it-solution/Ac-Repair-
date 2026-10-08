# Deploying to a Hostinger VPS

Every push to `main` runs [.github/workflows/ci-cd.yml](.github/workflows/ci-cd.yml):

1. **Verify:** typecheck, production build, then the content & spam-policy audit. A failure stops the release.
2. **Image:** builds the [Dockerfile](Dockerfile). On `main`, with Docker Hub credentials present, it pushes
   `docker.io/pateldeepesh/acrepair:sha-<full commit SHA>` and `:latest`. `DOCKERHUB_REPOSITORY` can override the repository.
   Without credentials it builds without pushing, so CI still validates the Dockerfile.
3. **Deploy:** copies [deploy/docker-compose.yml](deploy/docker-compose.yml), [deploy/Caddyfile](deploy/Caddyfile) and
   [deploy/remote-deploy.sh](deploy/remote-deploy.sh) to the server over SSH, pulls that exact image and restarts. Caddy serves `https://frostwright.in` with a free Let's Encrypt
   certificate and redirects `www` to it.

Pull requests verify and build without pushing. Deploy runs only after an image was pushed and `DEPLOY_ENABLED=true`.

This needs a Hostinger **VPS** (KVM plan). Shared or Cloud web hosting cannot run Docker.

## One-time setup

### 1. Create the VPS

In hPanel → **VPS**, install the **Ubuntu 24.04 with Docker** template. Note the server's IP address.

In the VPS **Firewall** settings, allow inbound TCP 22, 80 and 443, plus UDP 443 for HTTP/3.

### 2. Point the domain at it

In hPanel → **Domains → frostwright.in → DNS / Nameservers**:

| Type | Name | Value |
|---|---|---|
| A | `@` | the VPS IP |
| CNAME | `www` | `frostwright.in` |

Delete any other `A`/`AAAA` records for `@` or `www`. Wait until `nslookup frostwright.in` returns the VPS IP. Caddy can only get the certificate after that.

### 3. Create a deploy user on the server

SSH in as root and run:

```bash
adduser --disabled-password --gecos "" deploy
usermod -aG docker deploy
mkdir -p /opt/frostwright && chown deploy:deploy /opt/frostwright
docker compose version   # needs v2.18 or newer (--wait-timeout)
```

### 4. Create the deploy SSH key

On your own computer:

```bash
ssh-keygen -t ed25519 -C "github-actions-deploy" -f ~/.ssh/frostwright_deploy -N ""
```

Put the **public** key on the server:

```bash
# on the server, as root
mkdir -p /home/deploy/.ssh
echo "<contents of ~/.ssh/frostwright_deploy.pub>" >> /home/deploy/.ssh/authorized_keys
chown -R deploy:deploy /home/deploy/.ssh && chmod 700 /home/deploy/.ssh && chmod 600 /home/deploy/.ssh/authorized_keys
```

Record the server's host key so GitHub can verify it is talking to your server:

```bash
ssh-keyscan -H <VPS IP>
```

For a custom SSH port, use `ssh-keyscan -p <port> -H <VPS IP>`. Compare the fingerprint with the host key shown
through the Hostinger VPS console before storing it. CI requires this pinned key; it never trusts a new key automatically.
Test `ssh -i ~/.ssh/frostwright_deploy deploy@<VPS IP> 'docker compose version'` before enabling deploys.

### 5. Add the GitHub settings

In Docker Hub, open your avatar → **Account settings → Personal access tokens → Generate new token**
([token settings](https://app.docker.com/settings/personal-access-tokens)). Create a **Read & Write** token for
GitHub Actions and copy it directly into `DOCKERHUB_TOKEN`. Use tokens rather than your account password.

The repository is `pateldeepesh/acrepair`. To allow anonymous server pulls, open its **Settings → Visibility → Public**
and save. If you keep it private, create a separate **Read-only** token and add `DOCKERHUB_PULL_TOKEN`; the VPS then
logs in before pulling and logs out afterwards. Both tokens travel through stdin and are never printed.

Repository → **Settings → Secrets and variables → Actions**:

| Secrets | Value |
|---|---|
| `DOCKERHUB_USERNAME` | `pateldeepesh` |
| `DOCKERHUB_TOKEN` | Docker Hub personal access token with **Read & Write** permission |
| `DOCKERHUB_PULL_TOKEN` | optional **Read-only** token; required when the Docker Hub repository is private |
| `VPS_HOST` | the VPS IP |
| `VPS_USER` | `deploy` |
| `VPS_SSH_KEY` | the full contents of the **private** key file `~/.ssh/frostwright_deploy` |
| `VPS_KNOWN_HOSTS` | the output of `ssh-keyscan` from step 4 |
| `VPS_PORT` | only if SSH is not on port 22 |

| Variables | Value |
|---|---|
| `DEPLOY_ENABLED` | `true` (this switches the deploy job on) |
| `SITE_URL` | `https://frostwright.in` (enables the post-deploy smoke test) |
| `DEPLOY_PATH` | only if not `/opt/frostwright` |
| `DOCKERHUB_REPOSITORY` | `pateldeepesh/acrepair` (default); namespace/repository, without a registry prefix or tag |
| `VPS_DEPLOY_MODE` | `standalone` (default) or `shared` for the existing Quorlytic VPS described below |

Optional: under **Settings → Environments → production**, add yourself as a required reviewer so each deploy waits for a click.

Keep the private key outside the repository in a password manager or protected SSH directory. Never commit keys, tokens or `.env` files.

### 6. First deploy

**Actions → CI/CD → Run workflow** on `main`, or push a commit. The deploy job prints `docker compose ps` at the end. The site should be live at `https://frostwright.in` within a minute or two of DNS resolving.

Confirm **verify** and **image** are green before switching deploys on. Add all VPS secrets, confirm DNS and SSH access,
then set `DEPLOY_ENABLED=true` and run the workflow on `main`. The deploy uses `sha-<full commit SHA>`, never `latest`.
For a private Docker Hub repository, ensure the read-only pull token is present before this first deploy.

## Day to day

- **Release:** merge or push to `main`.
- **Roll back:** in **Actions**, open an earlier successful run and re-run its deploy job (or **Re-run all jobs** if individual re-runs are unavailable). That redeploys that run's commit image. Or, on the server:
  ```bash
  cd /opt/frostwright && IMAGE=pateldeepesh/acrepair:sha-<commit> bash remote-deploy.sh
  ```
  Replace `<commit>` with the full SHA. `docker images` lists builds still on the server; cached images can be rolled back offline.
  Unused images older than 30 days are pruned. If the image is no longer cached and the repository is private, log in with
  a read-only token via `docker login -u pateldeepesh --password-stdin` before rolling back, then `docker logout` afterwards.
- **Logs:** `cd /opt/frostwright && docker compose logs -f web` (site) or `... logs -f caddy` (HTTPS / requests).
- **Status:** `docker compose ps`. The `web` container reports `healthy` when the site responds.

## If ports 80/443 are already in use

### Existing Quorlytic VPS (shared mode)

The current Hostinger server already runs multiple sites behind its Caddy on `proxy_net`. Its `deploy` account has
restricted sudo and must stay outside the docker group. Use `VPS_DEPLOY_MODE=shared`, `VPS_USER=deploy` and the existing
deploy key. This mode sends only a validated immutable image request; CI cannot overwrite privileged server files.

An administrator installs these files once (and repeats installation when shared deployment configuration changes):

- `deploy/docker-compose.shared.yml` into `/srv/scallar/frostwright/compose/`, root-owned and not writable by `deploy`.
  Install `deploy/shared-nginx.conf` there as `shared-nginx.template.conf`; the driver writes the selected slot into
  the live `shared-nginx.conf`. On a new installation, also copy the template to the live filename initially.
- `deploy/shared-vps-deploy.sh` as `/srv/scallar/shared/bin/frostwright-deploy.sh`, `root:root`, mode `0755`.
- A root-owned `/srv/scallar/frostwright/env/deploy.env` (mode `0600`) with `IMAGE=` initially empty, and a
  `/srv/scallar/frostwright/inbox/` directory owned by `deploy`; only the inbox is writable by that account.
- A sudoers file allowing `deploy` exactly the wrapper's `login`, `logout`, `deploy` and `status` commands, without
  wildcards. Validate it with `visudo -cf` before enabling it.

The Next.js slots have read-only filesystems and an internal network; a small nginx edge connects them to the existing
proxy. Neither publishes host ports. Each release starts the inactive blue or green slot, checks its health and routes,
then gracefully reloads nginx. The driver verifies HTTPS and the new `X-Frostwright-Slot` header before removing the
old slot. A failed check switches back to the previous slot.

After a successful switch, the old container and every obsolete `pateldeepesh/acrepair` image are deleted; only the
active image stays on the VPS. Between releases, only one app slot runs. Rollback therefore pulls the old immutable
image from Docker Hub again rather than relying on a local copy. Cleanup is limited to this application's repository.
Docker Hub login, when needed, uses an isolated root-only Docker configuration for Frostwright.

Once DNS points to the VPS, install `deploy/shared-Caddyfile` into the existing
proxy's `/srv/scallar/shared/proxy/conf/sites/` directory as `frostwright.caddy`, then validate and gracefully reload:

```bash
sudo docker exec caddy caddy validate --config /etc/caddy/Caddyfile
sudo docker exec caddy caddy reload --config /etc/caddy/Caddyfile
```

Set `SITE_URL=https://frostwright.in` after this public HTTPS route is ready, so subsequent deployments also check it.
For a new shared installation, activate this proxy route before the first blue/green workflow: the driver verifies
the candidate through that HTTPS route before accepting the release.
For an admin rollback, write `docker.io/pateldeepesh/acrepair:sha-<full commit SHA>` into the requested-image file and
run `sudo /srv/scallar/shared/bin/frostwright-deploy.sh deploy`. As `deploy`, use the enumerated sudo command. Check
status with `sudo -n /srv/scallar/shared/bin/frostwright-deploy.sh status`.

### Other existing proxies

Some VPS templates already run nginx or Traefik. Either stop that service, or remove the `caddy` service from
`deploy/docker-compose.yml` and publish the site on localhost for the existing proxy:

```yaml
  web:
    ports:
      - "127.0.0.1:3000:3000"
```

Then proxy `frostwright.in` to `http://127.0.0.1:3000` and redirect `www` to the apex. Canonical URLs are `https://frostwright.in/...` with no `www`.

## Before go-live

- Verify the business claims with the owner: "4.9/5 from 1,284+ customers", "18,400+ jobs", "Since 2014", the author's
  "14 years" bio, testimonials, team/author names and all prices. Also confirm `hello@frostwright.in`, the dispatch desk
  address `New Delhi 110019` and phone `+91 93155 15700`. Deployment does not establish that these claims are accurate.

- The earlier Vercel copy (`airkraft-ac-repair.vercel.app`) still exists. Its canonical tags already point to
  frostwright.in, but delete that Vercel project once this server is live so only one copy of the site is public.
- In Google Search Console, add `frostwright.in` as a Domain property and submit `https://frostwright.in/sitemap.xml`.

## Shared VPS configuration (7 October 2026)

- Docker Hub `pateldeepesh/acrepair` is public; no pull token is needed.
- GitHub has `DOCKERHUB_USERNAME`, `DOCKERHUB_TOKEN`, `VPS_HOST`, `VPS_USER`, `VPS_SSH_KEY` and `VPS_KNOWN_HOSTS` configured. The VPS is
  `187.127.146.219`; the existing restricted `deploy` key is used, never the administrator's key.
- Variables: `DEPLOY_ENABLED=true`, `DOCKERHUB_REPOSITORY=pateldeepesh/acrepair`, `VPS_DEPLOY_MODE=shared`,
  `DEPLOY_PATH=/srv/scallar/frostwright`. The root-owned shared deployment files and fixed sudo commands are installed.
- `frostwright.in` resolves to `187.127.146.219`, with `www` pointing to the apex.
- The shared Caddy site is active, TLS is configured, and `SITE_URL=https://frostwright.in` enables public smoke tests.
  Releases use blue/green slots and remove the retired container and obsolete Frostwright images after a healthy switch.
