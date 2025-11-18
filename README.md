# Discord Timestamps

This is a simple tool to create Discord timestamps.

Discord timestamps are automatically updating parts in your message. Every user will see these in their timezone. Choose whatever date and time you want, copy the code and paste it in your Discord message. Done!

Example of a relative timestamp in action:

![Example](https://discord-timestamps.tancred.de/preview.gif)

## For developers

### Development with Docker

1. Start dev container

```bash
docker compose up -d
```

2. Connect to container

```bash
docker exec -it discord-timestamps-dev-1 bash
```

3. Inside container, run:

```bash
npm run dev
```

4. Visit `http://localhost:5173`

### Production

I recommend to use an automatic deployment via GitHub Actions.
But if you want, you can manually start the container on Prod:

```bash
docker compose -f docker-compose.prod.yml up -d
```

### GitHub Actions Setup

Add these secrets to your GitHub repository:

- `DEPLOY_HOST` - Server hostname or IP
- `DEPLOY_USER` - SSH username
- `DEPLOY_SSH_KEY` - SSH private key
- `DEPLOY_PATH` - Deployment directory

Also copy the `.env.skel` file to `.env` to set a custom port.

```bash
cp .env.skel .env
```

## License

MIT
