import React from "react";
import { GrFormClose } from "react-icons/gr";
import IconButton from "../IconButton/IconButton";
import { ICON_SIZE } from "@/constants";

export default function RecommendationGenerator(): JSX.Element {
  const [name, setName] = React.useState("your colleague");
  return (
    <div>
        <IconButton icon={GrFormClose} size={ICON_SIZE.LG} />
      <div>Generating a new recommendation for&nbsp;{name}&nbsp;...</div>
    </div>
  );
}
