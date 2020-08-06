import mongoose, { Schema } from 'mongoose';

const fileSchema = new Schema({
  originalname: String,
  filename: String,
});

const File = mongoose.model('File', fileSchema);

export default File;
