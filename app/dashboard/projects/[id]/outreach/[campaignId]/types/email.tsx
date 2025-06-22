"use client";

import { useState } from "react";
import { PaperPlaneTiltIcon } from "@phosphor-icons/react/dist/ssr";
import { WysiwygEditor } from "@/components/ui/wysiwyg-editor";

export default function CampaignEmailEditor() {
  const [emailContent, setEmailContent] = useState("");

  // Custom AI generation function for email content
  const generateEmailAIContent = async (
    prompt: string,
    selectedText?: string
  ) => {
    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // Stub response based on email context
    let generatedContent = "";
    if (selectedText) {
      generatedContent = `Enhanced email content: ${selectedText} - [AI generated email improvement based on: "${prompt}"]`;
    } else {
      generatedContent = `[AI generated email content based on prompt: "${prompt}"]`;
    }

    return generatedContent;
  };

  const handleSave = (content: string) => {
    console.log("Saving email draft:", content);
    // Implement your save logic here
  };

  const handleSendEmail = (content: string) => {
    console.log("Sending email:", content);
    // Implement your send email logic here
  };

  return (
    <WysiwygEditor
      initialContent="<p>Start writing your email campaign...</p>"
      placeholder="Start writing your email campaign..."
      bubblePlaceholder="Make this more persuasive..."
      modalTitle="Generate Email Content"
      modalPlaceholder="Write a compelling opening paragraph for an email campaign..."
      onContentChange={setEmailContent}
      onSave={handleSave}
      onSecondaryAction={handleSendEmail}
      saveButtonText="Save Draft"
      secondaryButtonText="Send Email"
      secondaryButtonIcon={<PaperPlaneTiltIcon className="h-4 w-4 mr-2" />}
      generateAIContent={generateEmailAIContent}
      minHeight="300px"
    />
  );
}
