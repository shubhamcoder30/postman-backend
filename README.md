# Postman Clone - Backend (Server)

This is the backend server for the Postman Clone application, built with Node.js, Express, and Sequelize ORM.

## Tech Stack
- **Runtime**: Node.js
- **Framework**: Express.js
- **ORM**: Sequelize
- **Database**: MySQL 
- **Authentication**: JWT (JSON Web Tokens)
- **Language**: TypeScript

## Prerequisites
- Node.js (v18 or higher recommended)
- npm or yarn
- A running MySQL instance (local or RDS)

## Getting Started

### 1. Installation
Navigate to the server directory and install dependencies:
```bash
npm install
```

### 2. Environment Configuration
Create a `.env` file in the `server` root directory and configure the following variables:
```env
PORT=3000
MYSQL_HOST=your-database-host
MYSQL_PORT=3306
MYSQL_DATABASE=postman_clone
MYSQL_USER=your-username
MYSQL_PASSWORD=your-password
JWT_SECRET=your-secret-key
```

### 3. Database Setup
Ensure that the database specified in `MYSQL_DATABASE` exists. The application uses Sequelize's `sync()` method to create tables automatically on startup.

### 4. Running the Server

#### Development Mode (Hot Reload)
```bash
npm run dev
```

#### Production Mode
```bash
npm run build
npm start
```

## API Features
- **Authentication**: Signup, Login, and Profile management.
- **Collections**: Create, Read, Update, and Delete API collections.
- **Requests**: Manage HTTP requests within collections.
- **Environments**: Support for environment-specific variables.
- **History**: Tracking of past API requests.

## Project Structure
- `src/controllers`: Logic for handling API requests.
- `src/models`: Database models defined using Sequelize.
- `src/routes`: API route definitions.
- `src/middleware`: Custom middleware for authentication and logging.
- `src/index.ts`: Application entry point.
