# vue2-todo-list

This simple To-Do App done with Vue2, Express and Mongo.

## Services

- **MongoDB**: Database server on port 27017
- **Server**: Node.js/Express API on port 3000
- **Client**: Vue.js frontend on port 5173

## Project launch (via Docker-compose)

This Docker Compose setup runs the complete Todo List application with three services and a seed tool for example data:

```bash
docker-compose up
```

## Access

- **Frontend**: http://localhost:5173
- **API**: http://localhost:3000/api/tasks
- **MongoDB**: localhost:27017

### Compile and Hot-Reload for Development

```sh
cd client
pnpm install
cd ../server
pnpm install

pnpm run dev
```
