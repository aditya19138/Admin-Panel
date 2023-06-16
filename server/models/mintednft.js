import mongoose from 'mongoose'
const Schema = mongoose.Schema

const MintedNFTSchema = new Schema({
    no: {
        type: Number,
        required: false
    },
    nftid: {
        type: Schema.Types.ObjectId,
        ref: 'NFT'
    },

    walletminted: { type: String },
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    course: { type: Schema.Types.ObjectId, ref: 'Course' },

}, { timestamps: { uploadedAt: 'created_at' } });

const MintedNFT = mongoose.model('MintedNFT', MintedNFTSchema)
export default MintedNFT;