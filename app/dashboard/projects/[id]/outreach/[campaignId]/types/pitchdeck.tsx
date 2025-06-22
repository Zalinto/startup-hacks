"use client";

import { useState } from "react";
import { PresentationChartIcon } from "@phosphor-icons/react/dist/ssr";
import { WysiwygEditor } from "@/components/ui/wysiwyg-editor";

export default function CampaignPitchdeckEditor() {
  const [pitchContent, setPitchContent] = useState("");

  // Custom AI generation function for pitch deck content
  const generatePitchDeckAIContent = async (
    prompt: string,
    selectedText?: string
  ) => {
    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // Stub response based on pitch deck context
    let generatedContent = "";
    if (selectedText) {
      generatedContent = `Enhanced pitch content: ${selectedText} - [AI generated pitch deck improvement based on: "${prompt}"]`;
    } else {
      generatedContent = `[AI generated pitch deck content based on prompt: "${prompt}"]`;
    }

    return generatedContent;
  };

  const handleSave = (content: string) => {
    console.log("Saving pitch deck draft:", content);
    // Implement your save logic here
  };

  const handleGenerateSlides = (content: string) => {
    console.log("Generating slides from pitch deck:", content);
    // Implement your slide generation logic here
  };

  return (
    <WysiwygEditor
      initialContent="<p>Start writing your pitch deck content...</p>"
      placeholder="Start writing your pitch deck content..."
      bubblePlaceholder="Make this more compelling..."
      modalTitle="Generate Pitch Deck Content"
      modalPlaceholder="Write a compelling value proposition for your startup..."
      onContentChange={setPitchContent}
      onSave={handleSave}
      onSecondaryAction={handleGenerateSlides}
      saveButtonText="Save Draft"
      secondaryButtonText="Generate Slides"
      secondaryButtonIcon={<PresentationChartIcon />}
      generateAIContent={generatePitchDeckAIContent}
      minHeight="400px"
    />
  );
}
