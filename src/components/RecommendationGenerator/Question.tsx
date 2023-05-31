import React, { use, useEffect } from "react";
import { QuestionProps } from "../types";
import { COLLEAGUE_RELATIONSHIP, GENDER, GENERATION_STEPS } from "@/constants";
import MultipleChoices from "./MultipleChoices";

export default function Question({
  step,
  question,
  onAnswer,
}: QuestionProps): JSX.Element {
  const [answerInput, setAnswerInput] = React.useState<string>("");

  useEffect(() => {
    setAnswerInput("");
  }, [step]);

  const isMultipleChoiceQuestion =
    step === GENERATION_STEPS.RELATIONSHIP ||
    step === GENERATION_STEPS.GENDER ||
    step === GENERATION_STEPS.HARD_SKILLS ||
    step === GENERATION_STEPS.SOFT_SKILLS;

  const renderQuestionChoices = (): JSX.Element => {
    let choices: string[] = [];
    if (step === GENERATION_STEPS.GENDER) {
      choices = Object.values(GENDER);
    } else if (step === GENERATION_STEPS.RELATIONSHIP) {
      choices = Object.values(COLLEAGUE_RELATIONSHIP);
    } else if (step === GENERATION_STEPS.HARD_SKILLS) {
      choices = [
        "Java",
        "Python",
        "C++",
        "C#",
        "JavaScript",
        "TypeScript",
        "React",
        "Angular",
        "Vue",
        "Node.js",
        "Express",
        "Django",
        "Flask",
        "Spring",
      ];
    } else if (step === GENERATION_STEPS.SOFT_SKILLS) {
      choices = [
        "Communication",
        "Teamwork",
        "Problem Solving",
        "Time Management",
        "Leadership",
        "Adaptability",
        "Creativity",
        "Work Ethic",
      ];
    }
    return (
      <MultipleChoices
        choices={choices}
        onSubmit={onAnswer}
        isSingleAnswer={step === GENERATION_STEPS.GENDER}
      />
    );
  };

  const renderQuestionInput = (): JSX.Element => {
    return (
      <div>
        <input
          type="text"
          onChange={(e) => {
            onAnswer(e.target.value);
          }}
        />
        <button
          onClick={() => {
            if (answerInput.length > 0) onAnswer(answerInput);
          }}
        >
          Submit
        </button>
      </div>
    );
  };

  return (
    <div>
      <div>{question}</div>
      {isMultipleChoiceQuestion
        ? renderQuestionChoices()
        : renderQuestionInput()}
    </div>
  );
}
