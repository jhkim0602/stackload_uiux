'use client';

import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Placeholder from '@tiptap/extension-placeholder';
import { SlashCommand, renderItems, getSuggestionItems } from './SlashCommand';
import { cn } from '@/lib/utils';
import { Bold, Italic, Strikethrough, Code, List, ListOrdered } from 'lucide-react';

interface TiptapEditorProps {
  content: string;
  onChange: (html: string) => void;
  placeholder?: string;
  className?: string;
}

export function TiptapEditor({ content, onChange, placeholder = "Type '/' for commands...", className }: TiptapEditorProps) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        bulletList: {
          keepMarks: true,
          keepAttributes: false,
        },
        orderedList: {
          keepMarks: true,
          keepAttributes: false,
        },
      }),
      Placeholder.configure({
        placeholder: ({ node }) => {
            if (node.type.name === 'heading') {
                return 'Heading...';
            }
            return placeholder;
        },
      }),
      SlashCommand.configure({
        suggestion: {
          items: getSuggestionItems,
          render: renderItems,
        },
      }),
    ],
    content: content,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    editorProps: {
        attributes: {
            class: 'prose prose-base max-w-none focus:outline-none min-h-[300px] prose-headings:font-black prose-p:font-medium text-base-700 prose-strong:text-base-900 prose-blockquote:border-l-4 prose-blockquote:border-accent-500 prose-blockquote:bg-base-50 prose-blockquote:py-1 prose-blockquote:px-4 prose-blockquote:not-italic prose-blockquote:rounded-r-lg',
        }
    },
    immediatelyRender: false,
  });

  if (!editor) {
    return null;
  }

  return (
    <div className={cn("relative group", className)}>
       {/* Simple Floating Menu (Optional: Visible on Selection, but keeping minimal for now) */}
       {editor && (
           <div className="sticky top-0 z-20 bg-white/80 backdrop-blur-md border border-base-200 rounded-xl px-2 py-1.5 mb-2 flex items-center gap-1 w-fit transition-opacity opacity-0 group-hover:opacity-100 ring-4 ring-base-50/50">
                <button
                    onClick={() => editor.chain().focus().toggleBold().run()}
                    className={cn(
                        "p-1.5 rounded-md text-base-500 hover:bg-base-50 hover:text-base-900 transition-colors",
                         editor.isActive('bold') ? 'bg-base-100 text-base-900' : ''
                    )}
                >
                    <Bold className="w-4 h-4" />
                </button>
                <button
                    onClick={() => editor.chain().focus().toggleItalic().run()}
                     className={cn(
                        "p-1.5 rounded-md text-base-500 hover:bg-base-50 hover:text-base-900 transition-colors",
                         editor.isActive('italic') ? 'bg-base-100 text-base-900' : ''
                    )}
                >
                    <Italic className="w-4 h-4" />
                </button>
                <button
                    onClick={() => editor.chain().focus().toggleStrike().run()}
                     className={cn(
                        "p-1.5 rounded-md text-base-500 hover:bg-base-50 hover:text-base-900 transition-colors",
                         editor.isActive('strike') ? 'bg-base-100 text-base-900' : ''
                    )}
                >
                    <Strikethrough className="w-4 h-4" />
                </button>
                <div className="w-px h-4 bg-base-200 mx-1" />
                <button
                    onClick={() => editor.chain().focus().toggleCode().run()}
                     className={cn(
                        "p-1.5 rounded-md text-base-500 hover:bg-base-50 hover:text-base-900 transition-colors",
                         editor.isActive('code') ? 'bg-base-100 text-base-900' : ''
                    )}
                >
                    <Code className="w-4 h-4" />
                </button>
                <button
                    onClick={() => editor.chain().focus().toggleBulletList().run()}
                     className={cn(
                        "p-1.5 rounded-md text-base-500 hover:bg-base-50 hover:text-base-900 transition-colors",
                         editor.isActive('bulletList') ? 'bg-base-100 text-base-900' : ''
                    )}
                >
                    <List className="w-4 h-4" />
                </button>
                 <button
                    onClick={() => editor.chain().focus().toggleOrderedList().run()}
                     className={cn(
                        "p-1.5 rounded-md text-base-500 hover:bg-base-50 hover:text-base-900 transition-colors",
                         editor.isActive('orderedList') ? 'bg-base-100 text-base-900' : ''
                    )}
                >
                    <ListOrdered className="w-4 h-4" />
                </button>
           </div>
       )}

      <EditorContent editor={editor} className="min-h-[300px]" />

      {/* Placeholder Styles */}
      <style jsx global>{`
        .ProseMirror p.is-editor-empty:first-child::before {
          content: attr(data-placeholder);
          float: left;
          color: #94a3b8;
          pointer-events: none;
          height: 0;
        }
        .ProseMirror p.is-empty::before {
            color: #94a3b8;
            content: attr(data-placeholder);
            float: left;
            height: 0;
            pointer-events: none;
        }
      `}</style>
    </div>
  );
}
