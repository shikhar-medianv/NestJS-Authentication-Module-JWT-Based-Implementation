# NestJS-Authentication-Module-JWT-Based-Implementation

A robust authentication system built with NestJS, implementing JWT-based access control, PostgreSQL storage, and secure password hashing with Bcrypt.

## 🚀 Features

-   **User Registration & Login**: Secure sign-up and sign-in processes.
-   **JWT Authentication**: Stateless authentication using JSON Web Tokens.
-   **Password Hashing**: Industry-standard security using Bcrypt.
-   **Route Protection**: Easy-to-use `@Public()` decorator for public routes, while others remain protected by default.
-   **Profile Management**: Retrieve authenticated user details.
-   **Password Updates**: Secure endpoint for users to change their passwords.
-   **Database Integration**: TypeORM with PostgreSQL for reliable data persistence.

## 🛠️ Tech Stack

-   **Framework**: [NestJS](https://nestjs.com/)
-   **Language**: TypeScript
-   **Database**: PostgreSQL
-   **ORM**: TypeORM
-   **Security**: Passport-JWT, Bcrypt, class-validator

## 📋 Prerequisites

-   Node.js (v16 or higher)
-   npm or yarn
-   PostgreSQL database instance

## ⚙️ Project Setup

1.  **Clone the repository**
2.  **Install dependencies**
    ```bash
    npm install
    ```
3.  **Configure Environment Variables**
    Create a `.env` file in the root directory based on `.env.example`:
    ```env
    DB_HOST=localhost
    DB_PORT=5432
    DB_USERNAME=your_username
    DB_PASSWORD=your_password
    DB_DATABASE=your_database
    JWT_SECRET=your-super-secret-key
    JWT_EXPIRES_IN=60s
    PORT=3000
    ```

## 🏃 Compilation and Running

```bash
# development
$ npm run start

# watch mode (recommended for development)
$ npm run start:dev

# production mode
$ npm run start:prod
```

## 🛣️ API Endpoints

### Authentication (`/auth`)

| Method | Endpoint             | Description                | Auth Required |
| :----- | :------------------- | :------------------------- | :------------ |
| `POST` | `/auth/signup`       | Register a new user        | No            |
| `POST` | `/auth/login`        | Authenticate and get token | No            |
| `GET`  | `/auth/profile`      | Get current user profile   | Yes (JWT)     |
| `PATCH`| `/auth/change-password` | Change user password      | Yes (JWT)     |

#### 1. Sign Up
- **URL**: `/auth/signup`
- **Body**:
  ```json
  {
    "username": "example_user",
    "password": "securepassword123"
  }
  ```
- **Response**: Returns the created user object (excluding password).

#### 2. Login
- **URL**: `/auth/login`
- **Body**:
  ```json
  {
    "username": "example_user",
    "password": "securepassword123"
  }
  ```
- **Response**:
  ```json
  {
    "access_token": "eyJhbG..."
  }
  ```

#### 3. Profile
- **URL**: `/auth/profile`
- **Headers**: `Authorization: Bearer <your_token>`
- **Response**: Current user information stored in the JWT payload.

#### 4. Change Password
- **URL**: `/auth/change-password`
- **Headers**: `Authorization: Bearer <your_token>`
- **Body**:
  ```json
  {
    "oldPassword": "oldsecurepassword123",
    "newPassword": "newsecurepassword456"
  }
  ```

## 🧪 Running Tests

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## 📄 License

Nest is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).
