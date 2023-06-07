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
import Review from "./Review";
import { getHardSkillsByJob } from "@/lib/apiHelpers";

export default function RecommendationGenerator({
  onQuit,
}: RecommendationGeneratorProps): JSX.Element {
  const [colleague, setColleague] = React.useState<Colleague>(defaultColleague);
  const [recommendationSpecs, setRecommendationSpecs] =
    React.useState<RecommendationSpecs>(defaultRecommendationSpecs);
  const [currStep, setCurrStep] = React.useState<GENERATION_STEPS>(
    GENERATION_STEPS.NAME
  );
  const [defaultQuestionChoices, setDefaultQuestionChoices] = React.useState<
    string[] | undefined
  >();
  const [loading, setLoading] = React.useState<boolean>(false);

  /**
   * Get hard skills through herlper function, and set it as default choices
   *
   */
  const getHardSkills = async () => {
    setLoading(true);
    try {
      const hardSkills = await getHardSkillsByJob(colleague.title);
      setDefaultQuestionChoices(hardSkills);
    } catch (error) {
      console.error("Error getting hard skills by job: ", error);
      setDefaultQuestionChoices(undefined);
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    if (
      currStep === GENERATION_STEPS.HARD_SKILLS &&
      colleague.title?.length > 0
    ) {
      getHardSkills();
    } else {
      setDefaultQuestionChoices(undefined);
    }
  }, [currStep]);

  const answerQuestion = (answer: string | string[]): void => {
    switch (currStep) {
      case GENERATION_STEPS.NAME:
        setColleague({ ...colleague, name: answer as string });
        setCurrStep((currStep) => currStep + 1);
        break;
      case GENERATION_STEPS.GENDER:
        setColleague({ ...colleague, gender: answer as GENDER });
        setCurrStep((currStep) => currStep + 1);
        break;
      case GENERATION_STEPS.TITLE:
        setColleague({ ...colleague, title: answer as string });
        setCurrStep((currStep) => currStep + 1);
        break;
      case GENERATION_STEPS.RELATIONSHIP:
        setColleague({
          ...colleague,
          relationship: answer as COLLEAGUE_RELATIONSHIP,
        });
        setCurrStep((currStep) => currStep + 1);
        break;
      case GENERATION_STEPS.HARD_SKILLS:
        setColleague({ ...colleague, hardSkills: answer as string[] });
        setCurrStep((currStep) => currStep + 1);
        break;
      case GENERATION_STEPS.SOFT_SKILLS:
        setColleague({ ...colleague, softSkills: answer as string[] });
        setCurrStep((currStep) => currStep + 1);
        break;
      default:
        break;
    }
  };

  const goBack = () => {
    setCurrStep((currStep) => currStep - 1);
  };

  return (
    <>
      <div className="flex justify-start items-center">
        <IconButton
          icon={GrFormClose}
          size={ICON_SIZE.XL}
          onClick={() => {
            if (onQuit) onQuit();
          }}
        />
        <div className="text-2xl">Close</div>
      </div>
      <div className="flex justify-center items-center h-full w-full">
        {currStep < GENERATION_STEPS.REVIEW ? (
          <Question
            step={currStep}
            question={GENERATION_QUESTIONS[currStep]}
            onAnswer={answerQuestion}
            onBack={currStep > 0 ? goBack : undefined}
            defaultChoices={defaultQuestionChoices}
            loading={loading}
          />
        ) : (
          <Review
            header={GENERATION_QUESTIONS[currStep]}
            colleague={colleague}
            specs={recommendationSpecs}
          />
        )}
      </div>
    </>
  );
}
