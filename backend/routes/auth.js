const router = require("express").Router();
const Admin = require("../models/admin");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

//register admin -- http://localhost:8070/auth/register
router.post("/register", async (req, res) => {
    try {
        const { username, password } = req.body;
        const hashedPassword =
            await bcrypt.hash(password, 10);
        const admin = new Admin({
            username,
            password: hashedPassword
        });
        await admin.save();
        res.status(201).json({
            message: "Admin created"
        });
    } catch (err) {
        res.status(500).json({
            error: err.message
        });
    }
});

//login admin -- http://localhost:8070/auth/login
router.post("/login", async (req, res) => {
    try {
        const { username, password } = req.body;
        const admin = await Admin.findOne({ username });
        if (!admin) {
            return res.status(400).json({
                message: "Invalid username"
            });
        }
        const isMatch = await bcrypt.compare(
            password,
            admin.password
        );
        if (!isMatch) {
            return res.status(400).json({
                message: "Invalid password"
            });
        }

        const token = jwt.sign(
            {
                id: admin._id
            },
            "mySecretKey",
            {
                expiresIn: "1d"
            }
        );
        res.status(200).json({
            token,
            message: "Login Successful"
        });
    } catch (err) {
        res.status(500).json({
            error: err.message
        });
    }
});

module.exports = router;