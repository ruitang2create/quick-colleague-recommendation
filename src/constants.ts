import { Colleague, RecommendationSpecs } from "./components/types";

export enum ICON_SIZE {
  XXS = "0.25rem",
  XS = "0.5rem",
  SM = "1rem",
  MD = "1.5rem",
  LG = "2rem",
  XL = "3rem",
  XXL = "5rem",
}

export enum GENERATION_STEPS {
  NAME,
  GENDER,
  TITLE,
  RELATIONSHIP,
  HARD_SKILLS,
  SOFT_SKILLS,
  REVIEW,
}

export const GENERATION_QUESTIONS: string[] = [
  "What is your colleague's name?",
  "Is your colleague a he or a she?",
  "What is your colleague's job title?",
  "What is your relationship with your colleague?",
  "Select three technical skills this colleague has:",
  "Select three soft skills this colleague holds:",
  "Review all the keypoints",
];

export enum COLLEAGUE_RELATIONSHIP {
  PEER = "my peer teammember",
  SUPERVISOR = "my supervisor",
  STAFF_MEMBER = "a staff member I supervise",
  DIFFERENT_TEAM = "a coworker in a different team",
}

export enum GENDER {
  SHE = "She",
  HE = "He",
}

export const defaultColleague: Colleague = {
  name: "",
  gender: GENDER.SHE,
  relationship: COLLEAGUE_RELATIONSHIP.PEER,
  title: "",
  hardSkills: [],
  softSkills: [],
};

export const defaultRecommendationSpecs: RecommendationSpecs = {};
