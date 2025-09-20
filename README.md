# 🏥 Healthcare Management System

[![Node.js](https://img.shields.io/badge/Node.js-v14+-green.svg)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express-4.18+-blue.svg)](https://expressjs.com/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-v12+-blue.svg)](https://postgresql.org/)
[![License](https://img.shields.io/badge/license-ISC-green.svg)](LICENSE)

> A modern, full-stack healthcare management system with clean architecture and professional design.

## ✨ Features

- 🔐 **Secure Authentication** - JWT-based user registration and login
- 👥 **Patient Management** - Complete CRUD operations for patient records
- 👨‍⚕️ **Doctor Management** - Specialist profiles with assignment capabilities  
- � **Assignment System** - Link patients to their assigned doctors
- 📱 **Responsive Design** - Modern UI that works on all devices
- 🗃️ **Database Integration** - PostgreSQL with Sequelize ORM
- 🌱 **Sample Data** - Pre-populated with realistic healthcare data

## 🚀 Quick Start

### Automated Setup
```bash
git clone https://github.com/yourusername/healthcare-management-system.git
cd healthcare-management-system
./setup.sh
```

### Manual Setup
```bash
# Install backend dependencies
npm run install:backend

# Configure environment
cp backend/.env.example backend/.env
# Edit backend/.env with your database credentials

# Setup database and sample data
npm run seed:fresh

# Start the backend server
npm run dev:backend
```

Then open `frontend/index.html` in your browser.

## � Project Structure

```
healthcare-management-system/
├── 📁 backend/                 # Backend API Server
│   ├── 📁 src/
│   │   ├── 📁 config/         # Database configuration
│   │   ├── 📁 controllers/    # API route handlers
│   │   ├── 📁 middleware/     # Authentication middleware
│   │   ├── 📁 models/         # Database models
│   │   └── 📁 routes/         # API routes
│   ├── 📄 server.js          # Server entry point
│   ├── 📄 package.json       # Backend dependencies
│   └── 📄 .env.example       # Environment template
├── 📁 frontend/               # Client Application
│   ├── 📄 index.html         # Main HTML file
│   ├── 📁 css/               # Stylesheets
│   ├── 📁 js/                # JavaScript files
│   └── 📄 README.md          # Frontend docs
├── 📁 docs/                   # Documentation
├── 📄 README.md              # Project documentation
├── 📄 CONTRIBUTING.md        # Contribution guidelines
└── 📄 setup.sh               # Automated setup script
```

## 🛠️ Technology Stack

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: PostgreSQL + Sequelize ORM
- **Authentication**: JWT (JSON Web Tokens)
- **Security**: bcryptjs password hashing

### Frontend
- **Language**: Vanilla JavaScript (ES6+)
- **Styling**: CSS3 + Tailwind CSS
- **HTTP**: Fetch API
- **Storage**: LocalStorage

## 📊 API Endpoints

### Authentication
```
POST /api/auth/register    # User registration
POST /api/auth/login       # User login
```

### Patients
```
GET    /api/patients       # Get all patients
POST   /api/patients       # Create patient
GET    /api/patients/:id   # Get patient by ID
PUT    /api/patients/:id   # Update patient
DELETE /api/patients/:id   # Delete patient
```

### Doctors
```
GET    /api/doctors        # Get all doctors
POST   /api/doctors        # Create doctor
DELETE /api/doctors/:id    # Delete doctor
```

### Assignments
```
POST   /api/mappings             # Assign doctor to patient
GET    /api/mappings/patient/:id # Get patient's doctors
DELETE /api/mappings             # Remove assignment
```

## 🎯 Available Scripts

```bash
# Backend Management
npm run dev:backend      # Start development server
npm run start:backend    # Start production server

# Database Management  
npm run seed:all         # Add sample data
npm run seed:fresh       # Reset and reseed database

# Installation
npm run install:all      # Install all dependencies
```

## 🔧 Development Setup

### Prerequisites
- Node.js 14+
- PostgreSQL 12+
- Git

### Environment Variables
Create `backend/.env` file:
```env
DB_HOST=localhost
DB_NAME=healthcare_db
DB_PASSWORD=your_password
DB_DIALECT=postgres
JWT_SECRET=your_jwt_secret
PORT=5000
```

### Database Setup
```bash
# Create database
createdb healthcare_db

# Run migrations and seed data
npm run seed:fresh
```

## 📱 Frontend Usage

1. Open `frontend/index.html` in your browser
2. Register a new user account
3. Login to access the dashboard
4. Manage patients and doctors
5. Assign doctors to patients

## 🤝 Contributing

We welcome contributions! Please see [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the ISC License. See [LICENSE](LICENSE) file for details.

## 🆘 Support

- 📖 [Backend Documentation](backend/README.md)
- 🎨 [Frontend Documentation](frontend/README.md)
- 🐛 [Report Issues](https://github.com/yourusername/healthcare-management-system/issues)
- 💬 [Discussions](https://github.com/yourusername/healthcare-management-system/discussions)

---

<div align="center">
Made with ❤️ for better healthcare management
</div>

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
