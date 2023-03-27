# Set the base image to use
FROM nginx:latest

# Copy the website files into the container
COPY . /usr/share/nginx/html/

# Expose port 80 for HTTP traffic
EXPOSE 80

# Start the nginx server
CMD ["nginx", "-g", "daemon off;"]