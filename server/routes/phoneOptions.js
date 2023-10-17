import express from "express";
import OptionController from "../controllers/phoneOptions.js";

const router = express.Router();

router.get("/phoneOptions", OptionController.getPhoneOptions);

export default router;
