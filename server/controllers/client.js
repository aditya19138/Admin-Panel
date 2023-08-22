import Product from "../models/Product.js";
import ProductStat from "../models/ProductStat.js";
import User from "../models/User.js";
import Lecture from "../models/Lecture.js";
import Course from "../models/Course.js";
import Assignment from "../models/Assignment.js";
import Category from "../models/Category.js";
import validateRegisterInput from "../validation/register.js";
import bcrypt from "bcryptjs";

// get all normal courses
export const getLecCourses = async (req, res) => {
  Course
    .find({Course_type: {$ne : "Mini"}}).then((courses) => {
      res.status(200).json(courses)
    })
}

// get all nfts
export const getNFTs = async (req, res) => {
  NFT.find()
    .then((nfts) => {
      res.status(200).json(nfts)
    })
    .catch((err) => res.status(500).json({ message: err.message }))
}

// fetch normal lectures of a particular course
export const fetchLectures = async (req, res) => {
  const { id } = req.query;
  Course.find({ _id: id })
    .populate('lectures')
    .then((resp) => {
      let lectures = resp[0].lectures
      res.status(200).json(lectures)
    })
}

// fetch a single lecture
export const getLecture = async (req, res) => {
  const { id } = req.query;
  Lecture.find({ _id: id})
    .then((resp) => {
      res.status(200).json(resp)
    })
}

// post request to add a lecture
export const postLecture = async (req, res) => {
  const { no, title, content, courseId } = req.body;
  console.log(req.body)
  const newLecture = new Lecture({
    no,
    title,
    content,
    course: courseId
  });
  newLecture.save()
    .then((lecture) => {
      console.log(lecture)
      Course.findOneAndUpdate({ _id: courseId }, { $push: { lectures: newLecture._id } })
        .then((course) => res.status(200).json({ message: "lecture added successfully" })
        )
    })
    .catch((err) => res.status(500).json({ message: err.message }))
}

// patch request to update a lecture
export const updateLecture = async (req, res) => {
  const { title, content, lectureId } = req.body;
  Lecture.findOneAndUpdate({ _id: lectureId }, { title, content })
    .then((lecture) => console.log(lecture))
  res.status(200).json({ message: "lecture updated successfully" })


}
// post request to delete a lecture
export const deleteLecture = async (req, res) => {
  const { lectureId, courseId } = req.body;
  console.log(lectureId, courseId)
  Lecture.deleteOne({ _id: lectureId })
    .then((lecture) => console.log(lecture))
  Course.findOneAndUpdate({ _id: courseId }, { $pull: { lectures: lectureId } })
    .then((course) => console.log(course))
  res.status(200).json({ message: "lecture deleted successfully" })
}

// get request to get all the registers users
export const getUsers = async (req, res) => {
  User.find().then((users) => {
    res.status(200).json(users)
  })
}
// post request to add a user
export const addUser = async (req, res) => {
  const { errors, isValid } = validateRegisterInput(req.body);

  // Check Validation
  if (!isValid) {
    return res.status(200).json({ message: "Invalid Email ID / password" });
  }

  const { first_name, last_name, email, password, role } = req.body;
  User.findOne({ email: req.body.email }).then(user => {
    if (user) {
      return res.status(200).json({ message: "Email already exists" });
    } else {
      const newUser = new User({
        first_name,
        last_name,
        email,
        password,
        role
      });

      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser
            .save()
            .then((user) => res.status(200).json({ message: "user added successfully" }))
            .catch(err => console.log(err));
        });
      });
    }
  });
}

// post request to delete a user
export const deleteUser = async (req, res) => {
  const { userId } = req.body;
  console.log(userId)
  User.deleteOne({ _id: userId })
    .then((user) => res.status(200).json({ message: "user deleted successfully" }))
    .catch((err) => res.status(500).json({ message: err.message }))
}

// get request to get all the assignments
export const getAssignments = async (req, res) => {
  Assignment.find().then((assignments) => {
    res.status(200).json(assignments)
  })
}
// post request to add a new assignment
export const addAssignment = async (req, res) => {
  const { lectureId, question, options, correctAns, type } = req.body;
  console.log(options)
  const mcq = {
    options: options,
    correctAnswer: correctAns
  }
  const newAsgn = new Assignment({
    question: question,
    lectureId: lectureId,
    multiplechoices: [mcq],
    assignmenttype: type

  });
  newAsgn.save()
    .then((asgn) => res.send(asgn))
}

// post request to delete an assignment
export const deleteAsgn = async (req, res) => {
  const { asgnId, lectureId } = req.body;
  console.log(asgnId, lectureId)
  Assignment.findByIdAndDelete(asgnId)
    .then((asgn) => console.log(asgn))
    .catch((err) => res.status(500).json({ message: err.message }))
  // Assignment.deleteOne({ _id: asgnId })
  //   .then((asgn) => console.log(asgn))
  //   .catch((err) => res.status(500).json({ message: err.message }))
  // Lecture.findOneAndUpdate({ _id: lectureId }, { $pull: { assignments: asgnId } })
  //   .then((lecture) => console.log(lecture))
  //   .catch((err) => res.status(500).json({ message: err.message }))
  res.status(200).json({ message: "assignment deleted successfully " })
}

// view enrollments in a course
export const viewEnrollments = async (req, res) => {
  const { id } = req.query;
  console.log(id);
  Course.findOne({ _id: id })
    .populate('enrolledStudents')
    .then((course) => {
      // console.log(course.enrolledStudents);
      res.json(course.enrolledStudents);
    })
    .catch((err) => res.status(500).json({ message: err.message }))

}
// get request to get all categories
export const getCategories = async (req, res) => {
  Category.find().then((categories) => {
    res.status(200).json(categories)
  })
}

// get request to get all the instructors
export const getInstructors = async (req, res) => {
  User.find({ role: "instructor" })
    .then((instructors) => {
      res.status(200).json(instructors)
    })
    .catch((err) => res.status(500).json({ message: err.message }))
}

// post request to unenroll a student
export const unenrollStudent = async (req, res) => {
  const courseId = req.query.id;
  const { userId } = req.body;
  console.log(courseId, userId)
  Course.findOne({ _id: courseId })
    .then((course) => {
      course.enrolledStudents.pull(userId);
      course.save()
        .then((course) => res.status(200).json({ message: "student unenrolled successfully" }))
    })
    .catch((err) => res.status(500).json({ message: err.message }))
}

// post request to add a course
export const addCourse = async (req, res) => {
  const { courseName, courseDescription, instructor, category, courseImage, Course_type } = req.body;
  const newCourse = new Course({
    courseName,
    courseDescription,
    instructor,
    category,
    courseImage,
    Course_type
  });
  newCourse.save()
    .then((course) => res.status(200).json({ message: "course added successfully" }))
    .catch((err) => res.status(500).json({ message: err.message }))
}


export const getMintedNfts = async (req, res) => {
  MintedNft.find().populate('nftId')
    .then((mintednfts) => {
      res.status(200).json(mintednfts)
    })
    .catch((err) => res.status(500).json({ message: err.message }))
}

//mini
// get all mini courses
export const getMiniCourses = async (req, res) => {
  Course
    .find({Course_type: "Mini"}).then((courses) => {
      res.status(200).json(courses)
    })
}


