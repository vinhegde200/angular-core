FROM node AS build-env

# Set the working directory to /App.
WORKDIR /App

# Copy all files from the current directory to /App in the container.
COPY . ./
RUN rm -rf node_modules

# Install dependencies using npm.
RUN npm install

# Build the project using npm.
RUN npm run build

FROM nginx

EXPOSE 80
EXPOSE 81

WORKDIR /App

COPY --from=build-env /App/dist/rportal .
COPY nginx/*.conf /etc/nginx/conf.d
