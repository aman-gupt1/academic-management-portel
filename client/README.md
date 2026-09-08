# Academic Management Portal - Frontend

A modern Academic Management System frontend built with React and Vite for managing students, teachers, classes, tests, results, attendance, and school activities.

## Tech Stack

* React
* Vite
* React Router DOM
* Axios
* Tailwind CSS
* Lucide React

## Features

### Authentication

* User Login
* Role-Based Access Control
* Protected Routes

### Dashboard

* Institution Overview
* Statistics Cards
* Recent Activities
* Recent Students
* Recent Teachers

### Student Management

* Create Student
* View Student Details
* Update Student Information
* Delete Student

### Teacher Management

* Create Teacher
* View Teacher Details
* Update Teacher Information
* Delete Teacher

### Class Management

* Create Classes
* Assign Class Teachers
* Manage Academic Sessions

### Attendance Management

* Mark Attendance
* View Attendance Records
* Attendance Statistics

### Test Management

* Create Tests
* Manage Test Information
* Test Scheduling

### Result Management

* Create Results
* Update Results
* View Student Performance

### Activity Management

* Create Activities
* View Activities
* Update Activities
* Delete Activities
* Activity Statistics

## Installation

```bash
npm install
```

## Run Development Server

```bash
npm run dev
```

Frontend will start on:

```text
http://localhost:5173
```

## Build for Production

```bash
npm run build
```

## Preview Production Build

```bash
npm run preview
```

## Project Structure

```text
src/
├── api/
├── assets/
├── components/
│   ├── common/
│   ├── dashboard/
│   ├── students/
│   ├── teachers/
│   ├── classes/
│   ├── attendance/
│   ├── tests/
│   ├── results/
│   └── activities/
├── pages/
├── routes/
├── utils/
├── App.jsx
└── main.jsx
```

## Backend API

The frontend communicates with the Academic Management Portal backend through REST APIs.

Default backend URL:

```text
http://localhost:5000/api
```

## Author

Aman Gupta

## License

This project is developed for educational and learning purposes.
