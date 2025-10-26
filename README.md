# Full Stack Todo Application

A modern, full-stack todo application built with PostgreSQL, Node.js/TypeScript/Express, and React/TypeScript. The application allows users to create, view, and complete tasks with a clean, responsive interface.

## 🏗️ Architecture

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Frontend      │    │   Backend       │    │   Database      │
│   (React/TS)    │◄──►│   (Node.js/TS)  │◄──►│   (PostgreSQL)  │
│   Port: 3000    │    │   Port: 3001    │    │   Port: 5433    │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

### Components

- **Frontend**: React 18 with TypeScript, Vite, Tailwind CSS
- **Backend**: Node.js with TypeScript, Express.js, PostgreSQL client
- **Database**: PostgreSQL 15 with connection pooling
- **Containerization**: Docker with docker-compose orchestration
- **Testing**: Jest (unit/integration), Vitest (frontend), Playwright (E2E)

## 🚀 Quick Start

### Prerequisites

**Only Docker and GNU tools required** (standard in Linux environments):

- Docker and Docker Compose
- curl (for testing)
- bash (for scripts)

**No additional software needed:**

- ❌ Node.js (handled by Docker)
- ❌ npm/yarn (handled by Docker)
- ❌ PostgreSQL (handled by Docker)
- ❌ Any build tools (handled by Docker)

