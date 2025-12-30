# Tor Hidden Service Setup Guide

Hosting a mirror of **PublicRecord.fyi** on the Tor network ensures the site remains accessible even if the primary domain is censored or seized.

## Prerequisites
- A Linux server (Ubuntu/Debian recommended)
- Docker & Docker Compose (if running via container) OR Node.js installed locally.
- `tor` package installed (`sudo apt install tor`)

## 1. Configure Tor
Open your `torrc` file (usually at `/etc/tor/torrc`) and add the following lines (you can use the `torrc.example` in this repo as a reference):

```bash
HiddenServiceDir /var/lib/tor/publicrecord_service/
HiddenServicePort 80 127.0.0.1:3000
```

## 2. Restart Tor
```bash
sudo service tor restart
```

## 3. Get Your .onion Address
Run the following command to find your new hidden service address:

```bash
sudo cat /var/lib/tor/publicrecord_service/hostname
```

## 4. Run the Application
Ensure your application is running on port `3000`:

```bash
npm run start
# OR if using dev mode
npm run dev
```

## Security Best Practices
- **Isolation**: Run the Tor service and the web app in isolated containers if possible.
- **Firewall**: Ensure port 3000 is NOT accessible to the public internet, only to `127.0.0.1`.
- **Metadata**: Be careful not to leak your server's real IP address through application headers or error messages.

---
*Stay resilient. Protect the records.*
