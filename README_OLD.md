Healthcare Backend System
This project is a robust backend system for a healthcare application, developed as per the assignment requirements. It features a secure, RESTful API built with Node.js and Express, designed for managing user authentication, patient records, and doctor assignments, with all data stored in a PostgreSQL database.

Technology Stack
Backend: Node.js, Express.js

Database: PostgreSQL

ORM: Sequelize for object-relational mapping.

Authentication: JSON Web Tokens (JWT) using jsonwebtoken for token generation and bcryptjs for secure password hashing.

Setup and Installation
To run this project locally, please follow these steps:

Prerequisites:

Node.js (v18 or higher recommended) installed.

PostgreSQL installed and the server is running.

Clone or Unzip the Project:

Place the project folder on your local machine.

Create the Database:

Using a PostgreSQL client like pgAdmin, create a new, empty database. The required name is healthcare_db.

Configure Environment Variables:

In the project's root directory, find the .env.example file.

Duplicate this file and rename the copy to .env.

Open the new .env file and replace your_database_password_here with your actual password for the PostgreSQL user.

Install Dependencies:

Open a terminal in the project's root folder and run the command:

npm install

Run the Server:

After the installation is complete, start the development server with:

npm run dev

The server will start, and you should see a confirmation message that it is running on http://localhost:5000.

API Endpoints
All protected routes require a valid JSON Web Token (JWT) to be sent in the request header as x-access-token.

Authentication (/api/auth)
POST /register - Registers a new user. Requires name, email, and password in the request body.

POST /login - Authenticates a user with email and password, returning a JWT access token upon success.

Patient Management (/api/patients) - Protected
POST / - Adds a new patient record, linking it to the authenticated user.

GET / - Retrieves a list of all patients created by the authenticated user.

GET /:id - Retrieves the details of a single patient by their ID.

PUT /:id - Updates the details of a specific patient.

DELETE /:id - Deletes a specific patient record.

Doctor Management (/api/doctors) - Protected
POST / - Adds a new doctor to the system.

GET / - Retrieves a list of all doctors.

Mapping (/api/mappings) - Protected
POST / - Assigns a doctor to a patient. Requires patientId and doctorId in the request body.

GET /patient/:id - Retrieves all doctors assigned to a specific patient.

How to Test
It is highly recommended to use an API client like Postman to test the endpoints. A Postman collection file (HealthcareAPI.postman_collection.json) is included in this submission to facilitate easy and comprehensive testing of all available routes.