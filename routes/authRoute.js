const User = require("../models/usermodel");
const jwt = require("jsonwebtoken")
const router = require("express").Router();
const bcrypt = require("bcrypt")
const asyncHandler = require("express-async-handler")


router.post("/register", asyncHandler(async (req, res) => {
    const newUser = new User({
        email: req.body.email,
        username: req.body.username,
        password: req.body.password,
    })
    if (newUser) {
        const saveUser = await newUser.save()
        res.status(200).json(saveUser)
    } else {
        res.status(400);
        throw new Error("Could not register")
    }

}))

router.post("/login", asyncHandler(async (req, res) => {
    const { email, password } = req.body
    const user = await User.findOne({ email: email })

    const { id, username, isAdmin } = user

    const isMatch = await user.comparedPassword(password)
    if (isMatch) {
        const token = jwt.sign({
            id, username, isAdmin
        }, process.env.SECRET_KEY, { expiresIn: "3d" })
        return res.status(200).json({
            id, username, isAdmin, token
        })

    } else {
        res.status(400);
        throw new Error('Invalid Username/Password')
    }

}))

module.exports = router