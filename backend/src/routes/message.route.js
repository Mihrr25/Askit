import express from "express"
const router = express.Router()
import { getChats,getMessages,sendMessage,updateMessages,getAlerts } from "../controller/messages.controller.js"
import { protectRoute } from "../middleware/auth.middleware.js"

router.post("/sendMessage/:id",protectRoute,sendMessage)
router.get("/getMessages/:friendId",protectRoute,getMessages)
router.get("/getChats",protectRoute,getChats)
router.get("/update/:friendId",protectRoute,updateMessages)
router.get("/getAlerts",protectRoute,getAlerts)

export default router