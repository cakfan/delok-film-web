"use client";

import { useEffect } from "react";
import { Toggle } from "@/components/ui/toggle";
import {
  useEditor,
  BubbleMenu,
  EditorContent,
  mergeAttributes,
} from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import Mention from "@tiptap/extension-mention";
import Link from "@tiptap/extension-link";
import { Bold, Italic, Strikethrough } from "lucide-react";
import { mentionSuggestionOptions } from "./suggestion";

export default function Tiptap({
  disabled,
  placeholder,
  content,
  onChange,
}: {
  placeholder: string;
  disabled: boolean;
  content: string | null | undefined;
  onChange: (richText: string) => void;
}) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure(),
      Placeholder.configure({
        placeholder,
      }),
      Link.configure({
        HTMLAttributes: {
          class: "px-2 py-0.5 text-sm bg-accent rounded-md cursor-pointer",
        },
      }),
      Mention.configure({
        deleteTriggerWithBackspace: true,
        HTMLAttributes: {
          class: "px-2 py-0.5 text-sm bg-accent rounded-md cursor-pointer",
        },
        suggestion: mentionSuggestionOptions,
        renderHTML({ options, node }) {
          return [
            "a",
            mergeAttributes(
              {
                href: node.attrs.id.includes("people")
                  ? `/people/${node.attrs.id.replaceAll("people|", "")}`
                  : `/@${node.attrs.id.replaceAll("user|", "")}`,
                title: node.attrs.label,
              },
              options.HTMLAttributes,
            ),
            `${options.suggestion.char}${node.attrs.label}`,
          ];
        },
      }),
    ],
    content: content ?? undefined,
    editorProps: {
      attributes: {
        class:
          "rounded-md min-h-[250px] border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
      },
    },
    onUpdate({ editor }) {
      onChange(editor.getHTML());
    },
  });

  useEffect(() => {
    if (!content || content === "") {
      editor?.commands.clearContent();
    }
  }, [content, editor]);

  return (
    <div className="prose flex h-auto w-full min-w-full flex-col gap-2 dark:prose-invert lg:prose-xl">
      {editor && (
        <BubbleMenu
          className="flex gap-1 rounded-md bg-background"
          editor={editor}
          tippyOptions={{ duration: 100 }}
        >
          <Toggle
            pressed={editor.isActive("bold")}
            onPressedChange={() => editor.chain().focus().toggleBold().run()}
            size={"sm"}
          >
            <Bold className="h-4 w-4" />
          </Toggle>
          <Toggle
            pressed={editor.isActive("italic")}
            onPressedChange={() => editor.chain().focus().toggleItalic().run()}
            size={"sm"}
          >
            <Italic className="h-4 w-4" />
          </Toggle>
          <Toggle
            pressed={editor.isActive("strike")}
            onPressedChange={() => editor.chain().focus().toggleStrike().run()}
            size={"sm"}
          >
            <Strikethrough className="h-4 w-4" />
          </Toggle>
        </BubbleMenu>
      )}
      <EditorContent
        className="w-full"
        placeholder={placeholder}
        disabled={disabled}
        editor={editor}
      />
    </div>
  );
}
