import express from "express"
const router = express.Router()
import { postOffer,getOffers,updateOffer } from "../controller/offer.controller.js"
import { protectRoute } from "../middleware/auth.middleware.js"

router.post("/post/:id",protectRoute,postOffer);
router.get("/allOffers/:id",protectRoute,getOffers);
router.post("/update/:taskId/:offerId",protectRoute,updateOffer);

export default router