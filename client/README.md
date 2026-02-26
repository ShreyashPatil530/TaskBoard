# TaskFlow | Production-Ready Task Management

A full-stack task management application built for the Technical Assessment, demonstrating secure authentication, CRUD operations, and premium design patterns.

## 🚀 Live URL
[Insert Deployment Link Here]

## 🛠️ Tech Stack
- **Frontend**: Next.js 14+ (App Router), Tailwind CSS, Framer Motion, Lucide Icons.
- **Backend**: Next.js API Routes (Route Handlers).
- **Database**: MongoDB (Mongoose).
- **Security**: JWT (Cookies), BcryptJS, AES (CryptoJS).
- **Auth**: Secure JWT-based authentication with HttpOnly cookies.

## 🔑 Key Features
- **Secure Authentication**: Register and Login with hashed passwords and secure cookie management.
- **Task Management**: Full CRUD operations for personal tasks.
- **Advanced Filtering**: Search by title, filter by status (Pending, In-Progress, Completed).
- **Pagination**: Efficient data fetching for large task lists.
- **Responsive Design**: Premium, dark-mode focused UI that works on all devices.
- **Data Security**: Payload encryption utility available for sensitive fields.

## 🏗️ Architecture
The application follows a **Modular Monolith** architecture using Next.js.
- **Data Layer**: MongoDB/Mongoose models define the schema.
- **Service Layer**: API routes handle business logic and database interactions.
- **Security Layer**: Middleware protects private routes (`/dashboard`), and auth utilities handle JWT signing/verification.
- **UI Layer**: React Server Components (where applicable) and Client Components for interactive elements.

## ⚙️ Setup Instructions
1. **Clone the repository**:
   ```bash
   git clone <repo-url>
   cd task-manager-app
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Configure Environment Variables**:
   Create a `.env.local` file with:
   ```env
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   ENCRYPTION_KEY=your_aes_key
   ```

4. **Run development server**:
   ```bash
   npm run dev
   ```

## 📝 API Documentation (Sample)

### Auth
- `POST /api/auth/register`: Create a new user account.
- `POST /api/auth/login`: Login and receive an HttpOnly cookie.
- `POST /api/auth/logout`: Clear authentication cookies.

### Tasks
- `GET /api/tasks`: List user tasks (supports `search`, `status`, `page`, `limit`).
- `POST /api/tasks`: Create a new task.
- `PUT /api/tasks/[id]`: Update an existing task.
- `DELETE /api/tasks/[id]`: Remove a task.

---
Built with ❤️ by [Antigravity AI]
