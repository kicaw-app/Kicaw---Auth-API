# Kicaw - Restful API for User Management

## Team ID: CH2-PS362

## Contributor

| Name                           | Specialization     | Profile                               |
| -------------------------------| ------------------ | --------------------------------------|
| Isna Prastya Yuniarti          | Cloud Computing    | [Github](https://github.com/akaishawl)|

## Overview

This repository contains a Node.js Restful API for user management, providing endpoints for user registration, login, update, info, and deletion.
The API is designed to be secure and follows best practices for authentication and data protection.
To access the API documentation, visit [Kicaw Restful API Documentation](https://documenter.getpostman.com/view/31712035/2s9Ykhik3j).


## Features

- **User Registration:** Allow users to create new accounts with a secure registration process.
- **User Login:** Provide a secure authentication mechanism for users to log into their accounts.
- **User Update:** Enable users to update their profile information.
- **User Info:** Provides users with their latest profile information.
- **User Deletion:** Enable users to log out securely.

## Technologies Used

- **Node.js:** The server-side JavaScript runtime for building the API.
- **Express.js:** A web application framework for Node.js to simplify API development.
- **MySQL:** A database for storing user data.
- **JWT (JSON Web Tokens):** Used for secure authentication and authorization.
- **Bcrypt:** For password hashing to enhance security.
- **Joi:** A validation library for validating user inputs.
- **UUID:** A package for generating and working with UUIDs.
- **Winston:** A logging library for handling logs in the application.
- **Prisma:** A modern database toolkit for Node.js and TypeScript.

## Cloud Architecture:

![Kicaw CC Archi](https://github.com/kicaw-app/.github/blob/bb6e2093ccaafa55ee95a5b4187b96ee7b18d6de/assets/Kicaw%20(2).jpg)

## Prerequisites

- Node.js has been installed.
- Cloud SQL MySQL instance, user, and database has been created and running.
- Firewall rule enabling access to the database's IP and port has been activated.
  
## Installation

### 1. Clone the repository:

```
   git clone https://github.com/kicaw-app/Kicaw---Auth-API.git
   cd Auth-API
```
  
### 2. Install dependencies:
```
   npm install
```

### 3. Run Prisma Migration:
```
   npx prisma migrate dev
```

### 4. Set up environment variables:
```
   DATABASE_URL="mysql://user:password@host:port/databasename?schema=public"
```
### 5. Try to run the API:
```
   node src/main.js
```
- Then exit, press: Ctrl + C

### 6. Try to test the API:
```
   npm run test
```

### 7. Deploy:
```
   gcloud app deploy
```

#### &copy; Bangkit Academy 2023 Batch #2
