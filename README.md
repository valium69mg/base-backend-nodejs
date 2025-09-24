# Base Backend Node.js

A starter project to build a REST API with Node.js, Express, and MySQL, implementing best practices and design patterns such as repositories, services, and controllers.

---

## Project Structure

- **config/**: Database and environment configuration.
- **src/routes/**: API route definitions.
- **src/controllers/**: Controllers that handle requests and call services.
- **src/services/**: Business logic and processing.
- **src/models/**: Database access layer.
- **utils/**: General utilities (e.g., common helper functions).
- **app.js**: Entry point that initializes the app, database, and routes.

---

## Key Features

- Modular architecture with clear separation of concerns.
- Uses bcrypt for password hashing.
- Database connection pooling with MySQL.
- Async/await for asynchronous operations.
- Basic error handling and responses.
- Dependency injection example for repositories and services.
- Singleton pattern for repositories, services, controllers and more.

---

## Environment Variables

The project uses a `.env` file to configure sensitive variables and connection parameters.

Example `.env` file for starters (on same level as src/):

- PORT=8000
- DB_HOST=localhost
- DB_PORT=3306
- DB_USER=root
- DB_PASSWORD=admin
- DB_NAME=yourdbname
