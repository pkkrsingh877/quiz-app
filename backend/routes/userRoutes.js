const express = require('express');
const router = express.Router();
const User = require('../models/user');
const bcrypt = require('bcrypt');
const { generateToken, verifyToken } = require('../functions/generateToken');

router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        
        // Find the user by email
        const user = await User.findOne({ email });
        
        if (!user) {
            return res.status(401).json({ message: 'Authentication failed' });
        }

        // Compare the provided password with the hashed password
        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
            console.log('User valiadation failed');
            return res.status(401).json({ message: 'Authentication failed' });
        } else {
            console.log('User valiadation successful');
        }

        // Generate a JWT token
        const token = generateToken(user);

        // Set the JWT as a cookie
        res.cookie('jwt', token, {
            httpOnly: true, // Make the cookie accessible only via HTTP(S) and not JavaScript
            maxAge: 24 * 60 * 60 * 1000, // Set the expiration time (e.g., 24 hours)
            path: '/',
            domain: 'http://localhost:3000'
        });
        
        res.status(200).json({ token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

router.post('/signup', async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Check if the email is already registered
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({ message: 'Email already registered' });
        }

        // Hash the password before saving it
        const hashedPassword = await bcrypt.hash(password, 10); // 10 is the salt rounds
        console.log(hashedPassword)
        // Create a new user document with the hashed password
        const newUser = await User.create({ name, email, password: hashedPassword });
        console.log(newUser);

        // Generate a JWT token
        const token = generateToken(newUser);
        // Set the JWT as a cookie
        res.cookie('jwt', token, {
            httpOnly: true,
            maxAge: 24 * 60 * 60 * 1000,
            sameSite: false
        });
        console.log(newUser);
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findOne({ _id: id });
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json(error);
    }
});

module.exports = router;