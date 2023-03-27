ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'root';
ALTER USER 'root' IDENTIFIED WITH mysql_native_password BY 'root';
flush privileges;


CREATE DATABASE IF NOT EXISTS scoreboard_db;

USE scoreboard_db;

CREATE TABLE IF NOT EXISTS scoreboard (
  playername VARCHAR(255) NOT NULL,
  score INT NOT NULL,
  PRIMARY KEY (playername)
);
