import React from "react";
import { Colleague, ReviewProps } from "../types";
import Button from "../Button/Button";
import { getRecommendation } from "@/lib/apiHelpers";
import Collapse from "../Collapse/Collapse";
import styles from "./styles.module.scss";
import { BsPersonCircle } from "react-icons/bs";
import { GrLinkedin } from "react-icons/gr";
import { MdContentCopy } from "react-icons/md";
import IconButton from "../IconButton/IconButton";
import { format } from "date-fns";

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

  const renderRecommendation = (): JSX.Element => {
    if (generated && recommendation.length > 0) {
      return (
        <div className="my-4 border border-slate-500 text-slate-700 rounded-sm">
          <div className="text-lg font-bold text-start border-b border-b-slate-400 px-6 py-4">
            Recommendation Preview
          </div>
          <div className="flex px-2 py-4">
            <IconButton
              icon={BsPersonCircle}
              size="3rem"
              alt="Profile"
              disabled
              className="mx-2"
            />
            <div>
              <div className="flex items-center">
                <div className="font-semibold">Your Name</div>
                <IconButton
                  icon={GrLinkedin}
                  alt="LinkedIn"
                  className="mx-1"
                  size="0.9rem"
                  style={{
                    filter:
                      "invert(50%) sepia(70%) saturate(2136%) hue-rotate(11deg) brightness(93%) contrast(83%)",
                  }}
                />
                <div className="text-[0.5rem] text-gray-500">&bull;&nbsp;</div>
                <div className="text-sm text-gray-500">1st</div>
              </div>
              <div className="text-sm">Your Title</div>
              <div className="text-sm text-gray-500">{`${format(
                new Date(),
                "MMM dd, yyyy"
              )}`}</div>
              <div className="text-md mt-4 mb-4">{recommendation}</div>
            </div>
          </div>
        </div>
      );
    } else if (generating) {
      return (
        <div className="my-4">
          <div>
            <div className="text-lg font-bold">
              Generating recommendation...
            </div>
          </div>
        </div>
      );
    } else {
      return <></>;
    }
  };

  return (
    <div>
      <Collapse
        title="Colleague Information"
        isOpen={!generated}
        className={styles.reviewCollapse}
      >
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
      <Collapse
        title="Recommendation Specifications"
        isOpen={!generated}
        className={styles.reviewCollapse}
      >
        <div>
          <div>A lot of Recommendation Specifications</div>
        </div>
      </Collapse>
      {renderRecommendation()}
      <div className="w-full flex flex-col justify-center items-center mb-6 ">
        {generated && recommendation.length > 0 && (
          <Button
            onClick={() => {
              if (navigator) {
                navigator.clipboard.writeText(recommendation).then(() => {
                  alert("Copied to clipboard!");
                });
              }
            }}
            className="max-w-full w-48 text-xl px-8 mb-4"
          >
            <div className="flex items-center">
              <IconButton icon={MdContentCopy} size="1.25rem" className="mr-2" />
              <div>Copy</div>
            </div>
          </Button>
        )}
        <Button
          onClick={generateRecommendation}
          disabled={generating}
          className="max-w-full w-48 text-xl px-8"
        >
          {getGenerateButtonText()}
        </Button>
      </div>
    </div>
  );
}
