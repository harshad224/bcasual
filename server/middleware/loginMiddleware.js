const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt")

exports.loginRequired = function (req, res, next) {
    try {
        const token = req.headers.token.split(" ")[1];
        jwt.verify(token, process.env.SECRET_KEY, function (err, decoded) {
            if (decoded) {
                return next()
            } else {
                return next({
                    status: 401,
                    message: "Please login"
                })
            }
        })
    } catch (err) {
        return next({ status: 401, message: "Please ogin first" })
    }
}


exports.ensureCorrectUser = function (req, res, next) {
    try {
        const token = req.headers.token.split(" ")[1];
        jwt.verify(token, "SDM3MER449J34OFO4J9R490J394JF9430JR4J3O3JROR3O", function (err, decoded) {
            if (decoded && decoded.id === params.id) {
                return next()
            } else {
                return next({
                    status: 401,
                    message: "Unauthorized123"
                })
            }
        })
    } catch (e) {
        return next({
            status: 401,
            message: "Unauthorized"
        })
    }
}