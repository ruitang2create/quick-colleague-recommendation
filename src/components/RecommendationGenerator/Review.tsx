import React from "react";
import { ReviewProps } from "../types";

export default function Review({
  header,
  colleague,
  specs,
}: ReviewProps): JSX.Element {
  return (
    <div>
      <div>
        <div>Colleague Information:</div>
        {Object.keys(colleague).map((key) => {
          return (
            <div>
              <div>{key}</div>
              <div>{colleague[key]}</div>
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
