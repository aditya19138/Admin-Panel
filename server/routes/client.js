import express from "express";
import {
  getProducts,
  getCustomers,
  getTransactions,
  getGeography,
  postLecture
} from "../controllers/client.js";

const router = express.Router();

router.get("/products", getProducts);
router.get("/customers", getCustomers);
router.post("/lecture/add", postLecture)
router.get("/transactions", getTransactions);
router.get("/geography", getGeography);

export default router;
