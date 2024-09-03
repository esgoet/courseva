# Course Management System

## Overview

The Course Management System is a comprehensive web application tailored for managing educational courses, including lessons and assignments. The project integrates a React frontend with a Spring Boot backend, utilizing MongoDB for persistent storage.

## Table of Contents
- [Planned Features](#planned-features)
- [Technologies](#technologies)
- [Getting Started](#getting-started)
    - [Prerequisites](#prerequisites)
    - [Frontend Setup](#frontend-setup)
    - [Backend Setup](#backend-setup)
- [Usage](#usage)
- [License](#license)
- [Contact](#contact)

[//]: # (- [API Documentation]&#40;#api-documentation&#41;)


## Planned Features
- **Course Management**: Full CRUD operations for courses.
- **Lesson Management**: Organize and administer lessons within each course.
- **Assignment Management**: Create, manage, and track assignments efficiently.
- **User Authentication**: Secure authentication with BasicAuth Registration.
- **Role-Based Access Control**: Customized access levels for students and instructors.

## Technologies
- **Frontend**: React, React Router, Axios, Vite
- **Backend**: Spring Boot, MongoDB, Maven
- **Authentication**: GitHub OAuth2
- **Continuous Integration/Continuous Deployment**: GitHub Actions
- **Styling**: CSS Modules

## Getting Started

### Prerequisites
Ensure you have the following tools installed:
- [Node.js](https://nodejs.org/) - Required for the frontend development.
- [Java](https://www.oracle.com/java/technologies/javase-downloads.html) - Needed to run the Spring Boot application.
- [MongoDB](https://www.mongodb.com/try/download/community) - The database system used for persistent storage.
- [Maven](https://maven.apache.org/download.cgi) - For managing Spring Boot dependencies.

### Frontend Setup

1. **Clone the repository**:
    ```bash
    git clone https://github.com/your-username/your-project-name.git
    cd your-project-name/frontend
    ```

2. **Install dependencies**:
    ```bash
    npm install
    ```

3. **Run the development server**:
    ```bash
    npm run dev
    ```
   The application will be served at [http://localhost:5173](http://localhost:7173) thanks to Vite's development server.

### Backend Setup

1. **Navigate to the backend directory**:
    ```bash
    cd your-project-name/backend
    ```

2. **Install dependencies**:
    ```bash
    mvn install
    ```

3. **Configure MongoDB**:
    - Ensure MongoDB is running locally or update the `application.properties` file with your MongoDB connection string.
    - Example configuration:
      ```properties
      spring.data.mongodb.uri=mongodb://localhost:27017/your-database-name
      ```

4. **Start the Spring Boot application**:
    ```bash
    mvn spring-boot:run
    ```
   The backend will be accessible at [http://localhost:8080](http://localhost:8080).

## Usage
- **Frontend**: Navigate through the user interface to manage courses, lessons, and assignments. 
- **Backend**: The RESTful API facilitates CRUD operations and user management, supporting comprehensive course management functionalities.

[//]: # (## API Documentation)

[//]: # (Access the backend API documentation via the Swagger UI:)

[//]: # (- [Swagger UI]&#40;http://localhost:8080/swagger-ui.html&#41;)

## Continuous Integration and Deployment
The project employs GitHub Actions for continuous testing and deployment, ensuring that changes are automatically tested and deployed with each push. This setup helps maintain high code quality and streamline the deployment process.

## License
This project is licensed under the MIT License.

## Contact
For any inquiries or feedback, please use:
- [Contact Form](https://esgoet.github.io/#contact)
- [GitHub Issues](https://github.com/your-username/your-project-name/issues)
