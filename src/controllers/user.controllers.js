import { asyncHandler } from "../utility/asyncHandler.js";
import { User } from "../models/user.models.js";
import { ApiError } from "../utility/ApiError.js";
import { ApiRes } from "../utility/ApiRes.js";
import bcrypt from "bcrypt";

const userRegister = asyncHandler( async (req, res) => {
 
 const { fullName, userName, email, password } = req.body;

 if(!fullName || !userName || !email || !password){
    throw new ApiError(400, "All fields are required")
 }

 const userExists = await User.findOne({
    $or: [
        {userName},
        {email}
    ]
 })

 if(userExists){
    throw new ApiError(400, "User already exists")
 }

 const userCreated = await User.create({
    userName,
    fullName,
    email,
    password: await bcrypt.hash(password, 10)
 })
 console.log("user created ",userCreated);
 console.log("body from-data ",req.body);
    return res.status(201).json(
        new ApiRes(201, "user created successfully", 
        {
            fullName, userName, email, password
        }
          ) 
   )
})

const loginUser = asyncHandler( async (req, res) => {
    const { userName, email, password } = req.body;
    if(!userName && !email){
        throw new ApiError(400, "userName or email any one required")
    }
   console.log("body from-data ",userName, email, password);
    const user = await User.findOne({
        $or: [
            {userName},
            {email}
        ]
    })
  console.log("userpassword",user)
    if(user.isPasswordMatch(password)){
        return res.status(201).json(
            new ApiRes(201, "Login successfully", user)
        )
    }else{
        throw new ApiError(400, "Invalid credentials")
    }
})

export {
    userRegister,
    loginUser,
}