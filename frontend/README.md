# Frontend Documentation

## CareLink Healthcare Management System - Frontend

This is the frontend part of the CareLink healthcare management system, built with vanilla HTML, CSS, and JavaScript.

## Structure

```
frontend/
├── index.html          # Main HTML file
├── css/
│   └── styles.css      # Custom styles
├── js/
│   └── app.js         # Main JavaScript application
└── assets/            # Static assets (images, icons, etc.)
```

## Features

- **Authentication System**
  - User login and registration
  - JWT token-based authentication
  - Secure localStorage management

- **Patient Management**
  - Add new patients
  - View patient list with medical history
  - Date of birth tracking

- **Doctor Management**
  - View available doctors
  - Doctor specialization display

- **Patient-Doctor Mapping**
  - Assign doctors to patients
  - Interactive modal-based assignment

- **Responsive Design**
  - Mobile-friendly interface
  - Tailwind CSS framework
  - Custom animations and transitions

## Technology Stack

- **HTML5**: Semantic markup
- **CSS3**: Custom styles with Tailwind CSS
- **JavaScript (ES6+)**: Modern vanilla JavaScript
- **Fetch API**: HTTP requests to backend
- **LocalStorage**: Client-side data persistence

## API Integration

The frontend communicates with the backend through REST API endpoints:

- `POST /api/auth/login` - User authentication
- `POST /api/auth/register` - User registration  
- `GET /api/patients` - Fetch patients
- `POST /api/patients` - Create patient
- `GET /api/doctors` - Fetch doctors
- `POST /api/mappings` - Create patient-doctor mapping

## Configuration

- Backend API URL is configured in `js/app.js` as `API_BASE_URL`
- Default: `http://localhost:5000/api`

## Usage

1. Open `index.html` in a web browser
2. Ensure backend server is running on port 5000
3. Register a new account or login with existing credentials
4. Use the dashboard to manage patients and assign doctors

## Browser Support

- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

## Development

To modify the frontend:

1. Edit HTML structure in `index.html`
2. Update styles in `css/styles.css`
3. Modify application logic in `js/app.js`
4. Refresh browser to see changes
