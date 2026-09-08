# 🎓 Academic Management System Backend

Backend REST API for managing academic institutions, including students, teachers, classes, attendance, tests, results, activities, authentication, and dashboard analytics.

---

## 🚀 Features

### 🔐 Authentication & Authorization

* JWT Authentication
* Secure Password Hashing with Argon2
* Login & Logout Functionality
* Protected Routes
* Role-Based Access Control (Admin, Teacher, Student)

### 👥 User Management

* User Registration
* User Profile Management
* Active/Inactive User Status
* Role Management

### 🎓 Student Management

* Create Student
* Update Student
* Delete Student
* View Student Details
* Student Statistics

### 👨‍🏫 Teacher Management

* Create Teacher
* Update Teacher
* Delete Teacher
* View Teacher Details
* Teacher Statistics

### 🏫 Class Management

* Create Classes
* Assign Class Teachers
* Manage Academic Sessions
* Class Statistics

### 📅 Attendance Management

* Mark Attendance
* Update Attendance
* View Attendance Records
* Attendance Statistics

### 📝 Test Management

* Create Tests
* Update Tests
* Delete Tests
* Test Statistics

### 📊 Result Management

* Create Results
* Update Results
* Delete Results
* Grade Management
* Result Statistics

### 🎯 Activity Management

* Create Activities
* Update Activities
* Delete Activities
* Manage School Events
* Activity Statistics

### 📈 Dashboard Analytics

* Total Students
* Total Teachers
* Total Classes
* Total Tests
* Total Results
* Total Activities

---

## 🛠 Tech Stack

### Backend

* Node.js
* Express.js

### Database

* MongoDB
* Mongoose

### Authentication

* JWT (JSON Web Token)
* Argon2 Password Hashing

### Validation

* Joi

### Security

* CORS
* Cookie Parser
* Environment Variables

---

## 📦 Installation

Clone the repository:

```bash
git clone <repository-url>
```

Navigate to the backend directory:

```bash
cd backend
```

Install dependencies:

```bash
npm install
```

---

## ⚙️ Environment Variables

Create a `.env` file in the root directory:

```env
PORT=5000

MONGO_URI=your_mongodb_connection_string

JWT_SECRET=your_jwt_secret

NODE_ENV=development
```

---

## ▶️ Run Development Server

```bash
npm run dev
```

Backend will run on:

```text
http://localhost:5000
```

---

## 🔐 Authentication APIs

| Method | Endpoint             | Description   |
| ------ | -------------------- | ------------- |
| POST   | `/api/auth/register` | Register User |
| POST   | `/api/auth/login`    | Login User    |
| POST   | `/api/auth/logout`   | Logout User   |

---

## 👤 User APIs

| Method | Endpoint             | Description                |
| ------ | -------------------- | -------------------------- |
| GET    | `/api/users/profile` | Get Logged In User Profile |

---

## 👨‍🏫 Teacher APIs

| Method | Endpoint              |
| ------ | --------------------- |
| POST   | `/api/teachers`       |
| GET    | `/api/teachers`       |
| GET    | `/api/teachers/:id`   |
| PUT    | `/api/teachers/:id`   |
| DELETE | `/api/teachers/:id`   |
| GET    | `/api/teachers/stats` |

---

## 🎓 Student APIs

| Method | Endpoint              |
| ------ | --------------------- |
| POST   | `/api/students`       |
| GET    | `/api/students`       |
| GET    | `/api/students/:id`   |
| PUT    | `/api/students/:id`   |
| DELETE | `/api/students/:id`   |
| GET    | `/api/students/stats` |

---

## 🏫 Class APIs

| Method | Endpoint             |
| ------ | -------------------- |
| POST   | `/api/classes`       |
| GET    | `/api/classes`       |
| GET    | `/api/classes/:id`   |
| PUT    | `/api/classes/:id`   |
| DELETE | `/api/classes/:id`   |
| GET    | `/api/classes/stats` |

---

## 📅 Attendance APIs

| Method | Endpoint                |
| ------ | ----------------------- |
| POST   | `/api/attendance`       |
| GET    | `/api/attendance`       |
| GET    | `/api/attendance/:id`   |
| PUT    | `/api/attendance/:id`   |
| DELETE | `/api/attendance/:id`   |
| GET    | `/api/attendance/stats` |

---

## 📝 Test APIs

| Method | Endpoint           |
| ------ | ------------------ |
| POST   | `/api/tests`       |
| GET    | `/api/tests`       |
| GET    | `/api/tests/:id`   |
| PUT    | `/api/tests/:id`   |
| DELETE | `/api/tests/:id`   |
| GET    | `/api/tests/stats` |

---

## 📊 Result APIs

| Method | Endpoint             |
| ------ | -------------------- |
| POST   | `/api/results`       |
| GET    | `/api/results`       |
| GET    | `/api/results/:id`   |
| PUT    | `/api/results/:id`   |
| DELETE | `/api/results/:id`   |
| GET    | `/api/results/stats` |

---

## 🎯 Activity APIs

| Method | Endpoint                |
| ------ | ----------------------- |
| POST   | `/api/activities`       |
| GET    | `/api/activities`       |
| GET    | `/api/activities/:id`   |
| PUT    | `/api/activities/:id`   |
| DELETE | `/api/activities/:id`   |
| GET    | `/api/activities/stats` |

---

## 📈 Dashboard APIs

| Method | Endpoint               | Description          |
| ------ | ---------------------- | -------------------- |
| GET    | `/api/dashboard/stats` | Dashboard Statistics |

### Dashboard Statistics Includes

* Total Students
* Total Teachers
* Total Classes
* Total Tests
* Total Results
* Total Activities

---

## 📊 Statistics Endpoints

The system provides dedicated statistics APIs for dashboard cards and analytics.

```text
/api/dashboard/stats
/api/students/stats
/api/teachers/stats
/api/classes/stats
/api/attendance/stats
/api/tests/stats
/api/results/stats
/api/activities/stats
```

---

## 🔑 Authentication

Protected routes require a JWT token.

Example:

```http
Authorization: Bearer <your_token>
```

---

## 👮 Role-Based Access Control

Supported Roles:

* Admin
* Teacher
* Student

Role-based middleware can be used to restrict access to specific routes.

Example:

```javascript
authMiddleware;
roleMiddleware("admin");
```

---

## 🛡 Security Features

* JWT Authentication
* Argon2 Password Hashing
* Protected Routes
* Role-Based Authorization
* Joi Request Validation
* Environment Variable Protection

---

## 📄 License

This project is licensed under the MIT License.

---

## 👨‍💻 Author

**Aman Gupta**

Academic Management System Backend
