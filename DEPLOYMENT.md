# Deployment Guide

## Zero-Downtime Deployment 🚀

The project implements **zero-downtime deployment** using PM2 cluster mode and graceful reloads. This means users won't experience any service interruption during deployments.

## Automated Deployment

The project uses GitHub Actions for automated zero-downtime deployment to the UFPR server. The deployment is triggered on:
- Manual workflow dispatch
- Push to the `main` branch

## Zero-Downtime Deployment Process

The deployment workflow performs the following steps:

1. **Backup current build** - Creates a backup of the current `.next` directory
2. **Install dependencies** - Installs all required packages
3. **Build application** - Creates production build with Next.js
4. **Health check** - Verifies the new build is valid
5. **Graceful reload** - PM2 performs zero-downtime reload of worker processes
6. **Verify deployment** - Checks if the application is responding correctly
7. **Rollback if needed** - Automatically rolls back if health checks fail
8. **Cleanup** - Removes backup files after successful deployment

## Manual Deployment

### Zero-Downtime Deployment (Recommended)

```bash
# Zero-downtime deployment with automatic rollback
npm run deploy

# Or directly run the script
./deploy.sh
```

### Traditional Deployment (With Downtime)

```bash
# Stop application
npm run pm2:stop

# Build and start
npm ci
npm run build
npm run pm2:start
```

### Health Check

```bash
# Check if application is healthy
npm run health-check

# Quick curl check
curl http://localhost:3000
```

## PM2 Management

The application uses PM2 in **cluster mode** for zero-downtime deployments with the following configuration:

- **App name**: `portal-front`
- **Instances**: `max` (uses all CPU cores)
- **Exec mode**: `cluster` (enables zero-downtime reloads)
- **Memory limit**: 1GB per instance
- **Auto-restart**: Enabled
- **Graceful shutdown**: 5 second timeout
- **Logs**: Stored in `./logs/` directory

### PM2 Commands

```bash
# Start the application
npm run pm2:start

# Stop the application
npm run pm2:stop

# Zero-downtime reload (recommended for updates)
npm run pm2:reload

# Restart the application (with downtime)
npm run pm2:restart

# Check status
npm run pm2:status

# View logs
npm run pm2:logs

# Monitor in real-time
npm run pm2:monit

# Health check
npm run health-check
```

## Environment Variables

Production environment variables should be configured in `.env.production`. Copy from the example:

```bash
cp .env.production.example .env.production
```

Then edit `.env.production` with your production values.

## Zero-Downtime Features

### Automatic Rollback
- If deployment fails, automatically rolls back to the previous version
- Backup is created before each deployment
- Health checks verify application is working after deployment

### Cluster Mode Benefits
- Multiple worker processes handle requests
- If one worker fails, others continue serving traffic
- Graceful reload replaces workers one by one
- No service interruption during updates

### Health Monitoring
- Automatic health checks during deployment
- Curl-based endpoint verification
- Response time monitoring
- Memory usage tracking

## Troubleshooting

### Build Error: "Could not find a production build"

This error occurs when:
1. The build process failed
2. The `.next` directory is missing
3. PM2 started before the build completed

**Solution**: The zero-downtime deployment includes automatic rollback and health checks.

### PM2 Process Issues

```bash
# Check application health
npm run health-check

# Check PM2 status
npm run pm2:status

# View detailed logs
npm run pm2:logs

# Zero-downtime reload (try first)
npm run pm2:reload

# Restart if needed (with downtime)
npm run pm2:restart

# If completely stuck, delete and restart
pm2 delete portal-front
npm run pm2:start
```

### Deployment Rollback

```bash
# If automatic rollback didn't work, manual rollback:
pm2 stop portal-front

# Restore from backup (if exists)
ls -la backup_*
cp -r backup_YYYYMMDD_HHMMSS/.next .
cp -r backup_YYYYMMDD_HHMMSS/node_modules . 2>/dev/null || true

# Start application
npm run pm2:start
```

### Memory Issues

The PM2 configuration includes a 1GB memory limit. If you encounter memory issues:

1. Check memory usage: `pm2 monit`
2. Increase the limit in `ecosystem.config.js`
3. Restart the application: `pm2 restart portal-front`

## File Structure

- `ecosystem.config.js` - PM2 cluster configuration for zero-downtime
- `deploy.sh` - Zero-downtime deployment script with rollback
- `health-check.sh` - Application health monitoring script
- `.env.production.example` - Environment variables template
- `.github/workflows/push-to-ufpr-workflow.yml` - GitHub Actions zero-downtime workflow
- `logs/` - Application logs directory
- `backup_*/` - Automatic backup directories (temporary)