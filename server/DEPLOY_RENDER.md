# Render Deployment Guide (Backend)

Follow these steps to deploy your Express server to Render.

## 1. Prepare for Deployment
The server is now configured with:
- **Health Check Route**: Accessing the root URL (`/`) will show `{"message": "Server is running successfully"}`.
- **Configurable CORS**: Supports linking your frontend production URL.

## 2. Deployment Steps on Render.com
1. Create a new **Web Service**.
2. Connect your GitHub repository.
3. Configure the following:
   - **Root Directory**: `server`
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npm start`

## 3. Environment Variables (Critical)
Add these in the "Environment" tab on Render:

| Key | Value |
| --- | --- |
| `NODE_ENV` | `production` |
| `MONGODB_URI` | *Your MongoDB connection string* |
| `JWT_SECRET` | *Your secure string* |
| `ENCRYPTION_KEY` | *Your 32-char encryption string* |
| `FRONTEND_URL` | *The URL of your frontend (e.g. `https://your-app.vercel.app`)* |

## 4. Verification
Once deployed, Render will provide a URL (e.g. `https://task-manager-api.onrender.com`).
Visit it in your browser. You should see:
```json
{ "message": "Server is running successfully" }
```
