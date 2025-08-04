CREATE DATABASE IF NOT EXISTS autorent_pro_db;
USE autorent_pro_db;

CREATE TABLE IF NOT EXISTS cars (
    id INT PRIMARY KEY AUTO_INCREMENT,
    model VARCHAR(100) NOT NULL,
    type ENUM('economy', 'compact', 'suv', 'luxury') NOT NULL,
    price_per_day DECIMAL(10, 2) NOT NULL,
    available BOOLEAN DEFAULT TRUE,
    image VARCHAR(500) DEFAULT 'https://via.placeholder.com/300x200/28a745/ffffff?text=Vehicle+Image',
    features JSON,
    year INT,
    color VARCHAR(50),
    fuel_type VARCHAR(50),
    license_plate VARCHAR(20) UNIQUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS customers (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    license_number VARCHAR(50) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_email (email)
);

CREATE TABLE IF NOT EXISTS bookings (
    id INT PRIMARY KEY AUTO_INCREMENT,
    car_id INT NOT NULL,
    customer_id INT NOT NULL,
    pickup_date DATE NOT NULL,
    return_date DATE NOT NULL,
    days INT NOT NULL,
    total_cost DECIMAL(10, 2) NOT NULL,
    status ENUM('active', 'completed', 'cancelled') DEFAULT 'active',
    booking_date DATE NOT NULL,
    additional_charges DECIMAL(10, 2) DEFAULT 0,
    return_condition ENUM('excellent', 'good', 'fair', 'poor') NULL,
    return_notes TEXT NULL,
    actual_return_date DATE NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (car_id) REFERENCES cars(id),
    FOREIGN KEY (customer_id) REFERENCES customers(id),
    INDEX idx_status (status),
    INDEX idx_dates (pickup_date, return_date)
);

CREATE TABLE IF NOT EXISTS returns (
    id INT PRIMARY KEY AUTO_INCREMENT,
    booking_id INT NOT NULL,
    return_date DATE NOT NULL,
    return_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    condition_rating ENUM('excellent', 'good', 'fair', 'poor') NOT NULL,
    notes TEXT,
    mileage INT,
    fuel_level INT,
    damages JSON,
    additional_charges DECIMAL(10, 2) DEFAULT 0,
    total_amount DECIMAL(10, 2) NOT NULL,
    processed_by VARCHAR(100) DEFAULT 'System',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (booking_id) REFERENCES bookings(id),
    INDEX idx_return_date (return_date)
);

INSERT INTO cars (model, type, price_per_day, available, image, features, year, color, fuel_type, license_plate) VALUES
('Nissan Altima', 'economy', 38.00, TRUE, 'https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80', '["AC", "Automatic", "5 Seats", "Bluetooth"]', 2023, 'White', 'Gasoline', 'NAL-001'),
('Hyundai Elantra', 'compact', 35.00, TRUE, 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80', '["AC", "CVT", "4 Seats", "USB Ports"]', 2022, 'Red', 'Gasoline', 'HEL-002'),
('Jeep Grand Cherokee', 'suv', 82.00, FALSE, 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80', '["AC", "Automatic", "7 Seats", "AWD", "Roof Rails"]', 2023, 'Green', 'Gasoline', 'JGC-003'),
('Audi A4', 'luxury', 135.00, TRUE, 'https://images.unsplash.com/photo-1606016159991-8b5d2f87a5a8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80', '["AC", "Automatic", "5 Seats", "Leather", "Navigation", "Sunroof"]', 2024, 'Silver', 'Gasoline', 'AUA-004'),
('GMC Yukon', 'suv', 95.00, TRUE, 'https://images.unsplash.com/photo-1581540222194-0def2dda95b8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80', '["AC", "Automatic", "8 Seats", "4WD", "Towing Package"]', 2023, 'Blue', 'Gasoline', 'GMY-005'),
('Lexus ES', 'luxury', 155.00, TRUE, 'https://images.unsplash.com/photo-1617788138017-80ad40651399?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80', '["AC", "Automatic", "5 Seats", "Leather", "Premium Audio", "Heated Seats"]', 2024, 'Black', 'Gasoline', 'LES-006');

SELECT 'Database setup completed successfully!' as message;