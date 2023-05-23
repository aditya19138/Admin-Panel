import express from "express";
import { getAdmins, login } from "../controllers/admin.js";

const router = express.Router();

router.get("/getAdmins", getAdmins);
router.post("/login", login);

export default router;
