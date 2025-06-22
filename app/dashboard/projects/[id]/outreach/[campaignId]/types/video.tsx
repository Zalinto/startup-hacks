import { api } from "@/app/providers";
import { WysiwygEditor } from "@/components/ui/wysiwyg-editor";
import { DownloadSimpleIcon, PlayIcon } from "@phosphor-icons/react/dist/ssr";
import { toast } from "sonner";
import { useActiveCampaginId } from "../hooks";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { Button } from "@/components/ui/button";

export default function CampaignVideoEditor({
  script,
  onSave,
}: {
  script: string;
  onSave: (script: string) => void | Promise<void>;
}) {
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
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

  const campaignId = useActiveCampaginId();
  const previewVideoMutation = useMutation({
    mutationFn: async (content: string) => {
      const genPromise = api.post<string>(`/campaign/${campaignId}/run`);
      toast.promise(genPromise, {
        loading: "Generating video preview...",
        success: "Video preview generated successfully!",
        error: (error) => `Failed to generate video preview: ${error.message}`,
      });

      const response = await genPromise;
      setVideoUrl(response.data);
    },
  });

  const handlePreviewVideo = async (content: string) => {
    await onSave(content);

    await previewVideoMutation.mutateAsync(content);
    // Implement your video preview logic here
  };

  return (
    <>
      <WysiwygEditor
        disabled={previewVideoMutation.isPending}
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
      {videoUrl && (
        <div className="mt-4">
          <h3 className="text-lg font-semibold mb-2 items-center flex gap-4">
            Video Preview
            <Button asChild variant="secondary">
              <a href={videoUrl} download>
                <DownloadSimpleIcon />
                Download
              </a>
            </Button>
          </h3>
          <video
            src={videoUrl}
            controls
            className="w-full h-auto rounded-lg shadow-md max-w-xl"
            autoPlay
            loop
            muted
            playsInline
          />
        </div>
      )}
    </>
  );
}
