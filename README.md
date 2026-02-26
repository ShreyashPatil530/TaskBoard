# TaskBoard Pro 🚀

A premium full-stack task management application built with **Next.js 15**, **Express**, and **MongoDB**. Features a high-end "Glassmorphism" UI, secure authentication, and real-time task tracking.

### 🔗 Live Links
- **Frontend (Vercel)**: [https://task-board-delta-five.vercel.app](https://task-board-delta-five.vercel.app)
- **Backend API (Render)**: [https://taskboard-server-ru97.onrender.com](https://taskboard-server-ru97.onrender.com)

## ✨ Features

- **Premium UI/UX**: Modern glassmorphism design with Tailwind CSS v4, mesh backgrounds, and smooth animations.
- **Secure Authentication**: JWT-based auth with secure HTTP-only cookies and route protection.
- **Task Management**: Full CRUD operations with search, status filtering, and pagination.
- **Data Security**: Sensitive task data is encrypted on the server using AES before transmission.
- **Responsive Design**: Fully optimized for desktop and mobile devices.

## 🛠️ Tech Stack

### Frontend
- **Framework**: Next.js 15 (App Router)
- **Styling**: Tailwind CSS v4
- **Icons**: Lucide React
- **Animations**: Framer Motion / CSS Keyframes

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB (Mongoose)
- **Validation**: Zod
- **Security**: JWT, BcryptJS, CryptoJS, Cookie-Parser

## 🏗️ System Architecture & Workflow

```mermaid
graph TD
    subgraph Frontend [Next.js Client - Vercel]
        UI[User Interface]
        AuthGuard[Middleware Protection]
        APIClient[Fetch API]
    end

    subgraph Backend [Node.js Server - Render]
        Router[Express Routes]
        AuthMid[Auth Middleware]
        Controllers[Task & Auth Controllers]
        Crypto[Data Encryption]
    end

    subgraph Database [MongoDB Atlas]
        DB[(Task / User Documents)]
    end

    %% Workflow Connections
    UI -->|1. User Login / Action| APIClient
    APIClient -->|2. HTTP Request + Cookies| Router
    Router -->|3. Verify JWT| AuthMid
    AuthMid -->|4. Authenticated Request| Controllers
    Controllers -->|5. Encrypt/Decrypt Data| Crypto
    Crypto <-->|6. Read/Write| DB
    Controllers -->|7. JSON Response| APIClient
    APIClient -->|8. Update State| UI
    
    %% Styles
    classDef frontend fill:#000,stroke:#333,stroke-width:2px,color:#fff;
    classDef backend fill:#1f2937,stroke:#3b82f6,stroke-width:2px,color:#fff;
    classDef database fill:#064e3b,stroke:#10b981,stroke-width:2px,color:#fff;
    
    class UI,AuthGuard,APIClient frontend;
    class Router,AuthMid,Controllers,Crypto backend;
    class DB database;
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v18+)
- MongoDB Atlas account or local instance

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/ShreyashPatil530/TaskBoard.git
   cd TaskBoard
   ```

2. **Setup Server**
   ```bash
   cd server
   npm install
   ```
   Create a `.env` file in the `server` directory:
   ```env
   MONGODB_URI=your_mongodb_uri
   JWT_SECRET=your_jwt_secret
   ENCRYPTION_KEY=your_aes_32_char_key
   PORT=5000
   NODE_ENV=development
   ```

3. **Setup Client**
   ```bash
   cd ../client
   npm install
   ```
   Create a `.env.local` file in the `client` directory:
   ```env
   NEXT_PUBLIC_API_URL=http://localhost:5000/api
   ```

### Running Locally

From the root directory, run:
```bash
npm run dev
```
- Frontend: `http://localhost:3000`
- Backend: `http://localhost:5000`

## ☁️ Deployment

### Backend (Render)
- **Build Command**: `npm install && npm run build`
- **Start Command**: `npm start`
- **Environment**: Set `NODE_ENV=production` and `FRONTEND_URL=your_deployed_frontend_url`.

### Frontend (Vercel)
- **Framework Preset**: Next.js
- **Environment**: Set `NEXT_PUBLIC_API_URL=your_deployed_backend_api_url`.

## 📄 License
This project is licensed under the MIT License.
