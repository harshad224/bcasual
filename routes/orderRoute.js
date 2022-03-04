const Order = require("../models/ordermodel");
const asyncHandler = require("express-async-handler")
const { verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin } = require("./verifyToken")
const router = require("express").Router();


router.post("/", verifyToken, asyncHandler(async (req, res) => {

    const newOrder = new Order(req.body);

    if (newOrder) {
        const savedOrder = await newOrder.save()
        res.status(200).json(savedOrder)
    } else {
        console.log("Sorry,Order not save")
        res.status(500);
        throw new Error('Sorry,Order not saved')
    }
}));

router.put("/put/:id", verifyTokenAndAdmin, asyncHandler(async (req, res) => {
    const { id } = req.params

    if (req.body) {
        const OrderUpdated = await Order.findByIdAndUpdate(id, { $set: req.body }, { new: true })
        if (OrderUpdated) {
            res.status(200).json(OrderUpdated)
        } else {
            throw new Error("Sorry,Order not updated")
        }
    } else {
        res.status(500);
        throw new Error('No Order found')
    }
}));

router.delete("/delete/:id", verifyTokenAndAuthorization, asyncHandler(async (req, res) => {

    const { id } = req.params
    const deleteOrder = await Order.findByIdAndDelete(id)

    if (deleteOrder) {
        res.status(200).json("Order deleted")
    } else {
        res.status(500);
        throw new Error('Sorry,cannot delete Order')
    }
}))

router.get("/get/:userid", verifyTokenAndAuthorization, asyncHandler(async (req, res) => {

    const { userid } = req.params
    const getOrder = await Order.find(userid)
    if (getOrder) {
        res.status(200).json(getOrder)
    } else {
        res.status(500);
        throw new Error('Sorry,cannot fetch the Order')
    }
}))

// router.get("/", verifyTokenAndAdmin, asyncHandler(async (req, res) => {
//     const Orders = await Order.find();

//     if (Orders) {
//         res.status(200).json(Orders)
//     } else {
//         res.status(500).json(err)
//     }


// })
// )

// router.get("/income", verifyTokenAndAdmin, asyncHandler(async (req, res) => {
//     const date = new Date();
//     const lastMonth = new Date(date.setMonth(date.getMonth() - 1))
//     const previousMonth = new Date(date.setMonth(lastMonth.getMonth() - 1))

//     const income = await Order.aggregate([
//         { $match: { createdAt: { $gte: previousMonth } } },
//         {
//             $project: {
//                 month: { $month: "$createdAt" },
//                 sales: "$amount",
//             },
//         },
//         {
//             $group: {
//                 _id: "$month",
//                 total: { $sum: "$sales" }
//             },
//         }

//     ])
//     res.status(200).json(income)
// })
// )

module.exports = router