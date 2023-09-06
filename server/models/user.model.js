const mongoose = require("mongoose");

const bcrypt = require("bcrypt");

const { isEmail } = require("validator")

const UserSchema = new mongoose.Schema(
    {
        username: String,
        email: {
            type: String,
            validate: [isEmail, "Please enter valid email"]
        },
        password: String
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