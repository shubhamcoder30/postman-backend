# Postman Clone - Server Application

The backend API for the Postman Clone, built with **Node.js**, **Express**, and **TypeScript**. It handles authentication, data persistence, request proxying, and real-time socket events.

## 🛠️ Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MySQL 8.0
- **ORM**: Sequelize (TypeScript)
- **Authentication**: JWT (JSON Web Tokens), BCrypt
- **Real-Time**: Socket.IO
- **Validation**: Manual input validation / Middleware

## 📂 Directory Structure

```
src/
├── constants/          # App-wide constants (HTTP codes, config)
├── controllers/        # Route logic (Auth, Collection, Request)
├── middleware/         # Express middleware (Auth, Error handling)
├── models/             # Sequelize models
│   ├── entities/       # Individual model definitions (User, Request...)
│   └── index.ts        # Association setup
├── routes/             # API route definitions
├── services/           # Business logic layer
└── utils/              # Helper functions (JWT, error formatters)
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v18+)
- MySQL Server

### Installation

1.  Navigate to the server directory:
    ```bash
    cd server
    ```

2.  Install dependencies:
    ```bash
    npm install
    ```

### Configuration

Create a `.env` file in the root of the `server` directory:

```env
PORT=3000
DB_HOST=localhost
DB_USER=root
DB_PASS=password
DB_NAME=postman_clone
JWT_SECRET=your_super_secret_key
JWT_EXPIRES_IN=7d
CORS_ORIGIN=*
```

### Database Setup

The application uses **Sequelize** to manage the database.
- Ensure your MySQL server is running.
- The app will automatically sync models on startup (`sequelize.sync()`).
- *Note: `SYNC_ALTER` is set to `false` in `constants/index.ts` to prevent data loss. Change to `true` if you need auto-migrations during dev.*

### Running the Server

Start the development server with hot-reload:

```bash
npm run dev
```

The server will start on `http://localhost:3000`.

## 🔌 API Proxy Logic

One of the key features is the **Proxy Endpoint** (`/api/proxy`).
- **Purpose**: To bypass CORS restrictions when the frontend makes requests to external APIs.
- **Flow**:
  1. Client sends request details (URL, Method, Headers, Body) to `/api/proxy`.
  2. Server reconstructs the request using `axios`.
  3. Server sends the request to the target URL.
  4. Server captures the response (Status, Data, Headers) and sends it back to the Client.

## ⚡ Socket.IO Integration

The server runs a Socket.IO instance alongside Express.
- **Connection**: Accepts connections from any origin (configured in `index.ts`).
- **Events**:
  - Emits `test-event` every 5 seconds for connection testing.
  - Can be expanded to handle custom rooms/namespaces for collaborative features.

## 📜 Scripts

- `npm run dev`: Start dev server with `ts-node-dev`.
- `npm start`: Start production server (requires build).
- `npm run build`: Compile TypeScript to JavaScript (`dist/`).
