import mongoose from "mongoose";
import pino from "pino";
mongoose.connect("mongodb://127.0.0.1:27017/osc");

let logger = pino();
let db = mongoose.connection;

db.on("error", logger.error.bind(logger, "connection error"));

db.once("open", logger.info.bind(logger, "connection open"));
import Skill from './models/skill.js';

const addInitialSkills = async () => {
  const initialSkills = ['JavaScript', 'TypeScript', 'Python', 'C++', 'C#', 'Java', 'Rust', 'React', 'Angular', 'Vue.js', 'Node.js', 'Docker', 'Kubernetes', 'Git', 'Linux'];

  try {
    for (const skillName of initialSkills) {
      // Check if the skill already exists
      const existingSkill = await Skill.findOne({ name: skillName });

      if (!existingSkill) {
        // If the skill doesn't exist, create it
        await Skill.create({ name: skillName });
      }
    }
  } catch (error) {
    console.error('Error adding initial skills:', error);
  }
};

db.once("open", () => {
  logger.info.bind(logger, "connection open")();
  addInitialSkills();
});

export default db;
