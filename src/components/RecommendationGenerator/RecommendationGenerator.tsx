import React from "react";
import { GrFormClose } from "react-icons/gr";
import IconButton from "../IconButton/IconButton";
import {
  COLLEAGUE_RELATIONSHIP,
  GENDER,
  GENERATION_QUESTIONS,
  GENERATION_STEPS,
  ICON_SIZE,
  defaultColleague,
  defaultRecommendationSpecs,
} from "@/constants";
import {
  Colleague,
  RecommendationGeneratorProps,
  RecommendationSpecs,
} from "../types";
import Question from "./Question";

export default function RecommendationGenerator({
  onQuit,
}: RecommendationGeneratorProps): JSX.Element {
  const [name, setName] = React.useState("your colleague");
  const [colleague, setColleague] = React.useState<Colleague>(defaultColleague);
  const [recommendationSpecs, setRecommendationSpecs] =
    React.useState<RecommendationSpecs>(defaultRecommendationSpecs);
  const [currStep, setCurrStep] = React.useState<GENERATION_STEPS>(
    GENERATION_STEPS.NAME
  );

  const answerQuestion = (answer: string | string[]): void => {
    switch (currStep) {
      case GENERATION_STEPS.NAME:
        setColleague({ ...colleague, name: answer as string });
        break;
      case GENERATION_STEPS.GENDER:
        setColleague({ ...colleague, gender: answer as GENDER });
        break;
      case GENERATION_STEPS.TITLE:
        setColleague({ ...colleague, title: answer as string });
        break;
      case GENERATION_STEPS.RELATIONSHIP:
        setColleague({
          ...colleague,
          relationship: answer as COLLEAGUE_RELATIONSHIP,
        });
        break;
      case GENERATION_STEPS.HARD_SKILLS:
        setColleague({ ...colleague, hardSkills: answer as string[] });
        break;
      case GENERATION_STEPS.SOFT_SKILLS:
        setColleague({ ...colleague, softSkills: answer as string[] });
        break;
      default:
        break;
    }
  };

  return (
    <div>
      <div className="flex justify-start items-center">
        <IconButton
          icon={GrFormClose}
          size={ICON_SIZE.XL}
          onClick={() => {
            if (onQuit) onQuit();
          }}
        />
        <div className="text-2xl">Generating a new recommendation...</div>
      </div>
      <div className="flex justify-start items-center">
        {currStep < GENERATION_STEPS.REVIEW ? (
          <Question
            step={currStep}
            question={GENERATION_QUESTIONS[currStep]}
            onAnswer={answerQuestion}
          />
        ) : (
          <Review
            header={GENERATION_QUESTIONS[currStep]}
            colleague={colleague}
            recommendationSpecs={recommendationSpecs}
          />
        )}
      </div>
    </div>
  );
}
