import { asyncHandler } from "../utility/asyncHandler.js";
import { User } from "../models/user.models.js";
import { ApiError } from "../utility/ApiError.js";
import { ApiRes } from "../utility/ApiRes.js";

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
    password
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

export {userRegister}