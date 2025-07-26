import express from "express"
const router = express.Router()
import { postTask,getAllTask,temp,getTaskById,completeTask,getMyTask,deleteTask } from "../controller/task.controller.js"
import { protectRoute } from "../middleware/auth.middleware.js"

router.post("/post",protectRoute,postTask)
router.get("/allTasks",protectRoute,getAllTask)
router.get("/temp",temp)
router.post("/deleteTask/:id",protectRoute,deleteTask)
router.get("/particularTask/:id",protectRoute,getTaskById)
router.post("/completeTask/:id",protectRoute,completeTask)
router.get("/myTasks",protectRoute,getMyTask)

export default router