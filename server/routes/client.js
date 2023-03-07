import express from "express";
import {
  getProducts,
  getCustomers,
  getTransactions,
  getGeography,
  postLecture,
  getCourses,
  fetchLectures,
  getLecture,
  updateLecture
} from "../controllers/client.js";

const router = express.Router();

router.get("/products", getProducts);
router.get("/customers", getCustomers);
router.post("/lecture/add", postLecture)
router.patch("/lecture/update", updateLecture)
router.get("/courses", getCourses);
router.get("/lectures", fetchLectures);
router.get("/lecture", getLecture);
router.get("/transactions", getTransactions);
router.get("/geography", getGeography);

export default router;
