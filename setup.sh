#!/bin/bash

# CareLink Healthcare Management System - Quick Setup Script
# This script helps you quickly set up the project for development

echo "🏥 CareLink Healthcare Management System - Quick Setup"
echo "=================================================="

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js v14+ first."
    exit 1
fi

# Check if PostgreSQL is installed
if ! command -v psql &> /dev/null; then
    echo "❌ PostgreSQL is not installed. Please install PostgreSQL v12+ first."
    exit 1
fi

echo "✅ Node.js and PostgreSQL found"

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Check if .env file exists
if [ ! -f .env ]; then
    echo "⚙️ Creating .env file from template..."
    cp .env.example .env
    echo "🔧 Please edit .env file with your database credentials before proceeding"
    echo "   You can run: nano .env"
    read -p "Press Enter when you have configured your .env file..."
fi

# Ask user if they want to create the database
echo "🗃️ Database Setup"
read -p "Do you want to create the healthcare_db database? (y/n): " create_db

if [ "$create_db" = "y" ] || [ "$create_db" = "Y" ]; then
    echo "Creating healthcare_db database..."
    createdb healthcare_db 2>/dev/null || echo "Database might already exist (this is okay)"
fi

# Ask user if they want to seed sample data
echo "🌱 Sample Data"
read -p "Do you want to add sample doctors and patients? (y/n): " seed_data

if [ "$seed_data" = "y" ] || [ "$seed_data" = "Y" ]; then
    echo "Adding sample data..."
    npm run seed:fresh
fi

echo ""
echo "🎉 Setup Complete!"
echo ""
echo "📋 Next Steps:"
echo "1. Start the backend server: npm run dev"
echo "2. Open frontend/index.html in your browser"
echo "3. Register a new user account to get started"
echo ""
echo "📚 Available Commands:"
echo "• npm start          - Start production server"
echo "• npm run dev        - Start development server"
echo "• npm run seed:fresh - Reset and add sample data"
echo "• npm run seed:all   - Add sample data (keep existing)"
echo ""
echo "📖 For more information, see README.md"
echo "🐛 Found an issue? Check CONTRIBUTING.md"
