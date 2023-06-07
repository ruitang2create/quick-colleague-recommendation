import React from "react";
import { Colleague, ReviewProps } from "../types";
import Button from "../Button/Button";
import { getRecommendation } from "@/lib/apiHelpers";
import Collapse from "../Collapse/Collapse";

export default function Review({
  header,
  colleague,
  specs,
}: ReviewProps): JSX.Element {
  const [recommendation, setRecommendation] = React.useState<string>("");
  const generate = async () => {
    try {
      const res = await getRecommendation(colleague, specs);
      setRecommendation(res);
    } catch (error) {
      console.error("Error generating recommendation: ", error);
    }
  };

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
      <Collapse title="Recommendation Specifications">
        <div>
          <div>A lot of Recommendation Specifications</div>
        </div>
      </Collapse>

      <Button onClick={generate}>Generate Recommendation</Button>
      {recommendation.length > 0 ? <div>{recommendation}</div> : null}
    </div>
  );
}
