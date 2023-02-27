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
        instructor: { type: Schema.Types.ObjectId, ref: "User" },
        category: { type: Schema.Types.ObjectId, ref: "Category" },
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


    },
    { timestamps: { createdAt: "created_at" } }
);

const Course = mongoose.model("courses", CourseSchema);
export default Course;
