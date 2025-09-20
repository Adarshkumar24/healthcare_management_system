# Contributing to CareLink Healthcare Management System

Thank you for your interest in contributing to CareLink! This document provides guidelines and instructions for contributing to the project.

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- PostgreSQL (v12 or higher)
- Git
- A code editor (VS Code recommended)

### Setting up the development environment

1. **Fork the repository**
   ```bash
   git clone https://github.com/yourusername/healthcare-backend.git
   cd healthcare-backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   # Edit .env with your database credentials
   ```

4. **Set up the database**
   ```bash
   # Create PostgreSQL database
   createdb healthcare_db
   
   # Seed with sample data
   npm run seed:fresh
   ```

5. **Start development servers**
   ```bash
   # Backend server
   npm run dev
   
   # Frontend - open frontend/index.html in browser
   ```

## 📝 Development Guidelines

### Code Style
- Use consistent indentation (2 spaces)
- Follow JavaScript ES6+ standards
- Use meaningful variable and function names
- Add comments for complex logic
- Follow the existing project structure

### Backend Guidelines
- Follow MVC (Model-View-Controller) architecture
- Use middleware for authentication and validation
- Implement proper error handling
- Follow RESTful API conventions
- Use Sequelize for database operations
- Validate input data using express-validator

### Frontend Guidelines
- Write semantic HTML
- Use responsive design principles
- Follow the existing CSS structure
- Keep JavaScript modular
- Handle errors gracefully with user feedback
- Use modern JavaScript features (ES6+)

### Database Guidelines
- Use proper foreign key relationships
- Follow naming conventions (PascalCase for models, camelCase for attributes)
- Write migrations for schema changes
- Use transactions for complex operations

## 🔧 Pull Request Process

1. **Create a feature branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make your changes**
   - Write clean, well-documented code
   - Test your changes thoroughly
   - Ensure no breaking changes

3. **Commit your changes**
   ```bash
   git add .
   git commit -m "feat: add your feature description"
   ```

4. **Push and create PR**
   ```bash
   git push origin feature/your-feature-name
   ```
   Then create a pull request on GitHub.

### Commit Message Format
Follow conventional commit format:
- `feat:` new features
- `fix:` bug fixes
- `docs:` documentation updates
- `style:` formatting changes
- `refactor:` code refactoring
- `test:` adding tests
- `chore:` maintenance tasks

## 🧪 Testing

### Backend Testing
- Test all API endpoints
- Verify authentication works correctly
- Check database operations
- Test error handling

### Frontend Testing
- Test in multiple browsers (Chrome, Firefox, Safari)
- Verify responsive design on different screen sizes
- Test all user interactions
- Validate form submissions and error handling

### Manual Testing Checklist
- [ ] User registration works
- [ ] User login works
- [ ] Patient CRUD operations work
- [ ] Doctor CRUD operations work
- [ ] Patient-doctor assignment works
- [ ] All delete operations work with confirmation
- [ ] Error messages display correctly
- [ ] Responsive design works on mobile/tablet

## 🐛 Reporting Issues

When reporting bugs, please include:
- Clear description of the issue
- Steps to reproduce
- Expected behavior
- Actual behavior
- Browser/OS information
- Screenshots if applicable

## 💡 Feature Requests

For new features:
- Describe the feature clearly
- Explain the use case
- Consider impact on existing functionality
- Suggest implementation approach if possible

## 📋 Project Areas for Contribution

### High Priority
- [ ] Unit and integration tests
- [ ] API documentation improvements
- [ ] Performance optimizations
- [ ] Security enhancements
- [ ] Mobile responsiveness improvements

### Medium Priority
- [ ] Additional patient fields (insurance, emergency contacts)
- [ ] Doctor availability scheduling
- [ ] Patient appointment system
- [ ] Email notifications
- [ ] Data export features

### Low Priority
- [ ] Advanced search and filtering
- [ ] Patient history tracking
- [ ] Dashboard analytics
- [ ] Multi-language support
- [ ] Dark mode theme

## 🔒 Security

- Never commit sensitive data (passwords, API keys)
- Use environment variables for configuration
- Follow security best practices
- Report security issues privately

## 📚 Resources

- [Express.js Documentation](https://expressjs.com/)
- [Sequelize Documentation](https://sequelize.org/)
- [PostgreSQL Documentation](https://www.postgresql.org/docs/)
- [JWT Documentation](https://jwt.io/)

## 📞 Getting Help

- Check existing issues on GitHub
- Review the README.md documentation
- Ask questions in discussions
- Contact maintainers for complex issues

## 📄 License

By contributing, you agree that your contributions will be licensed under the ISC License.

---

Thank you for contributing to CareLink! Your help makes this project better for everyone. 🙏
