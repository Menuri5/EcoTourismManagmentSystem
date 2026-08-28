CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  role ENUM('tourist','admin','system_manager') DEFAULT 'tourist',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE destinations (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(150) NOT NULL,
  location VARCHAR(150),
  description TEXT,
  category VARCHAR(50),
  image_url VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE bookings (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT,
  destination_id INT,
  booking_date DATE NOT NULL,
  number_of_people INT DEFAULT 1,
  status ENUM('pending','confirmed','cancelled') DEFAULT 'pending',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id),
  FOREIGN KEY (destination_id) REFERENCES destinations(id)
);

CREATE TABLE activities (
  id INT AUTO_INCREMENT PRIMARY KEY,
  destination_id INT,
  activity_name VARCHAR(150) NOT NULL,
  description TEXT,
  FOREIGN KEY (destination_id) REFERENCES destinations(id)
);

CREATE TABLE donations (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT,
  amount DECIMAL(10,2) NOT NULL,
  purpose VARCHAR(150),
  donated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id)
);