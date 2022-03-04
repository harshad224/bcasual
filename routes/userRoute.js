const User = require("../models/usermodel");
const asyncHandler = require("express-async-handler")
const { verifyTokenAndAuthorization, verifyTokenAndAdmin } = require("./verifyToken")
const router = require("express").Router();
const bcrypt = require("bcrypt");


router.put("/put/:id", verifyTokenAndAuthorization, asyncHandler(async (req, res) => {
    const { id } = req.params

    const { username, password } = req.body

    const newPassword = await bcrypt.hash(password, 10);

    if (newPassword) {
        const userUpdate = await User.findByIdAndUpdate(id, { $set: { username: username, password: newPassword, } }, { new: true })
        if (userUpdate) {
            console.log(`Successfully updated,${userUpdate}`)
            res.status(200).json(userUpdate)
        } else {
            console.log("Sorry,not updated")
        }
    } else {
        res.status(500);
        throw new Error('Sorry,cannot updated')
    }
}));

router.delete("/delete/:id", verifyTokenAndAuthorization, asyncHandler(async (req, res) => {

    const { id } = req.params
    const deleteUser = await User.findByIdAndDelete(id)

    if (deleteUser) {
        res.status(200).json("User deleted")
    } else {
        res.status(500);
        throw new Error('Sorry,cannot delete')
    }
}))

router.get("/get/:id", verifyTokenAndAuthorization, asyncHandler(async (req, res) => {

    const { id } = req.params
    const getUser = await User.findById(id)
    const { password, ...others } = getUser

    if (getUser) {
        res.status(200).json(others)
    } else {
        res.status(500);
        throw new Error('Sorry,cannot fetch all users')
    }
}))

// router.get("/", verifyTokenAndAdmin, asyncHandler(async (req, res) => {
//     const query = req.query.new
//     const getUser = query ? await User.find().sort({ _id: -1 }).limit(1) : await User.find()
//     if (getUser) {
//         res.status(200).json(getUser)
//     } else {
//         res.status(500);
//         throw new Error('Sorry,cannot fetch all users')
//     }
// }))

// router.get("/stats", verifyTokenAndAdmin, async (req, res) => {
//     const data = new Date();
//     const lastYear = new Date(date.setFullYear(date.getFullYear() - 1))

//     try {
//         const data = await User.aggregate
//     } catch (err) {
//         res.status(500).json(err)
//     }
// })

module.exports = router