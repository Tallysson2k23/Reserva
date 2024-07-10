const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Vehicle = require('../models/Vehicle');
const Reservation = require('../models/Reservation');

const router = express.Router();
const jwtSecret = 'your_jwt_secret';

// Register
router.post('/register', async (req, res) => {
    const { username, email, password } = req.body;
    try {
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ msg: 'User already exists' });
        }
        user = new User({ username, email, password });
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);
        await user.save();
        const payload = { user: { id: user.id } };
        jwt.sign(payload, jwtSecret, { expiresIn: 360000 }, (err, token) => {
            if (err) throw err;
            res.json({ token });
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// Login
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        let user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ msg: 'Invalid credentials' });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ msg: 'Invalid credentials' });
        }
        const payload = { user: { id: user.id } };
        jwt.sign(payload, jwtSecret, { expiresIn: 360000 }, (err, token) => {
            if (err) throw err;
            res.json({ token });
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// Add Vehicle
router.post('/vehicle', async (req, res) => {
    const { brand, model } = req.body;
    try {
        let vehicle = new Vehicle({ brand, model });
        await vehicle.save();
        res.json(vehicle);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// Reserve Vehicle
router.post('/reserve', async (req, res) => {
    const { userId, vehicleId } = req.body;
    try {
        const reservation = new Reservation({
            user: userId,
            vehicle: vehicleId
        });
        await reservation.save();
        res.json(reservation);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

module.exports = router;
