import mongoose from "mongoose";
const Schema = mongoose.Schema;

const CourseSchema = new Schema(
    {
      courseName: {
        type: String,
        required: true
      },
      courseDescription: {
        type: String,
        required: true
      },
      courseImage: {
        type: String,
        required: true
      },
      category: {
        type: Schema.Types.ObjectId,
        ref: "Category"
  
      },
      instructor: { type: Schema.Types.ObjectId, ref: "User" },
      //category: { type: Schema.Types.ObjectId, ref: "Category" },
      lectures: [{
        type: Schema.Types.ObjectId,
        ref: "Lecture"
      }],
      enrolledStudents: [{
        type: Schema.Types.ObjectId,
        ref: "User"
      }],
      completedLectures: {
        type: Number,
        default: 0
      },
  
      assignments: [{
        type: Schema.Types.ObjectId,
        ref: "Assignment"
      }],
  
      live: {
        type: Boolean,
      },
  
      NFTid: {
        type: Schema.Types.ObjectId,
        ref: "NFTs"
      },
  
      duration: {
        type: Number,
      },
  
      Course_type: {
        type: String, enum: ["Live", "Normal", "Mini"]
      },
  
      tags: {
        type: String,
      },
  
      Pre_requisites: {
        type: String,
  
      },
      Why_enroll: {
        type: String,
      },
  
      what_will_you_learn: {
        type: String,
      },
  
      skill_level: {
        type: String, enum: ["Beginner", "Intermidiate", "Expert"]
      },
    },
    { timestamps: { createdAt: "created_at" } }
  );
  
  
const Course = mongoose.model("courses", CourseSchema);
export default Course;

