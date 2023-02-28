import express from "express";
import {
  getProducts,
  getCustomers,
  getTransactions,
  getGeography,
  postLecture,
  getCourses,
  fetchCourse
} from "../controllers/client.js";

const router = express.Router();

router.get("/products", getProducts);
router.get("/customers", getCustomers);
router.post("/lecture/add", postLecture)
router.get("/courses", getCourses);
router.get("/course", fetchCourse);
router.get("/transactions", getTransactions);
router.get("/geography", getGeography);

export default router;
