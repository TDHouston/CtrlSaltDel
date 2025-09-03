# CtrlSaltDel Deployment Guide

## Overview
This guide will help you deploy CtrlSaltDel using:
- **Frontend**: Vercel (React app)
- **Backend**: Railway (Spring Boot)
- **Database**: Railway MySQL
- **Storage**: AWS S3 (existing setup)

## Prerequisites
1. GitHub repository with your code
2. Vercel account (free)
3. Railway account (free tier available)
4. AWS S3 credentials (you already have these)

## Step 1: Deploy Backend to Railway

### 1.1 Create Railway Account
1. Go to https://railway.app
2. Sign up with GitHub
3. Create a new project

### 1.2 Deploy Spring Boot Application
1. In Railway, click "New Project"
2. Choose "Deploy from GitHub repo"
3. Select your repository
4. Railway will auto-detect Java/Maven project

### 1.3 Add MySQL Database
1. In your Railway project, click "New"
2. Choose "Database" → "MySQL"
3. Railway will automatically create and link the database

### 1.4 Configure Environment Variables
In Railway project settings, add these environment variables:
```
SPRING_PROFILES_ACTIVE=prod
JWT_SECRET=your-secret-key-here-make-it-long-and-random
AWS_ACCESS_KEY_ID=your-aws-access-key
AWS_SECRET_ACCESS_KEY=your-aws-secret-key
ES_ENABLED=false
ROUND_TABLE_DB_USERNAME=(auto-provided by Railway)
ROUND_TABLE_DB_PASSWORD=(auto-provided by Railway)
DATABASE_URL=(auto-provided by Railway)
```

### 1.5 Deploy
1. Railway will automatically deploy when you push to GitHub
2. Get your backend URL from Railway (e.g., https://your-app.up.railway.app)
3. Test the backend by visiting: https://your-app.up.railway.app/api/recipes

## Step 2: Deploy Frontend to Vercel

### 2.1 Update Production Environment
1. Edit `client/ctrl-slt-del/.env.production`
2. Replace the placeholder with your Railway backend URL:
   ```
   REACT_APP_API_URL=https://your-railway-app.up.railway.app
   ```

### 2.2 Create Vercel Account
1. Go to https://vercel.com
2. Sign up with GitHub
3. Install Vercel CLI (optional): `npm i -g vercel`

### 2.3 Deploy to Vercel

#### Option A: Via Vercel Dashboard
1. Click "Add New Project"
2. Import your GitHub repository
3. Set the root directory to: `client/ctrl-slt-del`
4. Vercel will detect Create React App automatically
5. Add environment variable:
   - Name: `REACT_APP_API_URL`
   - Value: Your Railway backend URL
6. Click "Deploy"

#### Option B: Via CLI
```bash
cd client/ctrl-slt-del
vercel
# Follow prompts, set root directory to current folder
# Add environment variable when prompted
```

### 2.4 Configure Domain (Optional)
1. In Vercel dashboard, go to your project settings
2. Go to "Domains"
3. Add your custom domain or use the provided .vercel.app domain

## Step 3: Update CORS Configuration

After deployment, update the CORS configuration in your backend:

1. Edit `server/src/main/java/capstone/config/CorsConfig.java`
2. Add your Vercel domain to allowed origins:
   ```java
   config.setAllowedOriginPatterns(Arrays.asList(
       "http://localhost:3000",
       "https://your-app.vercel.app",  // Add your Vercel URL
       "https://your-custom-domain.com" // Add custom domain if you have one
   ));
   ```
3. Commit and push to GitHub
4. Railway will auto-deploy the changes

## Step 4: Database Setup

### 4.1 Export Local Database Schema
```bash
# Export your local database structure
mysqldump -u root -p round_table --no-data > schema.sql
```

### 4.2 Import to Railway MySQL
1. In Railway, click on your MySQL database
2. Go to "Connect" tab
3. Use the connection string to connect via MySQL client
4. Import your schema:
   ```bash
   mysql -h [railway-host] -u root -p[railway-password] [database-name] < schema.sql
   ```

## Step 5: Testing

### 5.1 Test Backend
```bash
curl https://your-railway-app.up.railway.app/api/recipes
```

### 5.2 Test Frontend
1. Visit your Vercel URL
2. Try registering a new user
3. Create a test recipe
4. Upload an image (S3 should work)

## Troubleshooting

### Backend Issues
- **Database Connection**: Check DATABASE_URL in Railway environment variables
- **CORS Errors**: Ensure your Vercel URL is in CORS config
- **Server Won't Start**: Check logs in Railway dashboard

### Frontend Issues
- **API Connection Failed**: Verify REACT_APP_API_URL in Vercel environment
- **Build Errors**: Check Node version compatibility
- **404 Errors**: Ensure vercel.json rewrites are configured

### Common Commands
```bash
# View Railway logs
railway logs

# Redeploy on Vercel
vercel --prod

# Test production build locally
cd client/ctrl-slt-del
npm run build
serve -s build
```

## Free Tier Limitations

### Railway
- $5 free credit per month
- Databases sleep after inactivity
- Solution: Add a health check endpoint and ping it periodically

### Vercel
- Unlimited deployments
- 100GB bandwidth per month
- No sleep/cold starts

## Maintenance

### Keeping Backend Awake
Add this to prevent Railway from sleeping:
1. Create a free account on https://uptimerobot.com
2. Add a monitor for: https://your-railway-app.up.railway.app/api/health
3. Set check interval to 5 minutes

### Monitoring
- Railway Dashboard: View logs, metrics, deployments
- Vercel Dashboard: View analytics, errors, performance

## Next Steps
1. Set up custom domain (optional)
2. Configure SSL certificates (automatic on both platforms)
3. Set up monitoring and alerts
4. Consider upgrading to paid tiers for production use

## Support
- Railway Docs: https://docs.railway.app
- Vercel Docs: https://vercel.com/docs
- Your App Status: Check Railway and Vercel dashboards