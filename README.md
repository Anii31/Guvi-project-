# 🚙 AutoRent Pro - Vehicle Rental Management System

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![Node.js](https://img.shields.io/badge/Node.js-16%2B-brightgreen.svg)](https://nodejs.org/)
[![MySQL](https://img.shields.io/badge/MySQL-8.0%2B-orange.svg)](https://www.mysql.com/)
[![JavaScript](https://img.shields.io/badge/JavaScript-ES2021-yellow.svg)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)

AutoRent Pro is a modern vehicle rental management system designed for rental agencies. Built with cutting-edge web technologies, it streamlines the entire rental workflow from vehicle search to return processing, ensuring zero booking conflicts and maximum operational efficiency.

## 🎯 System Overview

![AutoRent Pro Dashboard](https://via.placeholder.com/800x400/28a745/ffffff?text=AutoRent+Pro+Dashboard)

> **Note**: This system is designed for professional rental agencies and fleet management companies

## ✨ Key Features

### Core Functionality
- **Vehicle Discovery**: Advanced search with date-based availability filtering
- **Real-time Reservations**: Instant booking with automated conflict prevention
- **Rental Management**: Complete booking lifecycle management
- **Return Processing**: Comprehensive vehicle return workflow with condition tracking
- **Mobile-First Design**: Optimized for all devices and screen sizes

### Advanced Capabilities
- **Smart Date Picker**: Integrated calendar with dd/mm/yyyy format support
- **Dynamic Pricing**: Automatic cost calculation based on rental duration
- **Condition Assessment**: Detailed vehicle condition tracking with damage reporting
- **Email-based Lookup**: Quick booking retrieval using customer email
- **Fleet Analytics**: Comprehensive reporting and statistics

## 🛠️ Technology Stack

### Frontend
- **HTML5**: Modern semantic markup
- **CSS3**: Advanced styling with gradients, animations, and responsive grid
- **Vanilla JavaScript**: Dynamic functionality with ES2021 features
- **Calendar Integration**: Custom date picker with dd/mm/yyyy format

### Backend
- **Node.js**: High-performance JavaScript runtime
- **Express.js**: Lightweight web application framework
- **MySQL**: Robust relational database with ACID compliance
- **RESTful API**: Clean, scalable API architecture

## 📁 Project Architecture

```
autorent-pro-system/
├── 📁 backend/
│   ├── 📁 config/
│   │   └── database.js          # MySQL connection & setup
│   ├── 📁 routes/
│   │   ├── bookings.js          # Booking management API
│   │   ├── cars.js              # Vehicle inventory API
│   │   └── returns.js           # Return processing API
│   ├── .env.example             # Environment configuration template
│   ├── app.js                   # Express server configuration
│   ├── package.json             # Backend dependencies
│   └── setup-database.sql       # Database initialization script
├── 📁 frontend/
│   ├── index.html               # Main application interface
│   ├── script.js                # Frontend logic and interactions
│   └── styles.css               # Comprehensive styling
├── .gitignore                   # Git exclusion rules
├── CONTRIBUTING.md              # Contribution guidelines
├── LICENSE                      # MIT license
├── package.json                 # Project metadata
└── README.md                    # Project documentation
```

## 🚀 Quick Start

### Prerequisites
- **Node.js** (v16 or higher)
- **npm** (Node Package Manager)
- **MySQL** (v8.0 or higher)

### Installation Steps

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/autorent-pro-system.git
   cd autorent-pro-system
   ```

2. **Database Setup**
   
   **Option A: MySQL Command Line**
   ```bash
   mysql -u root -p < backend/setup-database.sql
   ```
   
   **Option B: MySQL Workbench**
   - Import and execute `backend/setup-database.sql`

3. **Environment Configuration**
   ```bash
   cd backend
   cp .env.example .env
   ```
   
   Update `.env` with your MySQL credentials:
   ```env
   DB_HOST=localhost
   DB_USER=root
   DB_PASSWORD=your_mysql_password
   DB_NAME=autorent_pro_db
   DB_PORT=3306
   PORT=3001
   NODE_ENV=development
   ```

4. **Install Dependencies**
   ```bash
   npm install
   ```

5. **Launch Application**
   ```bash
   npm start
   ```

6. **Access the System**
   - Frontend: `http://localhost:3001`
   - API: `http://localhost:3001/api`

### Development Mode
```bash
npm run dev  # Auto-restart on changes
```

## 🚗 Vehicle Fleet

The system comes pre-configured with a diverse vehicle fleet:

| Vehicle | Category | Daily Rate | Features |
|---------|----------|------------|----------|
| **Nissan Altima** | Budget-Friendly | $38/day | AC, Automatic, 5 Seats, Bluetooth |
| **Hyundai Elantra** | Compact Cars | $35/day | AC, CVT, 4 Seats, USB Ports |
| **Jeep Grand Cherokee** | SUV & Trucks | $82/day | AC, Automatic, 7 Seats, AWD, Roof Rails |
| **Audi A4** | Premium Vehicles | $135/day | AC, Automatic, 5 Seats, Leather, Navigation, Sunroof |
| **GMC Yukon** | SUV & Trucks | $95/day | AC, Automatic, 8 Seats, 4WD, Towing Package |
| **Lexus ES** | Premium Vehicles | $155/day | AC, Automatic, 5 Seats, Leather, Premium Audio, Heated Seats |

## 📖 API Documentation

### Vehicle Endpoints
- `GET /api/cars` - Retrieve all vehicles with filtering options
- `GET /api/cars/:id` - Get specific vehicle details
- `PUT /api/cars/:id/availability` - Update vehicle availability status

### Booking Endpoints
- `GET /api/bookings` - List all bookings (supports email filtering)
- `GET /api/bookings/:id` - Retrieve specific booking details
- `POST /api/bookings` - Create new booking reservation
- `PUT /api/bookings/:id/status` - Update booking status
- `DELETE /api/bookings/:id` - Cancel active booking

### Return Processing Endpoints
- `GET /api/returns` - List all return records
- `GET /api/returns/:id` - Get specific return details
- `POST /api/returns` - Process vehicle return
- `POST /api/returns/validate` - Validate booking for return eligibility

## 🎯 Usage Guide

### For Customers

1. **Vehicle Search**
   - Select pickup and return dates using the calendar picker
   - Choose vehicle category (optional)
   - Click "Find Available Vehicles"

2. **Make Reservation**
   - Click "Book Now" on your preferred vehicle
   - Complete customer information form
   - Review booking summary and total cost
   - Confirm reservation and save booking ID

3. **Manage Rentals**
   - Navigate to "My Rentals" section
   - Enter email address to view all bookings
   - Cancel active reservations if needed

4. **Vehicle Return**
   - Go to "Vehicle Returns" section
   - Enter booking ID for return processing
   - Assess vehicle condition and add notes
   - Complete return process

### For Administrators

- Monitor fleet utilization through API endpoints
- Generate booking and return statistics
- Manage vehicle availability and pricing
- Process returns with damage assessment

## 🔧 Configuration Options

### Database Settings
The system uses MySQL with the following default configuration:
- Database: `autorent_pro_db`
- Port: `3306`
- Connection pooling enabled for optimal performance

### Server Configuration
- Default port: `3001`
- CORS enabled for cross-origin requests
- Environment-based configuration support

## 🚀 Deployment

### Production Deployment
1. Set `NODE_ENV=production` in environment variables
2. Configure production MySQL database
3. Set up proper SSL certificates
4. Configure reverse proxy (nginx recommended)
5. Set up process manager (PM2 recommended)

### Security Considerations
- Implement authentication and authorization
- Add rate limiting for API endpoints
- Enable HTTPS in production
- Sanitize all user inputs
- Set up proper logging and monitoring

## 🤝 Contributing

We welcome contributions! Please see [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

For support and questions:
- Review the API documentation
- Check the troubleshooting section
- Submit issues on GitHub

## 🔮 Future Enhancements

- **Multi-language Support**: Internationalization for global markets
- **Payment Integration**: Stripe/PayPal integration for online payments
- **Mobile App**: Native iOS and Android applications
- **Advanced Analytics**: Business intelligence dashboard
- **IoT Integration**: Vehicle tracking and monitoring
- **AI-Powered Recommendations**: Smart vehicle suggestions

---

**AutoRent Pro** - Revolutionizing vehicle rental management with modern technology and user-centric design.