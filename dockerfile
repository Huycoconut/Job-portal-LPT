# --- Stage 1: Build ---
    FROM node:20-alpine AS builder

    WORKDIR /app
    
    # Copy dependencies files
    COPY package*.json ./
    
    # Install dependencies
    RUN npm install --legacy-peer-deps
    
    # Copy source code
    COPY . .

    # Copy env file
    COPY .env .env

    # Build the NestJS app
    RUN npm run build

    # --- Stage 2: Production ---
    FROM node:20-alpine
    
    WORKDIR /app
    
    # Copy only built dist files and node_modules from builder
    COPY --from=builder /app/node_modules ./node_modules
    COPY --from=builder /app/dist ./dist
    COPY --from=builder /app/package*.json ./
    COPY --from=builder /app/.env ./.env
    
    # Set environment variable for production
    ENV NODE_ENV=production
    
    # Start the app
    CMD ["node", "dist/main"]
    