import mongoose from 'mongoose';

const chatSchema = new mongoose.Schema({
  message: { type: String, required: true },
  sender: { type: String, required: true }, // 'user' or 'bot'
  timestamp: { type: Date, default: Date.now }
});

const userSchema = new mongoose.Schema({
  nombre: { type: String, required: true},
  email:{type: String, required:true, unique:true},
  password: { type: String, required: true },
  chatHistory: [chatSchema]
});

const User = mongoose.model('User', userSchema);
export default User;
