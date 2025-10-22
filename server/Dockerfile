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

# Expose port
ENV HOST=0.0.0.0 PORT=3000
EXPOSE ${PORT}

ENV NODE_OPTIONS='--unhandled-rejections=warn'
CMD ["node", "."]