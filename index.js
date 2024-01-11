import dotenv from "dotenv";
import app from "./src/app.js";
import dbConection from "./src/db/database.js";
dotenv.config({path: "./env"});

dbConection().then((ress)=>{
    app.listen(process.env.PORT|| 5352, ()=>{
    console.log(`server is running on port ${process.env.PORT}`);
    app.get("/", (req, res)=>{
    res.render("index.ejs");
})
})
}).catch((error)=>console.log("Error: ", error));


