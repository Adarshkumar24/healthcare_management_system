# CareLink - Healthcare Management System

[![Node.js](https://img.shields.io/badge/Node.js-v14+-green.svg)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express-4.18+-blue.svg)](https://expressjs.com/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-v12+-blue.svg)](https://postgresql.org/)
[![License](https://img.shields.io/badge/license-ISC-green.svg)](LICENSE)

A comprehensive healthcare management system with separate frontend and backend components.

## 🚀 Quick Start

```bash
# Clone the repository
git clone https://github.com/yourusername/healthcare-backend.git
cd healthcare-backend

# Run the setup script (Unix/Linux/macOS)
./setup.sh

# Or manual setup:
npm install
cp .env.example .env
# Edit .env with your database credentials
npm run seed:fresh
npm run dev
```

Then open `frontend/index.html` in your browser.

## 📸 Demo

### Login & Registration
![Login Screen](docs/images/login-screen.png)

### Patient Management Dashboard
![Patient Dashboard](docs/images/patient-dashboard.png)

### Doctor Assignment
![Doctor Assignment](docs/images/doctor-assignment.png)

> **Note**: Add screenshots to `docs/images/` directory to display the application interface.

## Project Overview

CareLink is a full-stack web application designed to manage healthcare data including patients, doctors, and their relationships. The system provides user authentication, patient management, doctor assignment, and a responsive web interface.

## Architecture

This project follows a **separated frontend-backend architecture**:

- **Backend**: RESTful API built with Node.js, Express, and PostgreSQL
- **Frontend**: Single-page application with vanilla HTML, CSS, and JavaScript
- **Database**: PostgreSQL with Sequelize ORM
- **Authentication**: JWT-based authentication system

## Project Structure

```
healthcare-backend/
├── README.md                    # Main project documentation
├── BACKEND_README.md           # Backend-specific documentation
├── package.json                # Backend dependencies
├── server.js                   # Backend entry point
├── .env                       # Environment variables
├── src/                       # Backend source code
│   ├── app.js
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   └── routes/
└── frontend/                  # Frontend application
    ├── README.md              # Frontend documentation
    ├── index.html             # Main HTML file
    ├── css/
    │   └── styles.css         # Custom styles
    ├── js/
    │   └── app.js            # Frontend JavaScript
    └── assets/               # Static assets
```

## Features

### Backend Features
- ✅ JWT Authentication
- ✅ User Registration & Login
- ✅ Patient CRUD Operations
- ✅ Doctor Management
- ✅ Patient-Doctor Mapping
- ✅ PostgreSQL Database
- ✅ RESTful API Design
- ✅ Middleware Protection

### Frontend Features
- ✅ Responsive Design
- ✅ User Authentication UI
- ✅ Patient Management Dashboard
- ✅ Doctor Assignment Interface
- ✅ Modern UI with Tailwind CSS
- ✅ Toast Notifications
- ✅ Modal-based Forms
- ✅ LocalStorage Integration

## Technology Stack

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: PostgreSQL
- **ORM**: Sequelize
- **Authentication**: JSON Web Tokens (JWT)
- **Password Hashing**: bcryptjs
- **Environment**: dotenv

### Frontend
- **Markup**: HTML5
- **Styling**: CSS3 + Tailwind CSS
- **JavaScript**: Vanilla ES6+
- **HTTP Client**: Fetch API
- **Storage**: LocalStorage

## Quick Start

### Prerequisites
- Node.js (v14 or higher)
- PostgreSQL (v12 or higher)
- npm or yarn

### Backend Setup

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Configure environment variables**:
   Create a `.env` file in the root directory:
   ```env
   DB_HOST=localhost
   DB_NAME=healthcare_db
   DB_PASSWORD=your_password
   DB_DIALECT=postgres
   JWT_SECRET=your_jwt_secret_key
   PORT=5000
   ```

3. **Set up PostgreSQL database**:
   ```sql
   CREATE DATABASE healthcare_db;
   ```

4. **Start the backend server**:
   ```bash
   # Development mode
   npm run dev
   
   # Production mode
   npm start
   ```

### Frontend Setup

1. **Navigate to frontend directory**:
   ```bash
   cd frontend
   ```

2. **Open in browser**:
   - Open `index.html` directly in your browser, or
   - Use a local server like Live Server extension in VS Code

### Database Initialization

The backend will automatically:
- Connect to PostgreSQL database
- Create necessary tables on first run
- Set up relationships between models

## API Documentation

### Authentication Endpoints
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login

### Patient Endpoints
- `GET /api/patients` - Get user's patients (Protected)
- `POST /api/patients` - Create patient (Protected)
- `GET /api/patients/:id` - Get patient by ID (Protected)
- `PUT /api/patients/:id` - Update patient (Protected)
- `DELETE /api/patients/:id` - Delete patient (Protected)

### Doctor Endpoints
- `GET /api/doctors` - Get all doctors (Protected)
- `POST /api/doctors` - Create doctor (Protected)
- `GET /api/doctors/:id` - Get doctor by ID (Protected)

### Mapping Endpoints
- `POST /api/mappings` - Assign doctor to patient (Protected)
- `GET /api/mappings/patient/:id` - Get patient's doctors (Protected)
- `DELETE /api/mappings` - Remove assignment (Protected)

## Development Guidelines

### Backend Development
- Follow MVC architecture
- Use middleware for authentication
- Implement proper error handling
- Follow RESTful API conventions
- Use Sequelize for database operations

### Frontend Development
- Keep JavaScript modular and organized
- Use semantic HTML structure
- Follow responsive design principles
- Implement proper error handling
- Use modern JavaScript features (ES6+)

## Testing

### Backend Testing
```bash
# Run backend tests (when implemented)
npm test
```

### Frontend Testing
- Test in multiple browsers
- Verify responsive design on different screen sizes
- Test all user interactions and form submissions

## Deployment

### Backend Deployment
1. Set up production database
2. Configure production environment variables
3. Use PM2 or similar for process management
4. Set up reverse proxy (nginx)

### Frontend Deployment
1. Upload files to web server
2. Ensure proper CORS configuration
3. Update API URLs for production

## Security Considerations

- ✅ Password hashing with bcrypt
- ✅ JWT token authentication
- ✅ Protected API routes
- ✅ Input validation
- ✅ Environment variable protection
- ✅ HTTPS recommended for production

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make changes following the coding standards
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the ISC License.

## Support

For questions or issues, please refer to:
- Backend documentation: `BACKEND_README.md`
- Frontend documentation: `frontend/README.md`

---

**Note**: This is a development project. Ensure proper security measures and testing before using in production environments.
