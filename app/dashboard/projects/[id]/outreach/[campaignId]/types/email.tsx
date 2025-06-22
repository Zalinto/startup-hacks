import { WysiwygEditor } from "@/components/ui/wysiwyg-editor";
import { PaperPlaneTiltIcon } from "@phosphor-icons/react/dist/ssr";

export default function CampaignEmailEditor({
  script,
  onSave,
}: {
  script: string;
  onSave: (script: string) => void | Promise<void>;
}) {
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

  const handleSendEmail = (content: string) => {
    alert("TODO: Send email with content.");
  };

  return (
    <WysiwygEditor
      initialContent={script}
      placeholder="Start writing your email campaign..."
      bubblePlaceholder="Make this more persuasive..."
      modalTitle="Generate Email Content"
      modalPlaceholder="Write a compelling opening paragraph for an email campaign..."
      // onContentChange={setEmailContent}
      onSave={onSave}
      onSecondaryAction={handleSendEmail}
      saveButtonText="Save Draft"
      secondaryButtonText="Send Email"
      secondaryButtonIcon={<PaperPlaneTiltIcon />}
      generateAIContent={generateEmailAIContent}
      minHeight="300px"
    />
  );
}
