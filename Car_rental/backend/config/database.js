const mysql = require('mysql2/promise');
require('dotenv').config();

const dbConfig = {
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'autorent_pro_db',
    port: process.env.DB_PORT || 3306,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
};

const pool = mysql.createPool(dbConfig);

async function testConnection() {
    try {
        const connection = await pool.getConnection();
        console.log('✅ MySQL Database connected successfully');
        connection.release();
        return true;
    } catch (error) {
        console.error('❌ Database connection failed:', error.message);
        return false;
    }
}

async function initializeDatabase() {
    try {
        await pool.execute(`
            CREATE TABLE IF NOT EXISTS cars (
                id INT PRIMARY KEY AUTO_INCREMENT,
                model VARCHAR(100) NOT NULL,
                type ENUM('economy', 'compact', 'suv', 'luxury') NOT NULL,
                price_per_day DECIMAL(10, 2) NOT NULL,
                available BOOLEAN DEFAULT TRUE,
                image VARCHAR(10) DEFAULT '🚗',
                features JSON,
                year INT,
                color VARCHAR(50),
                fuel_type VARCHAR(50),
                license_plate VARCHAR(20) UNIQUE,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
            )
        `);

        await pool.execute(`
            CREATE TABLE IF NOT EXISTS customers (
                id INT PRIMARY KEY AUTO_INCREMENT,
                name VARCHAR(100) NOT NULL,
                email VARCHAR(100) NOT NULL,
                phone VARCHAR(20) NOT NULL,
                license_number VARCHAR(50) NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
                INDEX idx_email (email)
            )
        `);

        await pool.execute(`
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
            )
        `);

        await pool.execute(`
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
            )
        `);

        console.log('✅ Database tables initialized successfully');
        await insertSampleData();
        
    } catch (error) {
        console.error('❌ Database initialization failed:', error.message);
        throw error;
    }
}

async function insertSampleData() {
    try {
        const [rows] = await pool.execute('SELECT COUNT(*) as count FROM cars');
        
        if (rows[0].count === 0) {
            console.log('📝 Inserting sample car data...');
            
            const sampleCars = [
                {
                    model: 'Nissan Altima',
                    type: 'economy',
                    price_per_day: 38.00,
                    image: 'https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
                    features: JSON.stringify(['AC', 'Automatic', '5 Seats', 'Bluetooth']),
                    year: 2023,
                    color: 'White',
                    fuel_type: 'Gasoline',
                    license_plate: 'NAL-001'
                },
                {
                    model: 'Hyundai Elantra',
                    type: 'compact',
                    price_per_day: 35.00,
                    image: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
                    features: JSON.stringify(['AC', 'CVT', '4 Seats', 'USB Ports']),
                    year: 2022,
                    color: 'Red',
                    fuel_type: 'Gasoline',
                    license_plate: 'HEL-002'
                },
                {
                    model: 'Jeep Grand Cherokee',
                    type: 'suv',
                    price_per_day: 82.00,
                    available: true,
                    image: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
                    features: JSON.stringify(['AC', 'Automatic', '7 Seats', 'AWD', 'Roof Rails']),
                    year: 2023,
                    color: 'Green',
                    fuel_type: 'Gasoline',
                    license_plate: 'JGC-003'
                },
                {
                    model: 'Audi A4',
                    type: 'luxury',
                    price_per_day: 135.00,
                    available: false,
                    image: 'https://images.unsplash.com/photo-1606016159991-8b5d2f87a5a8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
                    features: JSON.stringify(['AC', 'Automatic', '5 Seats', 'Leather', 'Navigation', 'Sunroof']),
                    year: 2024,
                    color: 'Silver',
                    fuel_type: 'Gasoline',
                    license_plate: 'AUA-004'
                },
                {
                    model: 'GMC Yukon',
                    type: 'suv',
                    price_per_day: 95.00,
                    image: 'https://images.unsplash.com/photo-1581540222194-0def2dda95b8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
                    features: JSON.stringify(['AC', 'Automatic', '8 Seats', '4WD', 'Towing Package']),
                    year: 2023,
                    color: 'Blue',
                    fuel_type: 'Gasoline',
                    license_plate: 'GMY-005'
                },
                {
                    model: 'Lexus ES',
                    type: 'luxury',
                    price_per_day: 155.00,
                    image: 'https://images.unsplash.com/photo-1617788138017-80ad40651399?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
                    features: JSON.stringify(['AC', 'Automatic', '5 Seats', 'Leather', 'Premium Audio', 'Heated Seats']),
                    year: 2024,
                    color: 'Black',
                    fuel_type: 'Gasoline',
                    license_plate: 'LES-006'
                }
            ];

            for (const car of sampleCars) {
                await pool.execute(`
                    INSERT INTO cars (model, type, price_per_day, available, image, features, year, color, fuel_type, license_plate)
                    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
                `, [
                    car.model, car.type, car.price_per_day, car.available ?? true, 
                    car.image, car.features, car.year, car.color, car.fuel_type, car.license_plate
                ]);
            }
            
            console.log('✅ Sample car data inserted successfully');
        }
    } catch (error) {
        console.error('❌ Error inserting sample data:', error.message);
    }
}

module.exports = {
    pool,
    testConnection,
    initializeDatabase
};