# Use Node.js 22 bullseye
FROM node:22-bullseye

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json pnpm-lock.yaml ./

# Install dependencies
RUN npm install -g pnpm
RUN pnpm install

# Copy source code
COPY . .

# Expose port for Vite dev server
ENV HOST=0.0.0.0 PORT=5173
EXPOSE ${PORT}

# Start the development server
CMD ["pnpm", "run", "dev", "--host", "0.0.0.0"]