import userModel from '../models/userModel.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

// Create Token
const createToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET);
};

// Login User
const loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await userModel.findOne({ email });

        if (!user) {
            return res.json({ success: false, message: "User doesn't exist" });
        }

        // Checking if password matches
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.json({ success: false, message: 'Invalid password' });
        }

        const token = createToken(user._id);
        res.json({ success: true, token, username: user.name });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: 'Error' });
    }
};

// Register User
const registerUser = async (req, res) => {
    const { name, password, email } = req.body;
    try {
        // Checking if user already exists
        const exists = await userModel.findOne({ email });

        if (exists) {
            return res.json({ success: false, message: 'User already exists' });
        }

        // Validating email format
        const emailReg = /^[a-zA-Z0-9.+_-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

        if (!emailReg.test(email)) {
            return res.json({ success: false, message: 'Please enter a valid email' });
        }

        // Validating password strength
        if (password.length < 8) {
            return res.json({
                success: false,
                message: 'Password must be at least 8 characters long',
            });
        }

        // Ensuring at least 1 uppercase letter
        if (!/[A-Z]/.test(password)) {
            return res.json({
                success: false,
                message: 'Password must include at least 1 uppercase letter',
            });
        }

        // Ensuring at least 2 numbers
        if (!/\d.*\d/.test(password)) {
            return res.json({
                success: false,
                message: 'Password must include at least 2 numbers',
            });
        }

        // Ensuring at least 1 special character
        if (!/[!@#$%^&*]/.test(password)) {
            return res.json({
                success: false,
                message: 'Password must include at least 1 special character',
            });
        }

        // Ensuring it contains lowercase letters
        if (!/[a-z]/.test(password)) {
            return res.json({
                success: false,
                message: 'Password should contain lowercase letters.',
            });
        }

        // Hashing user password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new userModel({
            name: name,
            email: email,
            password: hashedPassword,
        });

        const user = await newUser.save();
        const token = createToken(user._id);
        res.json({ success: true, token, username: user.name });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: 'Error' });
    }
};

export { loginUser, registerUser };
