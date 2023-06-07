import React, { use, useEffect } from "react";
import { QuestionProps } from "../types";
import { COLLEAGUE_RELATIONSHIP, GENDER, GENERATION_STEPS } from "@/constants";
import MultipleChoices from "./MultipleChoices";

export default function Question({
  step,
  question,
  onAnswer,
  onBack,
  defaultChoices,
  loading = false,
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
    if (loading)  return <div>Loading...</div>;
    let choices: string[] = [];
    if (step === GENERATION_STEPS.GENDER) {
      choices = Object.values(GENDER);
    } else if (step === GENERATION_STEPS.RELATIONSHIP) {
      choices = Object.values(COLLEAGUE_RELATIONSHIP);
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
        choices={defaultChoices || choices}
        onSubmit={onAnswer}
        isSingleAnswer={
          step === GENERATION_STEPS.GENDER ||
          step === GENERATION_STEPS.RELATIONSHIP
        }
        onBack={onBack}
      />
    );
  };

  const renderQuestionInput = (): JSX.Element => {
    return (
      <div>
        <input
          type="text"
          onChange={(e) => {
            setAnswerInput(e.target.value);
          }}
          className="w-full my-4"
        />
        {onBack && (
          <button
            className="w-fit bg-white p-2 rounded-md text-black shadow-sm mr-2"
            onClick={onBack}
          >
            Previous
          </button>
        )}
        <button
          className="w-fit bg-blue-300 p-2 rounded-md shadow-sm text-white"
          onClick={() => {
            if (answerInput.length > 0) onAnswer(answerInput);
          }}
        >
          Next
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
