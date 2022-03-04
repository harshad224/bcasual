const Product = require("../models/productmodel");
const asyncHandler = require("express-async-handler")
const { verifyTokenAndAuthorization, verifyTokenAndAdmin } = require("./verifyToken")
const router = require("express").Router();


router.post("/", verifyTokenAndAdmin, asyncHandler(async (req, res) => {

    const newProduct = new Product(req.body);

    if (newProduct) {
        const savedProduct = await newProduct.save()
        res.status(200).json(savedProduct)
    } else {
        console.log("Sorry,product not save")
        res.status(500);
        throw new Error('Sorry,product not saved')
    }
}));

router.put("/put/:id", verifyTokenAndAdmin, asyncHandler(async (req, res) => {
    const { id } = req.params

    if (req.body) {
        const productUpdated = await Product.findByIdAndUpdate(id, { $set: req.body }, { new: true })
        if (productUpdated) {
            res.status(200).json(productUpdated)
        } else {
            throw new Error("Sorry,product not updated")
        }
    } else {
        res.status(500);
        throw new Error('No product found')
    }
}));

router.delete("/delete/:id", verifyTokenAndAdmin, asyncHandler(async (req, res) => {

    const { id } = req.params
    const deleteproduct = await Product.findByIdAndDelete(id)

    if (deleteproduct) {
        res.status(200).json("Product deleted")
    } else {
        res.status(500);
        throw new Error('Sorry,cannot delete product')
    }
}))

router.get("/get/:id", asyncHandler(async (req, res) => {

    const { id } = req.params
    const getProduct = await Product.findById(id)
    const { ...others } = getProduct

    if (getProduct) {
        res.status(200).json(others)
    } else {
        res.status(500);
        throw new Error('Sorry,cannot fetch the product')
    }
}))

router.get("/", asyncHandler(async (req, res) => {
    const newquery = req.query.new
    const catquery = req.query.category

    let products;
    if (newquery) {
        products = await Product.find().sort({ createdAt: -1 }).limit(1)
    } else if (catquery) {
        products = await Product.find({ categories: { $in: [catquery] } })
    } else {
        products = await Product.find()
    }
    res.status(200).json(products)
}))


module.exports = router