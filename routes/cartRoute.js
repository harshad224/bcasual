const Cart = require("../models/cartmodel");
const asyncHandler = require("express-async-handler")
const { verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin } = require("./verifyToken")
const router = require("express").Router();


router.post("/", verifyToken, asyncHandler(async (req, res) => {

    const newCart = new Cart(req.body);

    if (newCart) {
        const savedCart = await newCart.save()
        res.status(200).json(savedCart)
    } else {
        console.log("Sorry,Cart not save")
        res.status(500);
        throw new Error('Sorry,Cart not saved')
    }
}));

router.put("/put/:id", verifyTokenAndAuthorization, asyncHandler(async (req, res) => {
    const { id } = req.params

    if (req.body) {
        const CartUpdated = await Cart.findByIdAndUpdate(id, { $set: req.body }, { new: true })
        if (CartUpdated) {
            res.status(200).json(CartUpdated)
        } else {
            throw new Error("Sorry,Cart not updated")
        }
    } else {
        res.status(500);
        throw new Error('No Cart found')
    }
}));

router.delete("/delete/:id", verifyTokenAndAuthorization, asyncHandler(async (req, res) => {

    const { id } = req.params
    const deleteCart = await Cart.findByIdAndDelete(id)

    if (deleteCart) {
        res.status(200).json("Cart deleted")
    } else {
        res.status(500);
        throw new Error('Sorry,cannot delete Cart')
    }
}))

router.get("/get/:userid", verifyTokenAndAuthorization, asyncHandler(async (req, res) => {

    const { userid } = req.params
    const getCart = await Cart.findOne(userid)

    if (getCart) {
        res.status(200).json(getCart)
    } else {
        res.status(500);
        throw new Error('Sorry,cannot fetch the Cart')
    }
}))

// router.get("/", verifyTokenAndAdmin, asyncHandler(async (req, res) => {
//     const carts = await Cart.find();

//     if (carts) {
//         res.status(200).json(carts)
//     } else {
//         res.status(500).json(err)
//     }


// })
// )


module.exports = router