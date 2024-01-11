import dotenv from "dotenv";
import app from "./app.js";

app.listen(process.env.PORT|| 5352, ()=>{
    console.log(`server is running on port ${process.env.PORT}`);
})

app.get("/", (req, res)=>{
    res.send("Hello World!");
})