CREATE DATABASE service_monitor;

CREATE TABLE services (id INT AUTO_INCREMENT, name VARCHAR(255), server_ip VARCHAR(15), username VARCHAR(255), password VARCHAR(60), PRIMARY KEY (id));
