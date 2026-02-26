# Render Deployment Guide (Frontend)

To deploy your Next.js application on Render, you **MUST** deploy it as a **Web Service**, NOT a "Static Site". Your app uses a server-side Middleware (`src/middleware.ts`) for secure login routing, which requires a live Node.js server.

## Deployment Steps on Render.com
1. Click **New** > **Web Service** (Do NOT click Static Site).
2. Connect your **TaskBoard** repository.
3. Configure the settings exactly like this:
   - **Name**: `TaskBoard-Client` (or your choice)
   - **Language**: `Node`
   - **Branch**: `main`
   - **Root Directory**: `client`
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npm start`
   - **Instance Type**: `Free`

## Environment Variables (Critical)
Click **Add Environment Variable** and paste this:

| NAME_OF_VARIABLE | Value |
| :--- | :--- |
| `NEXT_PUBLIC_API_URL` | `https://taskboard-server-ru97.onrender.com/api` |

## Final Step
Click **"Deploy Web Service"**.

*Note: Once this Frontend deployment finishes, copy the URL Render gives you (e.g., `https://taskboard-client.onrender.com`) and update the `FRONTEND_URL` environment variable back in your Backend's settings on Render so they can perfectly sync their security cookies!*
