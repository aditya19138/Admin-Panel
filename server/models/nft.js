import mongoose from 'mongoose'
const Schema = mongoose.Schema

const NFTSchema = new Schema({
    no: {
        type: Number,
        required: false
    },
    title: {
        type: String,
        required: true
    },

    courseid: {
        type: Schema.Types.ObjectId,
        ref: 'Course'
    },

    image: { type: String },
    description: { type: String },
    ownerwallet: { type: String },

}, { timestamps: { uploadedAt: 'created_at' } });

const NFT = mongoose.model('NFT', NFTSchema)
export default NFT;