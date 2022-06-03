CREATE DATABASE IF NOT EXISTS example;
CREATE TABLE IF NOT EXISTS example.users(
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `email` varchar NOT NULL
  `username` varchar NOT NULL
  `password_hash` varchar NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
