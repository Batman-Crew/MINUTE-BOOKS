# Deploying the Minute Books website to Hetzner

This guide puts the site on a new Hetzner Cloud server with HTTPS. It takes about 30–45 minutes. Run every command exactly as shown and replace only the parts in `<angle brackets>`.

**What you need before starting**

- The `minutebooks-website.zip` file.
- Access to the Hetzner Cloud console (https://console.hetzner.com).
- Someone who can edit DNS for `minutebooks.in` at Hostinger (hPanel → Domains → minutebooks.in → DNS / Nameservers).
- An SSH key on your own computer. If you don't have one, run `ssh-keygen -t ed25519` and press Enter at every question. Your public key is in `~/.ssh/id_ed25519.pub`.
- The Gmail App Password for `minutebooksofficial@gmail.com`. The site owner can give you this. It is **not** the normal Gmail password. Without it the site still works, but the contact and demo forms can't send email.

**Important:** `minutebooks.in` currently points at an older site hosted on Vercel. Don't change the existing `@` DNS record until step 9. Until then the live site is untouched.

---

## 1. Create the server

In the Hetzner console, open the project and click **Add Server**:

| Setting | Choose |
|---|---|
| Location | Nuremberg or Falkenstein, Germany (or Helsinki) |
| Image | **Ubuntu 24.04** |
| Type | Shared vCPU, **CX22** (2 vCPU, 4 GB RAM), about €4–5/month |
| Networking | Public IPv4 **on**, IPv6 on |
| SSH keys | **Add SSH key** → paste the contents of your `~/.ssh/id_ed25519.pub` |
| Name | `minutebooks-website` |

Leave everything else as it is and click **Create & Buy now**. Copy the server's **IPv4 address**. It's written as `<SERVER_IP>` below.

## 2. Log in and install the software

On your own computer:

```bash
ssh root@<SERVER_IP>
```

Type `yes` if asked about the fingerprint. Then run these commands on the server; it's fine to paste the whole block at once:

```bash
apt-get update && apt-get -y upgrade
apt-get install -y curl unzip ufw debian-keyring debian-archive-keyring apt-transport-https gnupg

# Node.js 22
curl -fsSL https://deb.nodesource.com/setup_22.x | bash -
apt-get install -y nodejs

# Caddy (web server with automatic HTTPS)
curl -1sLf https://dl.cloudsmith.io/public/caddy/stable/gpg.key | gpg --dearmor -o /usr/share/keyrings/caddy-stable-archive-keyring.gpg
curl -1sLf https://dl.cloudsmith.io/public/caddy/stable/debian.deb.txt -o /etc/apt/sources.list.d/caddy-stable.list
apt-get update && apt-get install -y caddy

# Firewall: allow SSH and web traffic only
ufw allow OpenSSH && ufw allow 80 && ufw allow 443 && ufw --force enable

# A normal user that runs the site
adduser --disabled-password --gecos "" deploy
mkdir -p /srv/minutebooks-website && chown deploy:deploy /srv/minutebooks-website
```

To check it worked, run `node -v`, which should print `v22.something`, and `caddy version`, which should print a version number.

## 3. Upload the zip

Open a **second terminal on your own computer**, in the folder that contains the zip, and run:

```bash
scp minutebooks-website.zip root@<SERVER_IP>:/root/
```

Back in the server terminal:

```bash
unzip -o /root/minutebooks-website.zip -d /srv/
chown -R deploy:deploy /srv/minutebooks-website
ls /srv/minutebooks-website     # should list package.json, src, public, deploy …
```

## 4. Add the settings file

```bash
cp /srv/minutebooks-website/.env.example /srv/minutebooks-website/.env.production.local
nano /srv/minutebooks-website/.env.production.local
```

Change these lines:

```
NEXT_PUBLIC_SITE_URL=https://www.minutebooks.in
SMTP_USER=minutebooksofficial@gmail.com
SMTP_PASS=<16-character Gmail App Password, no spaces>
```

Leave the other lines empty. Save with `Ctrl+O`, `Enter`, then exit with `Ctrl+X`. Then lock the file down so only the site can read it:

```bash
chown deploy:deploy /srv/minutebooks-website/.env.production.local
chmod 600 /srv/minutebooks-website/.env.production.local
```

**Do this before step 5.** Lines starting with `NEXT_PUBLIC_` are baked in at build time, so changing them later means rebuilding.

## 5. Build the site

```bash
cd /srv/minutebooks-website
sudo -u deploy npm ci --no-audit --no-fund
sudo -u deploy npm run build
```

The build takes 1–3 minutes and must end without `Error`. It downloads Google Fonts, so the server needs internet access, which it has by default.

## 6. Keep the site running

```bash
cp /srv/minutebooks-website/deploy/minutebooks-website.service /etc/systemd/system/
systemctl daemon-reload
systemctl enable --now minutebooks-website
sleep 5
systemctl status minutebooks-website --no-pager      # should say "active (running)"
curl -s -o /dev/null -w "%{http_code}\n" http://127.0.0.1:3000/   # should print 200
```

The site now starts automatically after a reboot and restarts itself if it crashes.

## 7. Add the test address in DNS

At Hostinger (hPanel → Domains → minutebooks.in → **DNS / Nameservers** → DNS records), **add** one record. Don't edit the existing records yet.

| Type | Name | Points to | TTL |
|---|---|---|---|
| A | `new` | `<SERVER_IP>` | 300 |

Wait about 5 minutes, then check from your own computer:

```bash
nslookup new.minutebooks.in     # must show <SERVER_IP>
```

## 8. Turn on HTTPS for the test address

On the server:

```bash
cat > /etc/caddy/Caddyfile <<'EOF'
new.minutebooks.in {
	encode zstd gzip
	reverse_proxy 127.0.0.1:3000
}
EOF
systemctl reload caddy
```

Caddy gets the HTTPS certificate on its own within a minute. Open **https://new.minutebooks.in** in a browser and check:

- [ ] The home page loads with a padlock and no certificate warning.
- [ ] Products, Industries, Pricing and Contact pages open, on a phone as well.
- [ ] Industry photos show.
- [ ] Submit the **Contact** form with your own details. The message should arrive at minutebooksofficial@gmail.com within a minute.

If something fails, see **Troubleshooting** below. **Show the site owner the test address and get their OK before step 9.**

## 9. Go live (replaces the current site)

Only do this once the owner has approved it.

1. On the server, set the Caddyfile to serve the real domain (you can keep the test address too):

   ```bash
   cat > /etc/caddy/Caddyfile <<'EOF'
   minutebooks.in, www.minutebooks.in, new.minutebooks.in {
   	encode zstd gzip
   	reverse_proxy 127.0.0.1:3000
   }
   EOF
   systemctl reload caddy
   ```

2. At Hostinger, **edit** the existing A record for `@`: change `216.198.79.1` to `<SERVER_IP>`. Leave the `www` CNAME (→ `minutebooks.in`) as it is; it follows `@` automatically. If there is an `AAAA` record for `@` or `www`, delete it or point it at the server's IPv6 address.

3. Wait 5–30 minutes, then open https://minutebooks.in and https://www.minutebooks.in. Both should show the new site with a padlock. While DNS switches over, Caddy may log a certificate error once; it retries by itself.

**To roll back**, change the `@` record back to `216.198.79.1`.

---

## Updating the site later

When you receive a new zip:

```bash
# on your computer
scp minutebooks-website.zip root@<SERVER_IP>:/root/

# on the server (the settings file is kept: it isn't in the zip)
unzip -o /root/minutebooks-website.zip -d /srv/
chown -R deploy:deploy /srv/minutebooks-website
cd /srv/minutebooks-website
sudo -u deploy npm ci --no-audit --no-fund
sudo -u deploy npm run build
systemctl restart minutebooks-website
```

## Troubleshooting

| Problem | What to do |
|---|---|
| `systemctl status` shows failed | Run `journalctl -u minutebooks-website -n 50 --no-pager` to see the error. Usually the build in step 5 didn't finish; run it again. |
| Browser shows "502" or a blank error | The site isn't running. Check step 6. |
| Certificate warning, or "can't reach" | Check `nslookup` shows `<SERVER_IP>`, and that ports 80 and 443 are open (`ufw status`). Then run `journalctl -u caddy -n 50 --no-pager`. |
| Form says it couldn't send | `SMTP_PASS` is missing or wrong. It must be a Gmail **App Password** (Google Account → Security → 2-Step Verification → App passwords). Fix it in `.env.production.local`, then run `systemctl restart minutebooks-website`. No rebuild is needed. |
| Out of memory during build | Add swap: `fallocate -l 2G /swapfile && chmod 600 /swapfile && mkswap /swapfile && swapon /swapfile`, then build again. |

## Files in `deploy/`

- `minutebooks-website.service` is the service used in step 6.
- `Caddyfile` is a template version of the file written in steps 8 and 9.
- `cloud-init.yaml` and `deploy.sh` are optional automation the original developer uses. You don't need them if you follow this guide.

## Security notes

- Never put passwords in chat, email or the zip. The only secret is `SMTP_PASS`, and it lives only in `/srv/minutebooks-website/.env.production.local` on the server.
- Log in with SSH keys, not passwords. When you choose an SSH key in step 1, Hetzner doesn't set a root password, so only your key can log in.
