import React from "react";
import { ChoiceProps, MultipleChoicesProps } from "../types";

export default function MultipleChoices({
  isSingleAnswer = false,
  choices,
  onSubmit,
}: MultipleChoicesProps): JSX.Element {
  const [selected, setSelected] = React.useState<string[]>([]);
  function Choice({ choice, onClick }: ChoiceProps): JSX.Element {
    const isSelected = selected.includes(choice);
    return (
      <div
        className="flex flex-col justify-center items-center"
        role="button"
        tabIndex={0}
        onClick={() => {
          onClick();
        }}
      >
        <div
          className={`w-16 h-16 ${
            isSelected ? "bg-gray-300 text-white" : "bg-white text-black"
          } rounded-full`}
        >
          {choice}
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex flex-wrap">
        {choices.map((choice) => (
          <Choice
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
