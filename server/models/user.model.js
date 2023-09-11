const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const { isEmail } = require("validator");

const UserSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: [true, "username is required"],
            minLength: [3, "username should be at least 3 characters"]
        },
        email: {
            type: String,
            required: [true, "email is required"],
            validate: [isEmail, "Please enter valid email"]
        },
        password: {
            type: String,
            required: [true, "password is required"],
            minLength: [8, "password should be at least 8 characters"]
        },
        favorites: [{type: mongoose.ObjectId, ref: "Game"}]
    }, {timestamps: true}
)

UserSchema.virtual("confirmPassword")
    .set((value) => this.confirmPassword = value)
    .get(() => this.confirmPassword);

UserSchema.pre("validate", function(next) {
    if (this.password !== this.confirmPassword){
        this.invalidate("confirmPassword", "Passwords should match");
    }
    next();
})

UserSchema.pre("save", function(next) {
    bcrypt.hash(this.password, 10)
        .then(hash => {
            this.password = hash;
            next();
        })
})

const User = mongoose.model("User", UserSchema)
module.exports = User;