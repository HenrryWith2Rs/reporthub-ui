# Use the official Node.js 20 image as build stage
FROM node:20 as build

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json (if available)
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy the rest of the application code
COPY . .

# Compile TypeScript
RUN npm run build

# Second stage: Use a lightweight base image like Alpine Linux
FROM nginx:alpine

# Set the working directory in the container
WORKDIR /usr/share/nginx/html

# Copy the built application files from the previous stage
COPY --from=build /usr/src/app/dist .

# Expose the port the NGINX server runs on
EXPOSE 80

# Start NGINX in the foreground
CMD ["nginx", "-g", "daemon off;"]