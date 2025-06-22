"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  ArrowClockwiseIcon,
  ArrowCounterClockwiseIcon,
  CircleNotchIcon,
  ListBulletsIcon,
  ListNumbersIcon,
  QuotesIcon,
  SparkleIcon,
  TextBIcon,
  TextItalicIcon,
} from "@phosphor-icons/react";
import { useMutation } from "@tanstack/react-query";
import { Extension } from "@tiptap/core";
import { BubbleMenu, EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { Plugin, PluginKey } from "prosemirror-state";
import { Decoration, DecorationSet } from "prosemirror-view";
import { useState } from "react";

const SelectionDecoration = Extension.create({
  name: "selectionDecoration",

  addOptions() {
    return {
      className: "selection",
    };
  },

  addProseMirrorPlugins() {
    return [
      new Plugin({
        key: new PluginKey("selectionDecoration"),
        props: {
          decorations: (state) => {
            const { selection } = state;
            if (selection.empty) {
              return DecorationSet.empty;
            }
            return DecorationSet.create(state.doc, [
              Decoration.inline(selection.from, selection.to, {
                class: this.options.className,
              }),
            ]);
          },
        },
      }),
    ];
  },
});

interface WysiwygEditorProps {
  disabled?: boolean;
  initialContent?: string;
  placeholder?: string;
  bubblePlaceholder?: string;
  modalTitle?: string;
  modalPlaceholder?: string;
  onContentChange?: (content: string) => void;
  onSave?: (content: string) => void | Promise<void>;
  onSecondaryAction?: (content: string) => void;
  saveButtonText?: string;
  secondaryButtonText?: string;
  secondaryButtonIcon?: React.ReactNode;
  generateAIContent?: (
    prompt: string,
    selectedText?: string
  ) => Promise<string>;
  className?: string;
  minHeight?: string;
}

export function WysiwygEditor({
  disabled = false,
  initialContent = "<p>Start writing...</p>",
  bubblePlaceholder = "Enhance this content...",
  modalTitle = "Generate Content",
  modalPlaceholder = "Write a compelling opening paragraph for...",
  onContentChange,
  onSave,
  onSecondaryAction,
  saveButtonText = "Save Draft",
  secondaryButtonText = "Send",
  secondaryButtonIcon,
  generateAIContent,
  className = "w-full",
  minHeight = "300px",
}: WysiwygEditorProps) {
  const [aiPrompt, setAiPrompt] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [hasSelection, setHasSelection] = useState(false);
  const [isAiModalOpen, setIsAiModalOpen] = useState(false);
  const [modalPrompt, setModalPrompt] = useState("");

  const editor = useEditor({
    extensions: [StarterKit, SelectionDecoration],
    content: initialContent,
    editorProps: {
      attributes: {
        class: `prose dark:prose-invert mx-auto focus:outline-none p-4 [&_.selection]:bg-border [&_.selection]:py-1 selection:bg-transparent max-w-none`,
        style: `min-height: ${minHeight}`,
      },
    },
    onSelectionUpdate: ({ editor }) => {
      const { from, to } = editor.state.selection;
      setHasSelection(from !== to);
      setAiPrompt("");
    },
    onUpdate: ({ editor }) => {
      onContentChange?.(editor.getHTML());
    },
  });

  // Default AI generation function (stub)
  const defaultGenerateAIContent = async (
    prompt: string,
    selectedText?: string
  ) => {
    setIsGenerating(true);

    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // Stub response based on context
    let generatedContent = "";
    if (selectedText) {
      generatedContent = `Enhanced version: ${selectedText} - [AI generated improvement based on: "${prompt}"]`;
    } else {
      generatedContent = `[AI generated content based on prompt: "${prompt}"]`;
    }

    setIsGenerating(false);
    return generatedContent;
  };

  const aiGenerateFunction = generateAIContent || defaultGenerateAIContent;

  const handleAIGenerate = async () => {
    if (!aiPrompt.trim() || !editor) return;
    setIsGenerating(true);

    const { from, to } = editor.state.selection;
    const selectedText = hasSelection
      ? editor.state.doc.textBetween(from, to)
      : "";

    try {
      const generatedContent = await aiGenerateFunction(aiPrompt, selectedText);

      if (hasSelection) {
        // Replace selected text
        editor
          .chain()
          .focus()
          .deleteSelection()
          .insertContent(generatedContent)
          .run();
      } else {
        // Insert at cursor position
        editor.chain().focus().insertContent(generatedContent).run();
      }

      setAiPrompt("");
    } catch (error) {
      console.error("AI generation failed:", error);
    }
    setIsGenerating(false);
  };

  const handleModalAIGenerate = async () => {
    if (!modalPrompt.trim() || !editor) return;
    setIsGenerating(true);

    try {
      const generatedContent = await aiGenerateFunction(modalPrompt);

      // Insert at cursor position
      editor.chain().focus().insertContent(generatedContent).run();

      setModalPrompt("");
      setIsAiModalOpen(false);
    } catch (error) {
      console.error("AI generation failed:", error);
    }
    setIsGenerating(false);
  };

  const saveMutation = useMutation({
    mutationFn: async () => {
      if (editor && onSave) {
        await onSave(editor.getHTML());
      }
    },
  });

  const handleSecondaryAction = () => {
    if (editor && onSecondaryAction) {
      onSecondaryAction(editor.getHTML());
    }
  };

  if (!editor) {
    return null;
  }

  return (
    <div className={className}>
      {/* Toolbar */}
      <div className="border border-border rounded-t-lg bg-card p-2 flex flex-wrap gap-1">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={`text-muted-foreground hover:text-foreground hover:bg-accent ${
            editor.isActive("bold") ? "bg-accent text-accent-foreground" : ""
          }`}
        >
          <TextBIcon className="h-4 w-4" />
        </Button>

        <Button
          variant="ghost"
          size="sm"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={`text-muted-foreground hover:text-foreground hover:bg-accent ${
            editor.isActive("italic") ? "bg-accent text-accent-foreground" : ""
          }`}
        >
          <TextItalicIcon className="h-4 w-4" />
        </Button>

        <div className="w-px h-6 bg-border mx-1" />

        <Button
          variant="ghost"
          size="sm"
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={`text-muted-foreground hover:text-foreground hover:bg-accent ${
            editor.isActive("bulletList")
              ? "bg-accent text-accent-foreground"
              : ""
          }`}
        >
          <ListBulletsIcon className="h-4 w-4" />
        </Button>

        <Button
          variant="ghost"
          size="sm"
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={`text-muted-foreground hover:text-foreground hover:bg-accent ${
            editor.isActive("orderedList")
              ? "bg-accent text-accent-foreground"
              : ""
          }`}
        >
          <ListNumbersIcon className="h-4 w-4" />
        </Button>

        <Button
          variant="ghost"
          size="sm"
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          className={`text-muted-foreground hover:text-foreground hover:bg-accent ${
            editor.isActive("blockquote")
              ? "bg-accent text-accent-foreground"
              : ""
          }`}
        >
          <QuotesIcon className="h-4 w-4" />
        </Button>

        <div className="w-px h-6 bg-border mx-1" />

        <Button
          variant="ghost"
          size="sm"
          onClick={() => editor.chain().focus().undo().run()}
          disabled={!editor.can().undo()}
          className="text-muted-foreground hover:text-foreground hover:bg-accent disabled:text-muted-foreground/50 disabled:hover:bg-transparent"
        >
          <ArrowCounterClockwiseIcon className="h-4 w-4" />
        </Button>

        <Button
          variant="ghost"
          size="sm"
          onClick={() => editor.chain().focus().redo().run()}
          disabled={!editor.can().redo()}
          className="text-muted-foreground hover:text-foreground hover:bg-accent disabled:text-muted-foreground/50 disabled:hover:bg-transparent"
        >
          <ArrowClockwiseIcon className="h-4 w-4" />
        </Button>

        <div className="w-px h-6 bg-border mx-1" />

        <Dialog open={isAiModalOpen} onOpenChange={setIsAiModalOpen}>
          <DialogTrigger asChild>
            <Button
              variant="ghost"
              size="sm"
              className="text-muted-foreground hover:text-foreground hover:bg-accent"
            >
              <SparkleIcon className="h-4 w-4" />
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>{modalTitle}</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <textarea
                  id="ai-prompt"
                  placeholder={modalPlaceholder}
                  value={modalPrompt}
                  onChange={(e) => setModalPrompt(e.target.value)}
                  className="min-h-[100px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 resize-none"
                  disabled={isGenerating}
                />
              </div>
            </div>
            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  setModalPrompt("");
                  setIsAiModalOpen(false);
                }}
                disabled={isGenerating}
              >
                Cancel
              </Button>
              <Button
                type="button"
                onClick={handleModalAIGenerate}
                disabled={!modalPrompt.trim() || isGenerating}
              >
                {isGenerating ? (
                  <>
                    <CircleNotchIcon className="h-4 w-4 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <SparkleIcon className="h-4 w-4" />
                    Generate
                  </>
                )}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Editor */}
      <div
        className="border border-border border-t-0 rounded-b-lg bg-background"
        style={{ minHeight }}
      >
        <EditorContent
          editor={editor}
          className="prose prose-neutral dark:prose-invert prose-sm sm:prose lg:prose-lg xl:prose-2xl max-w-none"
        />
      </div>

      {/* AI Bubble Menu */}
      {editor && (
        <BubbleMenu
          editor={editor}
          tippyOptions={{ duration: 100 }}
          className=""
        >
          <div className="relative bg-card rounded-md">
            <div className="absolute top-0 left-0 bottom-0 m-auto flex items-center justify-center w-9">
              {isGenerating ? (
                <CircleNotchIcon className="animate-spin h-4 w-4" />
              ) : (
                <SparkleIcon className="h-4 w-4" />
              )}
            </div>
            <Input
              placeholder={bubblePlaceholder}
              value={aiPrompt}
              onChange={(e) => setAiPrompt(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  handleAIGenerate();
                }
                if (e.key === "Escape") {
                  setAiPrompt("");
                }
              }}
              disabled={isGenerating}
              className="text-sm w-64 pl-8"
            />
          </div>
        </BubbleMenu>
      )}

      {/* Actions */}
      {(onSave || onSecondaryAction) && (
        <div className="mt-4 flex gap-2">
          {onSave && (
            <Button
              onClick={() => saveMutation.mutate()}
              disabled={saveMutation.isPending || disabled}
            >
              {saveButtonText}
            </Button>
          )}
          {onSecondaryAction && (
            <Button
              variant="outline"
              onClick={handleSecondaryAction}
              disabled={disabled}
            >
              {secondaryButtonIcon}
              {secondaryButtonText}
            </Button>
          )}
        </div>
      )}
    </div>
  );
}
