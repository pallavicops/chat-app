import  express  from "express";
import dotenv from 'dotenv';
import authRoutes from "./routes/auth.routes.js";
import messageRoutes from "./routes/message.routes.js";
import userRoutes from  "./routes/user.routes.js";
import connectToMongoDb from "./db/connectToMongoDB.js";
import cookieParser from "cookie-parser";

const PORT = process.env.PORT || 5000;
const app = express();

dotenv.config();


// app.get("/", (req, res)=>{
//     res.send("hello pallavi");
// });

app.use(express.json());
app.use(cookieParser()); //to parse the incomming request with JSON payloads (from req.body)


app.use("/api/auth", authRoutes)
app.use("/api/messages", messageRoutes)
app.use("/api/users", userRoutes)

app.listen(PORT, ()=>
{
    connectToMongoDb();
    console.log(`server is Running on the  port ${PORT}`);
}
);