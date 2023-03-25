import mongoose from "mongoose";
const Schema = mongoose.Schema

const courseCompletedSchema = new Schema({
  courseId: {
    type: Schema.Types.ObjectId,
    ref: "Course",
    required: true
  },
  completedLectures: [{
    type: Schema.Types.ObjectId,
    ref: "Lecture",
  }]
})

const UserSchema = new Schema({
  first_name: {
    type: String,
    lowercase: true,
  },
  last_name: {
    type: String,
    lowercase: true,
  },
  email: {
    type: String,
    lowercase: true,
    trim: true,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  wallet_address: [{
    type: String
  }],
  role: {
    type: String,
    required: true
  },
  courses: [{
    type: courseCompletedSchema
  }]

}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } }); //automatically add while insert or update the object

const User = mongoose.model('user', UserSchema)
export default User