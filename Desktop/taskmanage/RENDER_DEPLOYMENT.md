# Render Deployment Guide

## Direct GitHub Deployment (Recommended)

Render can automatically deploy from this GitHub repository. Follow these steps:

### Prerequisites
1. GitHub account with access to this repository
2. Render account (https://render.com)
3. MongoDB connection string
4. A strong JWT secret

### Step 1: Connect GitHub to Render

1. Go to https://render.com/dashboard
2. Click **"New +"** → **"Web Service"**
3. Click **"Connect a repository"**
4. Select your GitHub account
5. Choose the repository: **Task-Manage**
6. Click **"Connect"**

### Step 2: Deploy Backend First

**Service Settings:**
- **Name**: `taskmanage-backend`
- **Root Directory**: `backend`
- **Runtime**: `Node`
- **Region**: Choose closest to you
- **Plan**: Free tier is fine for testing
- **Build Command**: `npm install`
- **Start Command**: `npm start`

**Add Environment Variables** (Click "Advanced"):
```
MONGO_URI=your_mongodb_connection_string_here
JWT_SECRET=generate_a_strong_random_string_here
NODE_ENV=production
```

Click **"Create Web Service"** and wait for deployment (~3-5 minutes).

**Copy the Backend URL** - you'll need this for frontend configuration.
Example: `https://taskmanage-backend.render.com`

### Step 3: Deploy Frontend

1. Go back to Render Dashboard
2. Click **"New +"** → **"Web Service"** again
3. Connect the same GitHub repository
4. This time for frontend:

**Service Settings:**
- **Name**: `taskmanage-frontend`
- **Root Directory**: `frontend/client`
- **Runtime**: `Node`
- **Region**: Same as backend
- **Plan**: Free tier
- **Build Command**: `npm install && CI=false npm run build`
- **Start Command**: `npx serve -s build -l 3000`

**Add Environment Variables**:
```
REACT_APP_API_URL=https://your-backend-url.render.com
NODE_ENV=production
CI=false
```

Click **"Create Web Service"** and wait for deployment.

### Step 4: Test Your Application

1. Your frontend will be available at the URL shown in Render dashboard
2. Sign up for a new account
3. Create tasks
4. Verify everything works

## Troubleshooting

### Backend Not Connecting
- Check MongoDB URI is correct
- Verify MongoDB cluster allows Render IP (0.0.0.0/0)
- Check logs in Render dashboard

### Frontend Shows Blank Page
- Check `REACT_APP_API_URL` is set to correct backend URL
- Open browser DevTools → Network tab
- Check API calls are going to correct URL

### Build Failures
- Check Render logs for error messages
- Ensure root directory is correct
- Verify all dependencies are in package.json

## Auto Deployment

Once deployed, any push to the `main` branch will automatically trigger redeployment:
1. Code changes pushed to GitHub
2. Render detects changes
3. Automatic rebuild and deployment
4. Your app updates automatically (usually within 2-3 minutes)

## Important Notes

- **Free tier limitations**: 
  - Services stop after 15 minutes of inactivity
  - Limited resources
  - Not suitable for production

- **Security**: 
  - Never commit `.env` file
  - Use Render environment variables instead
  - Keep MongoDB credentials secure

- **Frontend CORS**: 
  - Backend has CORS enabled for all origins
  - In production, update to specific domains

## Support

If you encounter issues:
1. Check Render Logs tab for error messages
2. Verify all environment variables are set
3. Ensure MongoDB connection is working
4. Check GitHub is properly connected
