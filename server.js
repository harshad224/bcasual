const express = require("express");
const app = express();
const errorHandler = require('./handler/error')
const mongoose = require("mongoose")
const dotenv = require("dotenv")
const cors = require("cors")
const userRoute = require("./routes/userRoute")
const cartRoute = require("./routes/cartRoute")
const orderRoute = require("./routes/orderRoute")
const authRoute = require("./routes/authRoute")
const stripe = require("./routes/stripe")
const productRoute = require("./routes/productRoute")
const path = require("path")
dotenv.config()

const DB = process.env.MONGO

mongoose
    .connect(DB,
        {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
    .then(() => console.log("Connection successful"))
    .catch(err => (console.log(err)))

app.use(cors())
app.use(express.json())
app.use('/api/auth', authRoute)
app.use('/api/user', userRoute)
app.use('/api/product', productRoute)
app.use('/api/cart', cartRoute)
app.use('/api/order', orderRoute)
app.use('/api/checkout', stripe)


__dirname1 = path.resolve()
if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname1, "/app/client/build")));
    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname1, "/app/client/build", "index.html"));
    })
} else {
    res.send("App is running")
}
app.use(function (req, res, next) {
    const err = new Error("Not found");
    error.status = 404
    next(err)
})
app.use(errorHandler)

app.listen(process.env.PORT || 8000, () => {
    console.log('PORT is online')
})