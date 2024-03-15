import  express  from "express";
import { getUserFromSidebar } from "../controller/user.controller.js";
import protectRoute from "../middlerware/protectRoute.js"

const router =express.Router();
router.get("/",protectRoute, getUserFromSidebar);
export default router;