import express from "express";
import PhoneController from "../controllers/phones.js";

const router = express.Router();

router.get("/phones/", PhoneController.getPhones);
router.get("/phones/:id", PhoneController.getPhone);

router.post("/phones/", PhoneController.createPhone);

router.patch("/phones/:id", PhoneController.updatePhone);
router.delete("/phones/:id", PhoneController.deletePhone);

export default router;
