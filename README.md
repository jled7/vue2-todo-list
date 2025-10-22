# vue2-todo-list

This simple To-Do App done with Vue2, Express and Mongo.

## Services

- **MongoDB**: Database server on port 27017
- **Server**: Node.js/Express API on port 3000
- **Client**: Vue.js frontend on port 5173

## 🛠️ Tech Stack

### Frontend

- **Vue 2** - JavaScript framework
- **Vuex 3.6.2** - State management library
- **Fetch API** - HTTP client

### Backend

- **Node.js 22** - Runtime environment
- **Express 5.1.0** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM
- **Morgan** - Request Logging middleware
- **Helmet** - Security middleware
- **CORS** - CORS middleware

## Project launch (via Docker-compose)

This Docker Compose setup runs the complete Todo List application with three services and a seed tool for example data:

```bash
docker-compose up
```

## Access

- **Frontend**: http://localhost:5173
- **API**: http://localhost:3000/api/tasks
- **MongoDB**: localhost:27017

## Installation

1. **Clone the repository**

```bash
git clone https://github.com/jled7/vue2-todo-list.git
cd vue2-todo-list
```

2. **Backend Setup**

```bash
# Install dependencies
cd server
pnpm install

# Start server
pnpm run dev
```

3. **Frontend Setup**

```bash
# Install dependencies
cd client
pnpm install

# Start development server
pnpm run dev
```

## 🔌 API Endpoints

### Tasks

```javascript
// Add Task
POST /api/tasks
body: { title: string }

// Get All Tasks
GET /api/tasks

// Toggle Task
PATCH /api/tasks/:id/toggle
```

## 🗄️ Environment Variables

Environment variables can be set in docker to override the default values shown below

### Frontend (.env)

```bash
VITE_APP_URL=localhost #AllowedHosts Vite option
VITE_API_ENDPOINT=http://localhost:3000 #Backend endpoint
```

### Backend (.env)

```bash
APP_PORT=3000 #Backend port
MONGODB_URI=mongodb://127.0.0.1:27017/todo_list #MongoDB URI
```
