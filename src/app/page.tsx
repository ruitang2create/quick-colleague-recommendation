"use client";
import Button from "@/components/Button/Button";
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
        <Button
          className="text-xl"
          onClick={() => setIsGenerating(true)}
        >
          New Recommendation
        </Button>
      </div>
    );
  };

  const renderRecommendationGenerator = (): JSX.Element => {
    return (
      <RecommendationGenerator
        onQuit={() => {
          setIsGenerating(false);
        }}
      />
    );
  };

  const alignment = isGenerating ? "start" : "center";

  return (
    <main
      className={`flex h-screen flex-col items-${alignment} justify-${alignment} p-24`}
    >
      {isGenerating ? renderRecommendationGenerator() : renderDefaultUI()}
    </main>
  );
}
