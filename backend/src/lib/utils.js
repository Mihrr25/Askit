import jwt from "jsonwebtoken"
import Task from "../models/tasks.model.js"
import Alerts from "../models/alerts.model.js"
import { io, userSocketMap } from "./socket.js"


export const generateToken = (userId, res) => {
    const token = jwt.sign({ userId }, process.env.MY_JWT_SECRET, {
        expiresIn: "7d"
    })
    res.cookie("jwt", token, {
        maxAge: 7 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        sameSite: "none", // <-- must be 'none' for cross-site cookies
        secure: true      // <-- required for 'sameSite: none'
    });
    return token
}

export const sameUser = async (taskId, userId) => {
    const task = await Task.findOne({ givenId: taskId })
    if (!task) {
        return 0;
    }
    if (task.TaskPosterId === userId) {
        console.log(task.TaskPosterId, userId)
        return 1;
    }
    return 2;
}

export const saveAlert = async (alert, userId, taskId) => {
    let userAlert = await Alerts.findOne({ user: userId })
    if (!userAlert) {
        userAlert = new Alerts({
            user: userId,
            alerts: [
                {
                    alertType: alert.alertType,
                    alertDesc: alert.alertDesc,
                    taskId: taskId,
                    alertTime: new Date(),
                }
            ]
        })
    }
    else {
        userAlert.alerts.push({
            alertType: alert.alertType,
            alertDesc: alert.alertDesc,
            taskId: taskId,
            alertTime: new Date(),
        })
    }
    await userAlert.save()
    io.to(userSocketMap[userId]).emit("newAlert", {
        alertType: alert.alertType,
        alertDesc: alert.alertDesc,
        taskId: taskId,
        alertTime: new Date(),
    })
    return userAlert;
}