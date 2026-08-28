
const express = require('express');
const cors = require('cors');
require('dotenv').config();
const db = require('./config/db');

const app = express();
const usersRoutes = require('./routes/users');
app.use(cors());
app.use(express.json());
const destinationRoutes = require('./routes/destinations');
app.use('/api/destinations', destinationRoutes);
const userRoutes = require('./routes/users');
app.use('/api/users', userRoutes);

const bookingRoutes = require('./routes/bookings');
app.use('/api/bookings', bookingRoutes);
const activityRoutes = require('./routes/activities');
app.use('/api/activities', activityRoutes);

const donationRoutes = require('./routes/donations');
app.use('/api/donations', donationRoutes);
app.get('/api/test', (req, res) => {
  res.json({ message: 'Backend eka hariyata run wenawa!' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});