### Running the Application

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd Todo-Web-Application
   ```

2. **Quick Start (Recommended)**

   ```bash
   # Automated verification and setup
   ./verify-setup.sh
   ```

   Or for a quick test:

   ```bash
   ./quick-test.sh
   ```

3. **Manual Start**

   ```bash
   docker-compose up --build
   ```

4. **Access the application**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:3001/api
   - Database: localhost:5433

The application will automatically:

- Initialize the PostgreSQL database
- Create the required tables and indexes
- Start the backend API server
- Build and serve the frontend application

## 📋 Features

### User Requirements ✅

- ✅ Create tasks with title and description
- ✅ View the 5 most recent incomplete tasks
- ✅ Mark tasks as completed (removes from UI)
- ✅ Clean, responsive web interface

### Technical Requirements ✅

- ✅ PostgreSQL database with `task` table
- ✅ REST API backend with proper endpoints
- ✅ React SPA frontend
- ✅ Full Docker containerization
- ✅ Comprehensive test coverage

## 🗄️ Database Schema

```sql
CREATE TABLE task (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    completed BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

**Indexes:**

- `idx_task_completed_created` on (completed, created_at DESC)
- `idx_task_created` on (created_at DESC)

## 🔌 API Endpoints

### Create Task

```http
POST /api/tasks
Content-Type: application/json

{
  "title": "Task title",
  "description": "Optional description"
}
```

**Response:**

```json
{
  "id": 1,
  "title": "Task title",
  "description": "Optional description",
  "completed": false,
  "created_at": "2023-01-01T00:00:00Z"
}
```

### Get Recent Tasks

```http
GET /api/tasks
```

**Response:**

```json
[
  {
    "id": 1,
    "title": "Task title",
    "description": "Optional description",
    "completed": false,
    "created_at": "2023-01-01T00:00:00Z"
  }
]
```

### Complete Task

```http
PATCH /api/tasks/:id/complete
```

**Response:**

```json
{
  "id": 1,
  "title": "Task title",
  "description": "Optional description",
  "completed": true,
  "created_at": "2023-01-01T00:00:00Z"
}
```

## 🧪 Testing

### Manual Testing

```bash
# Test API endpoints
curl http://localhost:3001/api/tasks
curl -X POST http://localhost:3001/api/tasks \
  -H "Content-Type: application/json" \
  -d '{"title": "Test Task", "description": "Test Description"}'

# Test frontend
curl -I http://localhost:3000
```

### Development Tests

```bash
cd backend
npm test                    # Run all tests
npm run test:coverage      # Run with coverage report
npm run test:watch         # Run in watch mode
```

```bash
cd frontend
npm test                   # Run all tests
npm run test:coverage     # Run with coverage report
npm run test:ui           # Run with UI
```

```bash
# Docker-based E2E testing (recommended for evaluators)
./run-e2e-tests.sh

# Or manual Docker E2E testing
cd e2e
docker-compose -f docker-compose.test.yml up --build

# View test results at http://localhost:9323
```

**Note**: E2E tests require Docker and run in containers to avoid needing local browser installations.

### Test Coverage

- **Backend**: Unit tests for services, integration tests for API endpoints
- **Frontend**: Component tests with React Testing Library
- **E2E**: Full user workflows with Playwright across multiple browsers

## 🐳 Docker Configuration

### Services

1. **Database** (`todo-database`)

   - PostgreSQL 15 Alpine
   - Persistent volume for data
   - Health checks for readiness

2. **Backend** (`todo-backend`)

   - Multi-stage build (TypeScript → Node.js)
   - Environment-based configuration
   - Health checks for API availability

3. **Frontend** (`todo-frontend`)
   - Multi-stage build (React → Nginx)
   - Optimized static file serving
   - Gzip compression and caching

### Environment Variables

```bash
# Database
DB_HOST=database
DB_PORT=5432
DB_NAME=todo_db
DB_USER=todo_user
DB_PASSWORD=todo_password

# Backend
NODE_ENV=production
PORT=3001

# Frontend
VITE_API_URL=http://localhost:3001/api
```

## 🏗️ Development

### Local Development (without Docker)

1. **Backend**

   ```bash
   cd backend
   npm install
   npm run dev
   ```

2. **Frontend**

   ```bash
   cd frontend
   npm install
   npm run dev
   ```

3. **Database**
   ```bash
   # Start PostgreSQL locally or use Docker
   docker run -d -p 5432:5432 -e POSTGRES_DB=todo_db -e POSTGRES_USER=todo_user -e POSTGRES_PASSWORD=todo_password postgres:15-alpine
   ```

### Project Structure

```
Todo-Web-Application/
├── backend/                 # Node.js/TypeScript API
│   ├── src/
│   │   ├── config/         # Database configuration
│   │   ├── controllers/    # Request handlers
│   │   ├── models/         # Type definitions
│   │   ├── routes/         # API routes
│   │   ├── services/       # Business logic
│   │   └── middleware/     # Express middleware
│   ├── tests/              # Backend tests
│   └── Dockerfile
├── frontend/               # React/TypeScript SPA
│   ├── src/
│   │   ├── components/     # React components
│   │   ├── services/       # API client
│   │   ├── types/          # TypeScript types
│   │   └── test/           # Frontend tests
│   └── Dockerfile
├── e2e/                    # End-to-end tests
│   ├── tests/              # Playwright tests
│   └── playwright.config.ts
├── docker-compose.yml      # Service orchestration
├── init.sql               # Database initialization
└── README.md
```

## 🔧 Technology Choices

### Backend

- **Node.js + TypeScript**: Modern JavaScript runtime with type safety
- **Express.js**: Minimal, flexible web framework
- **PostgreSQL**: Robust relational database with excellent Docker support
- **Jest**: Comprehensive testing framework with mocking capabilities

### Frontend

- **React 18**: Modern UI library with hooks and concurrent features
- **TypeScript**: Type safety and better developer experience
- **Vite**: Fast build tool and development server
- **Tailwind CSS**: Utility-first CSS framework for rapid UI development
- **Axios**: Promise-based HTTP client for API communication

### Testing

- **Jest**: Backend unit and integration testing
- **Vitest**: Fast frontend testing with Vite integration
- **React Testing Library**: Simple and complete testing utilities
- **Playwright**: Cross-browser E2E testing with excellent debugging


### UI Snap shot 

<img width="2880" height="2698" alt="image" src="https://github.com/user-attachments/assets/6f20e3f2-51e6-484d-a099-c778206726c0" />

