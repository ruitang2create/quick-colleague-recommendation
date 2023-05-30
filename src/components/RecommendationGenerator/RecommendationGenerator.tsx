import React from "react";

export default function RecommendationGenerator(): JSX.Element {
  const [name, setName] = React.useState("your colleague");
  return (
    <div>
      <div>Generating a new recommendation for&nbsp;{name}&nbsp;...</div>
    </div>
  );
}
