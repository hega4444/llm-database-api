# LLM Database API

> A comprehensive NestJS-based REST API for exploring and analyzing Large Language Models (LLMs)

[![NestJS](https://img.shields.io/badge/NestJS-E0234E?style=flat-square&logo=nestjs&logoColor=white)](https://nestjs.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat-square&logo=node.js&logoColor=white)](https://nodejs.org/)
[![Jest](https://img.shields.io/badge/Jest-C21325?style=flat-square&logo=jest&logoColor=white)](https://jestjs.io/)

## 📖 About

This project is an educational demonstration of building a professional REST API using NestJS framework. It provides a structured interface for querying and analyzing Large Language Model data, showcasing best practices in:

- **Modern Backend Architecture** - Built with NestJS's modular, scalable architecture
- **Type Safety** - Full TypeScript implementation with strict typing
- **Data Validation** - Custom pipes for input validation and transformation  
- **Testing Excellence** - Comprehensive unit and integration test coverage
- **Clean Code** - Following SOLID principles and clean architecture patterns

## 🎯 Educational Objectives

This API serves as a learning resource for:
- Implementing robust input validation and error handling
- Building scalable backend services with NestJS

## 🚀 Features

### Core Functionality
- **Complete LLM Database** - Access comprehensive information about various LLMs
- **Advanced Filtering** - Query by developer, capabilities, release year, and open source status
- **Robust Validation** - Input validation with custom pipes and error handling
- **Type-Safe Operations** - Full TypeScript support for better developer experience

### Technical Highlights
- **Modular Architecture** - Clean separation of controllers, services, and data layers
- **Custom Pipes** - Specialized validation for positive integers and year formats
- **Error Handling** - Consistent error responses with appropriate HTTP status codes
- **Test Coverage** - Unit tests for all components with real service integration

## 📊 Dataset

The API leverages a curated dataset of LLM information including:
- Model names and developers
- Release dates and parameter sizes
- Open source status
- Capabilities and use cases

## 🛠 Installation

```bash
# Clone the repository
git clone <repository-url>
cd llm-database-api

# Install dependencies
npm install
```

## 🏃‍♂️ Running the Application

```bash
# Development mode with hot reload
npm run start:dev

# Production mode
npm run start:prod

# Development mode (basic)
npm run start
```

The API will be available at `http://localhost:3000`

## 🧪 Testing

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Generate test coverage report
npm run test:cov

# Run end-to-end tests
npm run test:e2e
```

## 🔗 API Reference

### Health Check
```
GET /health
```
Returns the API health status and timestamp.

### LLM Endpoints

#### Get All LLMs
```
GET /llms
```
Returns all available LLM records.

#### Get LLM by ID
```
GET /llms/:id
```
Returns a specific LLM by its unique identifier.
- **Parameters**: `id` (positive integer)

#### Search by Developer
```
GET /llms/search/developer?name=<developer_name>
```
Returns LLMs developed by the specified organization.
- **Query Parameters**: `name` (required, non-empty string)

#### Filter by Open Source Status
```
GET /llms/search/open-source?value=<true|false>
```
Returns LLMs based on their open source availability.
- **Query Parameters**: `value` (required, must be "true" or "false")

#### Search by Capability
```
GET /llms/search/capability?name=<capability>
```
Returns LLMs that possess the specified capability.
- **Query Parameters**: `name` (required, non-empty string)

#### Filter by Release Year
```
GET /llms/search/year?year=<year>
```
Returns LLMs released in the specified year.
- **Query Parameters**: `year` (required, 4-digit year format)

## 📁 Project Structure

```
src/
├── app.controller.ts          # Application controller with health endpoint
├── app.module.ts             # Root application module
├── common/                   # Shared utilities and pipes
│   └── pipes/               # Custom validation pipes
├── llms/                    # LLM module
│   ├── llms.controller.ts   # LLM endpoints controller
│   ├── llms.service.ts      # Business logic service
│   └── *.spec.ts           # Test files
└── main.ts                  # Application entry point
```

## 🎓 Learning Resources

This project demonstrates several key concepts:

1. **NestJS Fundamentals**
   - Modules, Controllers, and Services
   - Dependency Injection
   - Custom Pipes and Validation

2. **TypeScript Best Practices**
   - Interface definitions
   - Type safety
   - Generic types

3. **Testing Strategies**
   - Unit testing with Jest
   - Mocking and test doubles
   - Integration testing

4. **API Design**
   - RESTful principles
   - Error handling
   - Input validation

## 🤝 Contributing

This is an educational project. Contributions that enhance the learning experience are welcome:

1. Fork the project
2. Create a feature branch (`git checkout -b feature/enhancement`)
3. Commit your changes (`git commit -m 'Add educational enhancement'`)
4. Push to the branch (`git push origin feature/enhancement`)
5. Open a Pull Request

## 📚 Further Reading

- [NestJS Documentation](https://docs.nestjs.com/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [REST API Design Best Practices](https://restfulapi.net/)
- [Testing Node.js Applications](https://jestjs.io/docs/getting-started)

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---