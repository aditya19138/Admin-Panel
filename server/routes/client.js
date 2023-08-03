import express from "express";
import {
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
  addAssignment,
  viewEnrollments,
  getCategories,
  getInstructors,
  unenrollStudent,
  addCourse,
  addUser,
  getNFTs,
  getMintedNfts,
  deleteMini,
  fetchMini,
  postMini,
  getMini,
  updateMini
} from "../controllers/client.js";

const router = express.Router();

router.post("/lecture/add", postLecture)
router.patch("/lecture/update", updateLecture)
router.get("/lectures", fetchLectures);
router.get("/lecture", getLecture);
router.post("/lecture/delete", deleteLecture);
router.get("/courses", getCourses);
router.get("/enrollments", viewEnrollments);
router.post("/unenroll", unenrollStudent)
router.get("/categories", getCategories);
router.get("/instructors", getInstructors);
router.post("/courses/add", addCourse)
router.get("/users", getUsers);
router.post("/users/add", addUser);
router.post("/user/delete", deleteUser);
router.get("/assignments", getAssignments);
router.post("/assignments/add", addAssignment);
router.post("/assignment/delete", deleteAsgn)
router.get("/nfts", getNFTs);
router.get("/mintednfts", getMintedNfts);


router.post("/mini/add", postMini)
router.get("/minis", fetchMini);
router.post("/mini/delete", deleteMini);
router.get("/mini", getMini);
router.patch("/mini/update", updateMini)


export default router;
