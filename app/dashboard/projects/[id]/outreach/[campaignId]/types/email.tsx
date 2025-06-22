"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import {
  TextBIcon,
  TextItalicIcon,
  ListBulletsIcon,
  ListNumbersIcon,
  QuotesIcon,
  ArrowCounterClockwiseIcon,
  ArrowClockwiseIcon,
} from "@phosphor-icons/react";
import { Button } from "@/components/ui/button";
import { PaperPlaneTiltIcon } from "@phosphor-icons/react/dist/ssr";

export default function CampaignEmailEditor() {
  const editor = useEditor({
    extensions: [StarterKit],
    content: "<p>Start writing your email campaign...</p>",
    editorProps: {
      attributes: {
        class:
          "prose prose-sm sm:prose lg:prose-lg xl:prose-2xl mx-auto focus:outline-none min-h-[300px] p-4",
      },
    },
  });

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
