# Deployment Guide

This guide explains how to deploy the Loomi Lair Study Guide viewer to various hosting platforms.

## Build for Production

First, build the production-ready files:

```bash
cd viewer
npm install
npm run build
```

This creates optimized files in the `viewer/dist/` directory.

## Deployment Options

### 1. GitHub Pages

1. Update `viewer/vite.config.js` to set the base path:
```javascript
export default defineConfig({
  plugins: [vue()],
  base: '/Loomi-Lair-Study-Guide/'
})
```

2. Build the project:
```bash
cd viewer
npm run build
```

3. Deploy the `dist` folder to GitHub Pages using GitHub Actions or manual deployment.

### 2. Netlify

1. Connect your GitHub repository to Netlify
2. Set build settings:
   - **Build command**: `cd viewer && npm run build`
   - **Publish directory**: `viewer/dist`
3. Deploy!

Netlify will automatically handle routing for the single-page application.

### 3. Vercel

1. Install Vercel CLI: `npm install -g vercel`
2. Navigate to the viewer directory: `cd viewer`
3. Run: `vercel`
4. Follow the prompts to deploy

Or connect your GitHub repository directly in the Vercel dashboard.

### 4. Traditional Web Server (Apache/Nginx)

After building, copy the contents of `viewer/dist/` to your web server.

**Nginx configuration** for proper routing:
```nginx
server {
    listen 80;
    server_name yourdomain.com;
    root /path/to/dist;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }
}
```

**Apache configuration** (.htaccess):
```apache
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . /index.html [L]
</IfModule>
```

## Environment Variables

Currently, the application doesn't require environment variables. All configuration is handled through:
- `viewer/public/markdown/index.json` - List of available guides
- Markdown files in `viewer/public/markdown/`

## Custom Domain

After deploying to any platform, you can configure a custom domain:

1. **GitHub Pages**: Add a CNAME file to the `dist` folder
2. **Netlify/Vercel**: Configure in the dashboard settings
3. **Traditional Server**: Update DNS A/CNAME records

## Continuous Deployment

Set up automatic deployments on every push:

### GitHub Actions Example

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      
      - name: Setup Node
        uses: actions/setup-node@v2
        with:
          node-version: '18'
          
      - name: Install and Build
        run: |
          cd viewer
          npm install
          npm run build
          
      - name: Deploy
        uses: JamesIves/github-pages-deploy-action@4.1.5
        with:
          branch: gh-pages
          folder: viewer/dist
```

## Monitoring and Analytics

Consider adding:
- Google Analytics
- Plausible Analytics (privacy-friendly)
- Sentry for error tracking

Add tracking code in `viewer/index.html` or create a plugin in Vue.

## Performance Optimization

The build is already optimized, but consider:
- Enable gzip/brotli compression on your server
- Use a CDN for static assets
- Enable HTTP/2
- Set proper cache headers

## Troubleshooting

### Routing Issues (404 on refresh)
Make sure your server is configured to serve `index.html` for all routes.

### Asset Loading Issues
Check the `base` path in `vite.config.js` matches your deployment path.

### Build Errors
- Clear `node_modules` and reinstall: `rm -rf node_modules && npm install`
- Check Node.js version (requires v14+)

## Support

For issues or questions, please open an issue in the GitHub repository.
