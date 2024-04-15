const mongoose = require('mongoose');
const bcrypt = require('bcrypt')

const userSchema = new mongoose.Schema(
    {
        email : {
            type : String,
            require : true
        },
        password : {
            type : String,
            require : true
        },
        role : {
            type: String,
            require : true,
            default : "utilisateur"
        }
    },
    {
        timestamps : true
    }
)

userSchema.pre("save", async function(){
    if (this.isModified("password")) {
        this.password = await bcrypt.hash(this.password, 10)
    }
})

const User = mongoose.model("User", userSchema)

module.exports = User