"use client";

import { useEditor, EditorContent, BubbleMenu } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { useState } from "react";
import {
  TextBIcon,
  TextItalicIcon,
  ListBulletsIcon,
  ListNumbersIcon,
  QuotesIcon,
  ArrowCounterClockwiseIcon,
  ArrowClockwiseIcon,
  SparkleIcon,
  MagicWandIcon,
  CircleNotchIcon,
} from "@phosphor-icons/react";
import { Button } from "@/components/ui/button";
import { PaperPlaneTiltIcon } from "@phosphor-icons/react/dist/ssr";
import { Input } from "@/components/ui/input";
import { Extension } from "@tiptap/core";
import { Plugin, PluginKey } from "prosemirror-state";
import { Decoration, DecorationSet } from "prosemirror-view";

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

export default function CampaignEmailEditor() {
  const [isAiPopupOpen, setIsAiPopupOpen] = useState(false);
  const [aiPrompt, setAiPrompt] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [hasSelection, setHasSelection] = useState(false);

  const editor = useEditor({
    extensions: [StarterKit, SelectionDecoration],
    content: "<p>Start writing your email campaign...</p>",
    editorProps: {
      attributes: {
        class:
          "prose dark:prose-invert mx-auto focus:outline-none min-h-[300px] p-4 [&_.selection]:bg-border [&_.selection]:py-1 selection:bg-transparent",
      },
    },
    onSelectionUpdate: ({ editor }) => {
      const { from, to } = editor.state.selection;
      setHasSelection(from !== to);
    },
  });

  // Stub AI generation function
  const generateAIContent = async (prompt: string, selectedText?: string) => {
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

  const handleAIGenerate = async () => {
    if (!aiPrompt.trim() || !editor) return;

    const { from, to } = editor.state.selection;
    const selectedText = hasSelection
      ? editor.state.doc.textBetween(from, to)
      : "";

    try {
      const generatedContent = await generateAIContent(aiPrompt, selectedText);

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

      setIsAiPopupOpen(false);
      setAiPrompt("");
    } catch (error) {
      console.error("AI generation failed:", error);
    }
  };

  const openAIDialog = () => {
    setIsAiPopupOpen(true);
  };

  if (!editor) {
    return null;
  }

  return (
    <div className="w-full max-w-4xl mx-auto">
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
      </div>

      {/* Editor */}
      <div className="border border-border border-t-0 rounded-b-lg min-h-[300px] bg-background">
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
              placeholder={
                hasSelection
                  ? "Make this more persuasive..."
                  : "Write an engaging introduction about..."
              }
              value={aiPrompt}
              onChange={(e) => setAiPrompt(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  handleAIGenerate();
                }
                if (e.key === "Escape") {
                  setIsAiPopupOpen(false);
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
      <div className="mt-4 flex gap-2">
        <Button onClick={() => console.log(editor.getHTML())}>
          Save Draft
        </Button>
        <Button
          variant="outline"
          onClick={() => editor.commands.clearContent()}
        >
          <PaperPlaneTiltIcon />
          Send Email
        </Button>
      </div>
    </div>
  );
}
