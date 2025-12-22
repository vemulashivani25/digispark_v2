# DigiSpark - Deployment Guide

## Project Overview

DigiSpark is a modern React-based digital agency website built with:
- **React 18** - UI framework
- **Vite** - Build tool and dev server
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Framer Motion** - Animations
- **Supabase** - Backend (database, auth)

## Quick Start

### Prerequisites
- Node.js 18+ or Bun
- npm, yarn, or bun package manager

### Installation

```bash
# Install dependencies
npm install
# or
bun install
```

### Development

```bash
# Start development server
npm run dev
# or
bun dev
```

The app will be available at `http://localhost:8080`

### Production Build

```bash
# Create production build
npm run build
# or
bun run build
```

This creates an optimized build in the `dist/` folder.

## Deployment Options

### Option 1: Static Hosting (Recommended)

The `dist/` folder contains static files that can be deployed to:
- **Vercel** (recommended)
- **Netlify**
- **Cloudflare Pages**
- **AWS S3 + CloudFront**
- **Firebase Hosting**

#### Vercel Deployment
```bash
npm i -g vercel
vercel
```

#### Netlify Deployment
```bash
npm i -g netlify-cli
netlify deploy --prod --dir=dist
```

### Option 2: Traditional Web Hosting

1. Run `npm run build`
2. Upload contents of `dist/` folder to your web server
3. Configure server to serve `index.html` for all routes (SPA routing)

#### Apache (.htaccess)
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

#### Nginx
```nginx
location / {
  try_files $uri $uri/ /index.html;
}
```

### Option 3: Docker

```dockerfile
FROM node:18-alpine as build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

## Environment Variables

Create a `.env` file for local development:

```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

For production, configure these in your hosting platform's environment variables.

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── ui/             # Shadcn UI components
│   ├── blog/           # Blog-related components
│   ├── services/       # Service page components
│   └── ...
├── pages/              # Page components (routes)
├── hooks/              # Custom React hooks
├── contexts/           # React context providers
├── integrations/       # External service integrations
├── utils/              # Utility functions
├── assets/             # Static assets (images, lottie)
└── data/               # Static data files
```

## Performance Optimizations

This project includes:
- ✅ **Code Splitting** - Lazy loading for all routes
- ✅ **Tree Shaking** - Unused code removal
- ✅ **Minification** - Compressed JS/CSS
- ✅ **LazyMotion** - Reduced Framer Motion bundle
- ✅ **Image Optimization** - Use appropriate formats

## SEO Features

- ✅ Meta tags on all pages
- ✅ Open Graph tags for social sharing
- ✅ Twitter Card support
- ✅ Canonical URLs
- ✅ Semantic HTML structure
- ✅ robots.txt configured

## Supabase Configuration

The project uses Supabase for:
- User authentication
- Database storage
- Edge functions

To use your own Supabase instance:
1. Create a project at [supabase.com](https://supabase.com)
2. Update the credentials in `src/integrations/supabase/client.ts`
3. Run the migrations in `supabase/migrations/`

## Support

For issues or questions, contact the DigiSpark team.
