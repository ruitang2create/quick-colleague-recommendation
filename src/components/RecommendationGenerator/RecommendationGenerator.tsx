import React from "react";
import { GrFormClose } from "react-icons/gr";
import IconButton from "../IconButton/IconButton";
import { ICON_SIZE } from "@/constants";
import { RecommendationGeneratorProps } from "../types";

export default function RecommendationGenerator({
  onQuit,
}: RecommendationGeneratorProps): JSX.Element {
  const [name, setName] = React.useState("your colleague");
  return (
    <div>
      <div className="flex justify-start items-center">
        <IconButton
          icon={GrFormClose}
          size={ICON_SIZE.XL}
          onClick={() => {
            if (onQuit) onQuit();
          }}
        />
        <div className="text-2xl">
          Generating a new recommendation for&nbsp;{name}&nbsp;...
        </div>
      </div>
    </div>
  );
}
