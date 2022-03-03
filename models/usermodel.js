const mongoose = require("mongoose");
const bcrypt = require("bcrypt")

const userSchema = new mongoose.Schema(
    {
        email: { type: String, required: true, unique: true },
        username: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        isAdmin: {
            type: Boolean,
            default: false,
        },
    },
    { timestamps: true },
)

userSchema.pre('save', async function (next) {
    try {
        if (!this.isModified("password") && !this.isModified("confirm")) {
            return next()
        }
        let hashedpassword = await bcrypt.hash(this.password, 10);
        this.password = hashedpassword;
        return next()
    } catch (err) {
        return next(err)
    }
})

userSchema.pre("remove", async (next) => {
    try {
        const user = await User.findByIdAndDelete(this._id)
        user.remove(this.id);
        await user.save();
        return next()
    } catch (e) {
        return next(e)
    }
})

userSchema.methods.comparedPassword = async function (candidatePassword, next) {
    try {
        const isMatch = await bcrypt.compare(candidatePassword, this.password)
        return isMatch;
    } catch (err) {
        return next(err)
    }
}

const User = mongoose.model("User", userSchema)

module.exports = User