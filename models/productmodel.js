const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
    {
        title: { type: String, required: true, unique: true },
        description: { type: String, required: true },
        image: { type: String, required: true },
        categories: { type: String },
        color: { type: Array },
        size: { type: Array },
        material: { type: Array },
        price: { type: Number, required: true },
    },
    { timestamps: true },
)

productSchema.pre("remove", async (next) => {
    try {
        const removeProduct = await Product.findByIdAndDelete(this._id)
        removeProduct.remove(this.id);
        await removeProduct.save();
        return next()
    } catch (e) {
        return next(e)
    }
})

const Product = mongoose.model("Product", productSchema)

module.exports = Product