# Use an official MySQL 8.0 image as a parent image
FROM mysql:8.0

# Set the root password for MySQL server
ENV MYSQL_ROOT_PASSWORD=root
ENV MYSQL_DATABASE=scoreboard_db

# Copy the SQL script to the container
COPY scoreboard.sql /docker-entrypoint-initdb.d/

RUN echo 'ALTER USER "root"@"localhost" IDENTIFIED WITH mysql_native_password BY "root";\nFLUSH PRIVILEGES;' > /docker-entrypoint-initdb.d/init.sql

# Expose port 3306 for the MySQL server
EXPOSE 3306
