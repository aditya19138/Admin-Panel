import mongoose from "mongoose";
const Schema = mongoose.Schema

const LectureSchema = new Schema({
    no: {
        type: Number,
        required: false
    },
    title: {
        type: String,
        required: true
    },
    course: { type: Schema.Types.ObjectId, ref: 'courses', required: true },
    content: String,
    assignments: [{
        type: Schema.Types.ObjectId,
        ref: "Assignment"
    }],
}, { timestamps: { uploadedAt: 'created_at' } });

const Lecture = mongoose.model('lectures', LectureSchema);
export default Lecture;
