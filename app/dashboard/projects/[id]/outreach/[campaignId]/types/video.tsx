import { WysiwygEditor } from "@/components/ui/wysiwyg-editor";
import { PlayIcon } from "@phosphor-icons/react/dist/ssr";

export default function CampaignVideoEditor({
  script,
  onSave,
}: {
  script: string;
  onSave: (script: string) => void | Promise<void>;
}) {
  // Custom AI generation function for video script content
  const generateVideoScriptAIContent = async (
    prompt: string,
    selectedText?: string
  ) => {
    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // Stub response based on video script context
    let generatedContent = "";
    if (selectedText) {
      generatedContent = `Enhanced script: ${selectedText} - [AI generated video script improvement based on: "${prompt}"]`;
    } else {
      generatedContent = `[AI generated video script content based on prompt: "${prompt}"]`;
    }

    return generatedContent;
  };

  const handleSave = (content: string) => {
    console.log("Saving video script draft:", content);
    // Implement your save logic here
  };

  const handlePreviewVideo = (content: string) => {
    console.log("Previewing video script:", content);
    // Implement your video preview logic here
  };

  return (
    <WysiwygEditor
      initialContent={script}
      placeholder="Start writing your video script..."
      bubblePlaceholder="Make this more engaging..."
      modalTitle="Generate Video Script Content"
      modalPlaceholder="Write an engaging opening for a video script about..."
      // onContentChange={setScriptContent}
      onSave={onSave}
      onSecondaryAction={handlePreviewVideo}
      saveButtonText="Save Script"
      secondaryButtonText="Preview Video"
      secondaryButtonIcon={<PlayIcon />}
      generateAIContent={generateVideoScriptAIContent}
      minHeight="400px"
    />
  );
}
