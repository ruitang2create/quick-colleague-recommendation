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
  const [generated, setGenerated] = React.useState<boolean>(false);
  const [generating, setGenerating] = React.useState<boolean>(false);
  const [recommendation, setRecommendation] = React.useState<string>("");
  const generateRecommendation = async () => {
    try {
      setRecommendation("");
      setGenerating(true);
      setGenerated(false);
      const res = await getRecommendation(colleague, specs);
      setRecommendation(res);
      setGenerated(true);
    } catch (error) {
      console.error("Error generating recommendation: ", error);
    } finally {
      setGenerating(false);
    }
  };

  const getGenerateButtonText = (): string => {
    if (generating) {
      return "Generating...";
    } else if (generated) {
      return "Regenerate";
    } else {
      return "Generate";
    }
  };

  return (
    <div>
      <Collapse title="Colleague Information" isOpen={!generated}>
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
              <div className="border-b border-b-slate-400">{head}</div>
              {valueElement}
            </div>
          );
        })}
      </Collapse>
      <Collapse title="Recommendation Specifications" isOpen={!generated}>
        <div>
          <div>A lot of Recommendation Specifications</div>
        </div>
      </Collapse>

      <Button onClick={generateRecommendation} disabled={generating}>
        {getGenerateButtonText()}
      </Button>
      {recommendation.length > 0 ? <div>{recommendation}</div> : null}
    </div>
  );
}
