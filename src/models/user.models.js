import mongoose, {Schema} from "mongoose";
import bcrypt from "bcrypt";

const userSchema  = new Schema({
    userName: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        index: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    fullName: {
        type: String,
        required: true,
        index: true,
        trim: true
    },
    profilePic: {
        type: String,
        trim: true
    },
    password: {
        type: String,
        required: [true, "password is required"],
    },
    role: {
        type: Number,
        default: 0
    },
    refreshToken: {
        type: String,
    },
    accessToken: {
        type: String
    }
},{
    timestamps: true
})

userSchema.methods.isPasswordMatch = async function(password){
    return await bcrypt.compare(password, this.password);
}

export  const User = mongoose.model("User", userSchema)