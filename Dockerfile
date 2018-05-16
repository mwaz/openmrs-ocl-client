# # Stage-1 Build process
# # Use the official node:7.10 runtime image for the build environment and tag the build as build-deps
# FROM node:7.10 as build-deps

# # Create a workking directory for the build project
# WORKDIR /urs/src/app

# ENV PATH /usr/src/app/node_modules/.bin:$PATH
# # Copy the package.json and the package-lock.json to the working directory
# COPY package.json package-lock.json ./

# RUN npm install react-scripts@1.1.1 -g --silent
# COPY . /usr/src/app
# # Create an optimized build version of the project
# RUN npm build


# # Stage-2 Production Environment
# # Use the nginx 1.12-alpine runtime image for the production environment
# FROM nginx:1.12-alpine

# # Copy the tagged files from the build to the production environmnet of the nginx server
# COPY --from=build-deps /urs/src/app/build/ /usr/share/nginx/html

# # Make port 80 available to the world outside the container
# EXPOSE 80

# # Run the nginx server
# CMD ["nginx", "-g", "daemon off;"]


# build environment
FROM node:9.6.1 as builder
RUN mkdir /usr/src/app
WORKDIR /usr/src/app
ENV PATH /usr/src/app/node_modules/.bin:$PATH
COPY package.json /usr/src/app/package.json
RUN npm install --silent
RUN npm install react-scripts@1.1.1 -g --silent
COPY . /usr/src/app
RUN npm run build

# production environment
FROM nginx:1.13.9-alpine
COPY --from=builder /usr/src/app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]