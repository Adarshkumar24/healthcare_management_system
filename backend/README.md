# Backend Documentation

## CareLink Healthcare Management System - Backend

This is the backend API for the CareLink healthcare management system, built with Node.js, Express, and PostgreSQL.

## Structure

```
backend/
├── server.js                    # Entry point
├── package.json                 # Dependencies and scripts
├── .env                        # Environment variables
└── src/
    ├── app.js                  # Express app configuration
    ├── config/
    │   └── db.config.js        # Database configuration
    ├── controllers/            # Business logic
    │   ├── auth.controller.js
    │   ├── doctor.controller.js
    │   ├── mapping.controller.js
    │   └── patient.controller.js
    ├── middleware/
    │   └── auth.middleware.js   # JWT authentication middleware
    ├── models/                 # Sequelize models
    │   ├── index.js
    │   ├── user.model.js
    │   ├── patient.model.js
    │   ├── doctor.model.js
    │   └── patientDoctor.model.js
    └── routes/                 # API endpoints
        ├── auth.routes.js
        ├── doctor.routes.js
        ├── mapping.routes.js
        └── patient.routes.js
```

## Features

- **Authentication System**
  - JWT token-based authentication
  - Password hashing with bcrypt
  - User registration and login

- **Patient Management**
  - CRUD operations for patients
  - Medical history tracking
  - Date of birth management

- **Doctor Management**
  - Doctor profiles with specializations
  - Available doctors listing

- **Patient-Doctor Mapping**
  - Many-to-many relationship management
  - Assignment tracking

## Technology Stack

- **Node.js**: Runtime environment
- **Express.js**: Web framework
- **PostgreSQL**: Database
- **Sequelize**: ORM
- **JWT**: Authentication
- **bcryptjs**: Password hashing

## Database Schema

### Users
- id (Primary Key)
- name
- email (Unique)
- password (Hashed)
- timestamps

### Patients
- id (Primary Key)
- name
- dateOfBirth
- medicalHistory
- userId (Foreign Key)
- timestamps

### Doctors
- id (Primary Key)
- name
- specialization
- timestamps

### PatientDoctor (Junction Table)
- patientId (Foreign Key)
- doctorId (Foreign Key)
- timestamps

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login

### Patients
- `GET /api/patients` - Get user's patients
- `POST /api/patients` - Create new patient
- `GET /api/patients/:id` - Get patient by ID
- `PUT /api/patients/:id` - Update patient
- `DELETE /api/patients/:id` - Delete patient

### Doctors
- `GET /api/doctors` - Get all doctors
- `POST /api/doctors` - Create new doctor (admin)
- `GET /api/doctors/:id` - Get doctor by ID

### Mappings
- `POST /api/mappings` - Assign doctor to patient
- `GET /api/mappings/patient/:id` - Get patient's doctors
- `DELETE /api/mappings` - Remove doctor assignment

## Environment Variables

Create a `.env` file with:

```
DB_HOST=localhost
DB_NAME=healthcare_db
DB_PASSWORD=your_password
DB_DIALECT=postgres
JWT_SECRET=your_jwt_secret_key
PORT=5000
```

## Installation & Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Set up PostgreSQL database

3. Configure environment variables in `.env`

4. Start the server:
   ```bash
   # Development
   npm run dev

   # Production
   npm start
   ```

## Security Features

- Password hashing with bcrypt
- JWT token authentication
- Protected routes with middleware
- Input validation
- CORS configuration

## Error Handling

- Centralized error handling
- Proper HTTP status codes
- Detailed error messages for development
- Secure error responses for production
