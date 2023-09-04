import mongoose from "mongoose"
const Schema = mongoose.Schema

const CategorySchema = new Schema({
    no: {
        type: Number,
        required: true
    },
    categoryName: {
        type: String,
        required: true
    }
}, { timestamps: { createdAt: 'created_at' } });

const Category = mongoose.model("category", CategorySchema);
export default Category;