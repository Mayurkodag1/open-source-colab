import mongoose from 'mongoose';

const skillSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
});

const Skill = mongoose.model('Skill', skillSchema);

export default Skill;