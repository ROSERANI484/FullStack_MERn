import express from 'express';
import '../db/connection.js';
import User from "../db/schema/userSchema.js";
import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken';
import authenticate from "../middleware/authenticate.js";

const router = express.Router();

router.get('/', (req, res) => {
    res.send(`Hello world from the server router js`);
});


//  Registration Route
router.post("/register", async (req, res) => {
    try {
        const { name, email, phone, work, password, cpassword } = req.body;

        // Validation check
        if (!name || !email || !phone || !work || !password || !cpassword) {
            return res.status(422).json({ error: "Please fill all fields properly" });
        }

        // Check if user already exists
        const userExist = await User.findOne({ email });

        if (userExist) {
            return res.status(422).json({ error: "Email already exists" });
        }

        // Check password match
        if (password !== cpassword) {
            return res.status(422).json({ error: "Passwords do not match" });
        }

        // Create new user
        const user = new User({ name, email, phone, work, password, cpassword });
        await user.save();

        res.status(201).json({ message: "User registered successfully" });
    } catch (err) {
        console.error("Registration Error:", err);
        res.status(500).json({ error: "Internal Server Error" });
    }
});


// user login form route
router.post('/signin', async (req, res) => {
    try {
        let token;
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ error: "Please fill the data" });
        }

        const userLogin = await User.findOne({ email: email });

        if (!userLogin) {
            return res.status(400).json({ error: "Invalid credentials email" });
        }

        token = await userLogin.generateAuthToken();
        console.log(token);

        res.cookie("jwtoken", token, {
            expires: new Date(Date.now() + 25892000000),
            httpOnly:true
        });

        const isMatch = await bcrypt.compare(password, userLogin.password);

        if (!isMatch) {
            return res.status(400).json({ error: "Invalid credentials password" });
        } else {
            return res.json({ message: "User signin Successfully" });
        }

    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Something went wrong" });
    }
});

// About us page
router.get("/about", authenticate, (req, res) => {
    res.send(req.rootUser);    // FIXED
});

router.get('/getdata', authenticate, (req, res) => {
    try {
        // console.log("/getdata route hit");
        res.status(200).json(req.rootUser);
    } catch (err) {
        // console.log(" /getdata Error:", err.message);
        res.status(500).json({ error: "Failed to get user data" });
    }
});

// CONTACT FORM
router.post("/contact", authenticate, async (req, res) => {
    try {
        const { name, email, phone, message } = req.body;

        if (!name || !email || !phone || !message) {
            return res.status(400).json({ error: "Please fill all fields" });
        }

        const user = await User.findOne({ _id: req.userID });

        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        await user.addMessage(name, email, phone, message);

        return res.status(201).json({ message: "Message stored successfully" });

    } catch (error) {
        console.log("Contact Route Error:", error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
});

// Logout page
router.get("/logout", (req, res) => {
    console.log(`Hello my Logiut page`);
    res.clearCookie('jwtoken', {path: '/'});
    res.status(200).send('User logout');    // FIXED
});

export default router; 
