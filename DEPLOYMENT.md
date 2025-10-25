# 🚀 IrrigaTech Deployment Guide

Deploy your Astro site with email functionality to various free hosting platforms.

## 📋 Prerequisites

1. **GitHub Repository**: Push your code to GitHub
2. **Email Configuration**: Set up SMTP credentials
3. **Domain** (optional): Custom domain for your site

## 🌐 Deployment Options

### 1. Vercel (Recommended)

**Why Vercel?**
- ✅ Perfect Astro support
- ✅ Serverless functions for email API
- ✅ Free custom domains
- ✅ Automatic deployments from GitHub

**Setup Steps:**
1. Go to [vercel.com](https://vercel.com)
2. Sign up with GitHub
3. Import your repository
4. Add environment variables:
   ```
   SMTP_HOST=smtp.gmail.com
   SMTP_PORT=587
   SMTP_USER=your-email@gmail.com
   SMTP_PASS=your-app-password
   CONTACT_EMAIL=contato@irrigatech.com
   ```
5. Deploy!

**Custom Domain:**
- Add domain in Vercel dashboard
- Update DNS records
- Free SSL certificate

### 2. Netlify

**Why Netlify?**
- ✅ Great for static sites
- ✅ Built-in form handling
- ✅ Edge functions
- ✅ Free tier with good limits

**Setup Steps:**
1. Go to [netlify.com](https://netlify.com)
2. Connect GitHub repository
3. Build settings:
   - Build command: `pnpm build`
   - Publish directory: `dist`
4. Add environment variables in Site settings
5. Deploy!

### 3. Cloudflare Pages

**Why Cloudflare?**
- ✅ Unlimited bandwidth
- ✅ Global CDN
- ✅ Workers for serverless functions
- ✅ Free custom domains

**Setup Steps:**
1. Go to [pages.cloudflare.com](https://pages.cloudflare.com)
2. Connect GitHub repository
3. Build settings:
   - Framework preset: Astro
   - Build command: `pnpm build`
   - Build output directory: `dist`
4. Add environment variables
5. Deploy!

### 4. Firebase Hosting

**Why Firebase?**
- ✅ Google infrastructure
- ✅ Cloud Functions
- ✅ Free tier available
- ✅ Easy custom domains

**Setup Steps:**
1. Install Firebase CLI: `npm install -g firebase-tools`
2. Login: `firebase login`
3. Init project: `firebase init hosting`
4. Configure `firebase.json`
5. Deploy: `firebase deploy`

## 🔧 Environment Variables

All platforms need these environment variables:

```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
CONTACT_EMAIL=contato@irrigatech.com
```

## 🌍 Custom Domains

### Free Domain Options:
1. **Freenom**: `.tk`, `.ml`, `.ga`, `.cf` domains
2. **GitHub Pages**: `username.github.io`
3. **Netlify**: `sitename.netlify.app`
4. **Vercel**: `sitename.vercel.app`

### Paid Domain Options:
1. **Namecheap**: ~$10/year
2. **GoDaddy**: ~$15/year
3. **Cloudflare**: ~$10/year

## 📱 Domain Suggestions for IrrigaTech

- `irrigatech.tk` (free)
- `hortainteligente.com` (~$10/year)
- `irrigatech.com.br` (~$15/year)
- `minha-horta.com` (~$10/year)

## 🚀 Quick Deploy Commands

```bash
# Vercel
pnpm add -g vercel
vercel --prod

# Netlify
pnpm add -g netlify-cli
netlify deploy --prod --dir=dist

# Cloudflare
pnpm add -g wrangler
wrangler pages publish dist
```

## ✅ Post-Deployment Checklist

- [ ] Test contact form
- [ ] Verify email delivery
- [ ] Check mobile responsiveness
- [ ] Test all pages
- [ ] Set up analytics (optional)
- [ ] Configure SEO settings

## 🆘 Troubleshooting

**Email not working?**
- Check environment variables
- Verify SMTP credentials
- Test with different email provider

**Build failing?**
- Check Node.js version compatibility
- Verify all dependencies installed
- Check for TypeScript errors

**Custom domain not working?**
- Verify DNS settings
- Wait for propagation (up to 48 hours)
- Check SSL certificate status

## 🎯 Recommended Setup

For IrrigaTech, I recommend:

1. **Hosting**: Vercel (best Astro support)
2. **Domain**: `irrigatech.tk` (free) or `hortainteligente.com` (paid)
3. **Email**: Gmail with App Password
4. **Analytics**: Google Analytics (free)

This gives you a professional setup at minimal cost!
