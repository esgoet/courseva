# 🎓 Learning Management System

## 📋 Overview

This Learning Management System is a comprehensive web application tailored for managing, providing and partaking in educational courses, including lessons and assignments. The project integrates a React frontend with a Spring Boot backend, utilizing MongoDB for persistent storage.

### Table of Contents
- [Planned Features](#planned-features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Contact](#contact)
- [License](#license)

[//]: # (- [API Documentation]&#40;#api-documentation&#41;)

## 💡 Planned Features
- **Course Management**: Full CRUD operations for courses.
- **Lesson Management**: Organize and administer lessons within each course.
- **Assignment Management**: Create, manage, and track assignments efficiently.
    - **Quiz Hosting**: Create and manage quizzes that can be automatically or manually graded
    - **Feedback**: Give feedback directly on the assignments
- **User Authentication**: Secure authentication with custom registration
- **Role-Based Access Control**: Customized access levels for students and instructors.
- **Responsive Design**: Mobile-first user-friendly design 

## 🖥️ Tech Stack
### Frontend
- **TypeScript**: A statically typed superset of JavaScript for maintainable high-quality code
- **React**: JavaScript library for user interfaces in single-page applications with reusable and stateful UI components
- **React Router**: React navigation library for dynamic routing in a single-page application
- **Axios**: A promise-based HTTP client for the browser and Node.js
- **Vite**: Modern frontend development tool for fast development with hot module replacement and optimised builds

### Backend
- **Java 22**: Latest Java version for optimal performance, security, and compatibility with modern Java libraries and frameworks
- **Spring Boot**: Backend framework with a range of tools and configurations out of the box
- **MongoDB**: Scalable NoSQL database with JSON-like document structure
- **Maven**: Build automation tool to handle project dependencies, builds and deployments

### CI/CD:
- **GitHub Actions**: Automation of tests, builds and deployment
- **docker**: Image creation, pushed to dockerhub
- **Render**: Hosting target for automatic deployment

## 🔨 Getting Started

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
   The application will be served at [http://localhost:5173](http://localhost:5173).

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
   

4. **Start the Spring Boot application**:
    ```bash
    mvn spring-boot:run
    ```
   The backend will be accessible at [http://localhost:8080](http://localhost:8080).


[//]: # (## API Documentation)

[//]: # (Access the backend API documentation via the Swagger UI:)

[//]: # (- [Swagger UI]&#40;http://localhost:8080/swagger-ui.html&#41;)

## 📬 Contact
For any inquiries or feedback, please use:
- [Contact Form](https://esgoet.github.io/#contact)
- [GitHub Issues](https://github.com/esgoet/learning-management-system/issues)

## 📄 License
This project is licensed under the MIT License.

