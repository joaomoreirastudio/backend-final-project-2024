# Backend Final Project 2024

## Description

This is the final backend project for 2024. It is built using Node.js, Express, and TypeScript. The project includes user authentication, movie management, and integrates Swagger for API documentation.

## Project Structure

backend-final-project-2024/
├── config/
│ ├── db.ts
│ ├── swagger.ts
│ └── ...
├── controllers/
│ ├── authController.ts
│ ├── movieController.ts
│ ├── userController.ts
│ └── ...
├── interfaces/
│ ├── movieInterface.ts
│ ├── userInterface.ts
│ └── ...
├── main.ts
├── middleware/
│ ├── authMiddleware.ts
│ ├── authService.ts
│ └── ...
├── models/
│ ├── movieModel.ts
│ ├── userModel.ts
│ └── ...
├── routers/
│ ├── authRouter.ts
│ ├── movieRouter.ts
│ ├── userRouter.ts
│ └── ...
├── services/
│ ├── movieService.ts
│ ├── userService.ts
│ └── ...
├── utils/
│ ├── fileService.ts
│ ├── jwt.ts
│ └── ...
├── static/
│ └── ...
├── tsconfig.json
├── package.json
├── nodemon.json
├── .env
└── README.md

## Installation

1. Clone the repository:

   ```sh
   git clone <repository-url>
   cd backend-final-project-2024
   ```

2. Install dependencies:

   ```sh
   npm install
   ```

3. Create a `.env` file in the root directory and add your environment variables:
   ```env
   NODE_ENV=development
   PORT=5000
   MONGO_URI=<your-mongodb-uri>
   JWT_SECRET=<your-jwt-secret>
   ```

## Scripts

- **Development**: `npm run dev`
- **Build**: `npm run build`
- **Start**: `npm run start`
- **Lint**: `npm run lint`
- **Format**: `npm run format`
- **Prettier**: `npm run prettier`

## API Documentation

Swagger is used for API documentation. You can access the documentation at `/api-docs` after starting the server.

## Usage

### Authentication

- **Register**: `POST /api/auth/register`
- **Login**: `POST /api/auth/login`

### Users

- **Update User**: `PUT /api/users/:id`

  - **Description**: Update a user's information.
  - **Security**: Requires bearer token and admin access.
  - **Parameters**:
    - `id` (path): User ID (string)
  - **Responses**:
    - `200`: User updated successfully
    - `400`: Bad request
    - `401`: Not authorized
    - `403`: Admin only access

- **Delete User**: `DELETE /api/users/:id`
  - **Description**: Delete a user.
  - **Security**: Requires bearer token and admin access.
  - **Parameters**:
    - `id` (path): User ID (string)
  - **Responses**:
    - `200`: User deleted successfully
    - `401`: Not authorized
    - `403`: Admin only access

### Movies

- **Create Movie**: `POST /api/movies`
- **Get Movies**: `GET /api/movies`
- **Get Movie by ID**: `GET /api/movies/:id`
- **Update Movie**: `PUT /api/movies/:id`
- **Delete Movie**: `DELETE /api/movies/:id`
- **Search Movies**: `GET /api/movies/search`
  - **Description**: Search for movies based on query parameters.
  - **Parameters**:
    - `search` (query): Search term for title, release date, or genres (string, optional)
    - `genre` (query): Movie genre (string, optional)
    - `page` (query): Page number (number, optional, default: 1)
    - `limit` (query): Number of movies per page (number, optional, default: 10)
    - `sortBy` (query): Field to sort by (string, optional, default: 'releaseDate')
    - `order` (query): Sort order ('asc' or 'desc', optional, default: 'asc')
  - **Responses**:
    - `200`: Movies found successfully
    - `400`: Bad request
