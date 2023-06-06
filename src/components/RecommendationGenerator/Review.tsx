import React from "react";
import { Colleague, ReviewProps } from "../types";

export default function Review({
  header,
  colleague,
  specs,
}: ReviewProps): JSX.Element {
  return (
    <div>
      <div className="bg-stone-200 px-6 py-4 mb-4">
        <div className="text-lg font-bold mb-4">Colleague Information:</div>
        {Object.keys(colleague).map((key) => {
          const head = key.charAt(0).toUpperCase() + key.slice(1);
          const value = colleague[key as keyof Colleague];
          console.log(`type of the value of [${key}]: ${Array.isArray(value)}`);
          let valueElement: JSX.Element;
          if (!Array.isArray(value)) {
            valueElement = <div>{value}</div>;
          } else {
            valueElement = (
              <div className="flex flex-wrap">
                {value.map((v, i) => (
                  <div key={v}>
                    {v}
                    {i === value.length - 1 ? null : <span>,&nbsp;</span>}
                  </div>
                ))}
              </div>
            );
          }
          return (
            <div className="my-2" key={key}>
              <div className="border-b border-b-stone-500">{head}</div>
              {valueElement}
            </div>
          );
        })}
      </div>
      {
        <div>
          <div>Recommendation Specifications:</div>
        </div>
      }
    </div>
  );
}
