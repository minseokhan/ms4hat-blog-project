import mongoose, { Schema } from 'mongoose';

const tagSchema = new Schema({
  tag: {
    name: String,
    num: {
      type: Number,
      default: 1,
    },
  },
});

const Tag = mongoose.model('Tag', tagSchema);

export default Tag;
