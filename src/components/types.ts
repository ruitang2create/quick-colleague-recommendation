import { COLLEAGUE_RELATIONSHIP, GENDER, GENERATION_STEPS } from "@/constants";
import { StaticImageData } from "next/image";
import { IconType as ReactIconsIconType } from "react-icons";

export type CommonComponentProps = {
  className?: string;
  style?: React.CSSProperties;
};

export interface CollapseProps extends CommonComponentProps {
  title: string;
  children: React.ReactNode;
  isOpenByDefault?: boolean;
}

export type IconType = string | ReactIconsIconType | StaticImageData;

export interface IconButtonProps extends CommonComponentProps {
  icon: IconType;
  alt?: string;
  onClick?: () => void;
  disabled?: boolean;
  size?: string;
}

export interface RecommendationGeneratorProps extends CommonComponentProps {
  onQuit?: () => void;
}

export interface QuestionProps extends CommonComponentProps {
  step: GENERATION_STEPS;
  question: string;
  onAnswer: (answer: string | string[]) => void;
  onBack?: () => void;
  defaultChoices?: string[];
  loading?: boolean;
}

export interface MultipleChoicesProps extends CommonComponentProps {
  choices: string[];
  onSubmit: (answer: string | string[]) => void;
  onBack?: () => void;
  isSingleAnswer?: boolean;
}

export interface ChoiceProps extends CommonComponentProps {
  choice: string;
  onClick: () => void;
}

export interface ReviewProps extends CommonComponentProps {
    header: string;
    colleague: Colleague;
    specs: RecommendationSpecs;
}

export interface ButtonProps extends CommonComponentProps {
  appearance?: "primary" | "secondary";
  onClick?: () => void;
  disabled?: boolean;
  loading?: boolean;
  children: React.ReactNode;
}

export interface Colleague {
  name: string;
  gender: GENDER;
  title: string;
  relationship: COLLEAGUE_RELATIONSHIP;
  hardSkills: string[];
  softSkills: string[];
}

export interface RecommendationSpecs {
  length: string;
  language: string;
  template?: string;
  counterExample?: string;
  wordsToAvoid?: string[];
  otherNotes?: string;
}
