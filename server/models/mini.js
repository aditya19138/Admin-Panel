import mongoose from "mongoose";
const Schema = mongoose.Schema

const MiniSchema = new Schema({
    no: {
        type: Number,
        required: false
    },
    title: {
        type: String,
        required: true
    },
    course: { type: Schema.Types.ObjectId, ref: 'courses', required: true },
    content: [{
        subHeading: String,
        paragraphs: [{ type: String }],
    }
    ],
    assignments: [{
        type: Schema.Types.ObjectId,
        ref: "Assignment"
    }],
}, { timestamps: { uploadedAt: 'created_at' } });

const Mini = mongoose.model('Mini', MiniSchema);
export default Mini;
