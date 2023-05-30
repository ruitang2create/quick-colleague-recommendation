'use client'
import RecommendationGenerator from "@/components/RecommendationGenerator/RecommendationGenerator";
import React from "react";

export default function Home() {
  const [isGenerating, setIsGenerating] = React.useState(false);

  const renderDefaultUI = (): JSX.Element => {
    return (
      <div className="flex flex-col justify-center items-center">
        <h1 className="text-5xl font-bold mb-16">
          Welcome to Quick Colleague Recommendation
        </h1>
        <button
          className="w-fit bg-blue-300 p-2 rounded-md text-white"
          onClick={() => setIsGenerating(true)}
        >
          New Recommendation
        </button>
      </div>
    );
  };

  const renderRecommendationGenerator = (): JSX.Element => {
    return <RecommendationGenerator />;
  };

  const alignment = isGenerating ? "start" : "center";

  return (
    <main className={`flex min-h-screen flex-col items-${alignment} justify-${alignment} p-24`}>
      {isGenerating ? renderRecommendationGenerator() : renderDefaultUI()}
    </main>
  );
}
