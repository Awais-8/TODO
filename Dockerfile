# Use an official Node.js image with tag 14 as the base image
FROM node:14

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install application dependencies
RUN npm install

# Copy the entire application to the working directory
COPY . .

# Expose port 3000 for the application
EXPOSE 3000

# Command to run the application
CMD ["node", "server.js"]
