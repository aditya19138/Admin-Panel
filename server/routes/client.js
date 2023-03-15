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
  updateLecture,
  getUsers,
  deleteLecture,
  deleteUser,
  getAssignments,
  deleteAsgn,
} from "../controllers/client.js";

const router = express.Router();

router.get("/products", getProducts);
router.get("/customers", getCustomers);
router.post("/lecture/add", postLecture)
router.patch("/lecture/update", updateLecture)
router.get("/lectures", fetchLectures);
router.get("/lecture", getLecture);
router.post("/lecture/delete", deleteLecture);
router.get("/courses", getCourses);
router.get("/users", getUsers)
router.post("/user/delete", deleteUser)
router.get("/assignments", getAssignments);
// router.post("/assignment/delete", deleteAsgn)
router.get("/transactions", getTransactions);
router.get("/geography", getGeography);

export default router;
