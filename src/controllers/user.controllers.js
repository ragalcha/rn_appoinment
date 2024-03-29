import { asyncHandler } from "../utility/asyncHandler.js";
import { User } from "../models/user.models.js";
import { ApiError } from "../utility/ApiError.js";
import { ApiRes } from "../utility/ApiRes.js";
import bcrypt from "bcrypt";

const userRegister = asyncHandler( async (req, res) => {
 
 const { fullName, userName, email, password } = req.body;

 if(!fullName || !userName || !email || !password){
    return res.status(401).json(
        new ApiError(401, "All field required")
    )
 }

 const userExists = await User.findOne({
    $or: [
        {userName},
        {email}
    ]
 })

 if(userExists){
    return res.status(401).json(
        new ApiError(400, "User alredy exists")
    )
 }

 const userCreated = await User.create({
    userName,
    fullName,
    email,
    password: await bcrypt.hash(password, 10)
 })

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
        // console.log("hello i am rmaiya");
        return res.status(401).json(
            new ApiError(401, "userName or email any one required")
        )
    }

    if(!password){
        return res.status(401).json(
            new ApiError(402, "Password is required")
        )
    }
//    console.log("body from-data ",userName, email, password);
    const user = await User.findOne({
        $or: [
            {userName},
            {email}
        ]
    })
    // console.log("userpassword",user)
    if(await user.isPasswordMatch(password)){
        return res.status(201).json(
            new ApiRes(201, "Login successfully", user)
        )
    }else{
        return res.status(401).json(
            new ApiRes(401, "Invalid credentials")
        )
    }
})

export {
    userRegister,
    loginUser,
}