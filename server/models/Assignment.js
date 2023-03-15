import mongoose from "mongoose";
const Schema = mongoose.Schema

const AssignmentSchema = new Schema({
    no: {
        type: Number,
        required: false
    },
    question: {
        type: String,
        required: true
    },
    //have two types of assignments, multiple choice and single line answer
    assignmenttype: {
        type: String,
        required: true
    },

    lectureId: { type: Schema.Types.ObjectId, ref: 'Lecture' },

    //store multiple choice questions in an array and store the correct answer
    //in the correctAnswer field
    multiplechoices: [{
        options: [{ type: String }],
        correctAnswer: String
    }],

}, { timestamps: { uploadedAt: 'created_at' } });

const Assignments = mongoose.model('assignments', AssignmentSchema)
export default Assignments