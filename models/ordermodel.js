const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
    {
        userId: { type: String, required: true, unique: true },
        products: [{
            productId: {
                type: String,
            },
            quantity: {
                type: Number,
                default: 1
            },
        }],
        amount: { type: Number, required: true },
        address: [{
            Atpost: {
                type: String,
            },
            City: {
                type: String,
            },
            Pincode: {
                type: Number,
            },
        }],
        status: { type: String, default: "pending" }
    },
    { timestamps: true },
)

const Order = mongoose.model("Order", orderSchema)

module.exports = Order