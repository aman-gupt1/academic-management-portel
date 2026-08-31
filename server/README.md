# Academic Management System Backend

Backend API for managing academic institutions, including students, teachers, classes, tests, attendance, results, and activities.

## 🚀 Tech Stack

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication
- Argon2 Password Hashing
- Joi Validation

---

## 📦 Installation

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

---

## 🔐 Authentication APIs

| Method | Endpoint | Description |
|----------|----------|-------------|
| POST | `/api/auth/register` | Register a new user |
| POST | `/api/auth/login` | Login user |
| POST | `/api/auth/logout` | Logout user |

---

## 👤 Users APIs

| Method | Endpoint | Description |
|----------|----------|-------------|
| GET | `/api/users/profile` | Get logged-in user profile |

---

## 👨‍🏫 Teachers APIs

| Method | Endpoint |
|----------|----------|
| POST | `/api/teachers` |
| GET | `/api/teachers` |
| GET | `/api/teachers/:id` |
| PUT | `/api/teachers/:id` |
| DELETE | `/api/teachers/:id` |

---

## 🎓 Students APIs

| Method | Endpoint |
|----------|----------|
| POST | `/api/students` |
| GET | `/api/students` |
| GET | `/api/students/:id` |
| PUT | `/api/students/:id` |
| DELETE | `/api/students/:id` |

---

## 📝 Tests APIs

| Method | Endpoint |
|----------|----------|
| POST | `/api/tests` |
| GET | `/api/tests` |
| GET | `/api/tests/:id` |
| PUT | `/api/tests/:id` |
| DELETE | `/api/tests/:id` |

---

## 📊 Results APIs

| Method | Endpoint |
|----------|----------|
| POST | `/api/results` |
| GET | `/api/results` |
| GET | `/api/results/:id` |
| PUT | `/api/results/:id` |
| DELETE | `/api/results/:id` |

---

## 🏫 Classes APIs

| Method | Endpoint |
|----------|----------|
| POST | `/api/classes` |
| GET | `/api/classes` |
| GET | `/api/classes/:id` |
| PUT | `/api/classes/:id` |
| DELETE | `/api/classes/:id` |

---

## 📅 Attendance APIs

| Method | Endpoint |
|----------|----------|
| POST | `/api/attendance` |
| GET | `/api/attendance` |
| GET | `/api/attendance/:id` |
| PUT | `/api/attendance/:id` |
| DELETE | `/api/attendance/:id` |

---

## 🎯 Activities APIs

| Method | Endpoint |
|----------|----------|
| POST | `/api/activities` |
| GET | `/api/activities` |
| GET | `/api/activities/:id` |
| PUT | `/api/activities/:id` |
| DELETE | `/api/activities/:id` |

---

## 🔑 Authentication

Protected routes require a JWT token.

Example Header:

```http
Authorization: Bearer <your_token>
```

---

## 📂 Project Features

- User Authentication & Authorization
- Role-Based Access Control (Admin, Teacher, Student)
- Student Management
- Teacher Management
- Class Management
- Test & Result Management
- Attendance Tracking
- Activity Management
- Secure Password Hashing with Argon2
- Request Validation using Joi

---

## 📄 License

This project is licensed under the MIT License.