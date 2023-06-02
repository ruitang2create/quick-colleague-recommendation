import React, { useEffect } from "react";
import { ChoiceProps, MultipleChoicesProps } from "../types";
import styles from "./styles.module.scss";

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
      <div className="flex flex-wrap my-4">
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
        <button
          className="w-fit bg-white p-2 rounded-md text-black border border-black mr-2"
          onClick={onBack}
        >
          Previous
        </button>
      )}
      <button
        className="w-fit bg-blue-300 p-2 rounded-md text-white"
        onClick={() => {
          if (isSingleAnswer) {
            onSubmit(selected[0]);
          } else {
            onSubmit(selected);
          }
        }}
      >
        Next
      </button>
    </div>
  );
}
