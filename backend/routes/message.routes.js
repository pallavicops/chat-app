import  express  from "express";
import  {sendMessage,getMessages} from "../controller/message.controller.js";
import protectRoute from "../middlerware/protectRoute.js"

const router =express.Router();
router.get("/:id",protectRoute,getMessages);
router.post("/send/:id",protectRoute,sendMessage);
export default router;
