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
        mini: [{
            type: Schema.Types.ObjectId,
            ref: "Mini"
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
        }


    },
    { timestamps: { createdAt: "created_at" } }
);

const Course = mongoose.model("Course", CourseSchema);
export default Course;
