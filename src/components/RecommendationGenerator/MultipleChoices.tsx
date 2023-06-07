import React, { useEffect } from "react";
import { ChoiceProps, MultipleChoicesProps } from "../types";
import styles from "./styles.module.scss";
import Button from "../Button/Button";

export default function MultipleChoices({
  isSingleAnswer = false,
  choices,
  onSubmit,
  onBack,
}: MultipleChoicesProps): JSX.Element {
  const [selected, setSelected] = React.useState<string[]>([]);

  useEffect(() => {
    setSelected([]);
  }, [choices]);

  function Choice({ choice, onClick }: ChoiceProps): JSX.Element {
    const isSelected = selected.includes(choice);
    return (
      <div
        className={`flex flex-col justify-center items-center px-2 py-1 rounded-md mx-1 ${
          styles.choiceButton
        } ${isSelected ? "bg-gray-950 text-white" : "bg-white text-black"}`}
        role="button"
        tabIndex={0}
        onClick={() => {
          onClick();
        }}
      >
        {choice}
      </div>
    );
  }

  return (
    <div>
      <div className="flex flex-wrap my-4 mx-[-0.5rem]">
        {choices.map((choice) => (
          <Choice
            key={choice}
            choice={choice}
            onClick={() => {
              if (isSingleAnswer) {
                setSelected([choice]);
              } else {
                if (selected.includes(choice)) {
                  setSelected(selected.filter((s) => s !== choice));
                } else {
                  setSelected([...selected, choice]);
                }
              }
            }}
          />
        ))}
      </div>
      {onBack && (
        <Button className="text-lg mr-4" appearance="Secondary" onClick={onBack}>
          Previous
        </Button>
      )}
      <Button
        className="text-lg"
        appearance="Primary"
        onClick={() => {
          if (isSingleAnswer) {
            onSubmit(selected[0]);
          } else {
            onSubmit(selected);
          }
        }}
      >
        Next
      </Button>
    </div>
  );
}
