# Stage-1 Build process
# Use the official node:9.6.1 runtime image for the build environment and tag the build as build-deps
FROM node:9.6.1 as build-deps

# Create a working directory for the build project
RUN mkdir /usr/src/app

# Navigate to the created working directory
WORKDIR /usr/src/app

# Create an enviroment variable for the node_modules
ENV PATH /usr/src/app/node_modules/.bin:$PATH

# Copy the package.json and the package-lock.json to the working directory
COPY package.json package-lock.json ./

# Install the project dependencies and silence the npm output
RUN npm install --silent

# Install react-scripts and silence the npm output
RUN npm install react-scripts@1.1.1 -g --silent

# Copy everything to the working directory
COPY . /usr/src/app

# Create an optimized build version of the project
RUN npm run build

# Stage-2 Production Environment
# Use the nginx 1.12-alpine runtime image for the production environment
FROM nginx:1.12-alpine

# Copy the tagged files from the build to the production environmnet of the nginx server
COPY --from=build-deps /usr/src/app/build /usr/share/nginx/html

# Make port 80 available to the world outside the container
EXPOSE 80

# Run the nginx server
CMD ["nginx", "-g", "daemon off;"]
