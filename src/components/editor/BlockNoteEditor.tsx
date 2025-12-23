'use client';

import "@blocknote/core/fonts/inter.css";
import { useCreateBlockNote } from "@blocknote/react";
import { BlockNoteView } from "@blocknote/mantine";
import "@blocknote/mantine/style.css";
import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";

interface BlockNoteEditorProps {
    onChange: (html: string) => void;
    initialContent?: string; // HTML string
    editable?: boolean;
    className?: string;
}

export default function BlockNoteEditor({ onChange, initialContent, editable = true, className }: BlockNoteEditorProps) {
    const [blocks, setBlocks] = useState<any[]>([]);

    // Create the editor instance
    const editor = useCreateBlockNote({
        initialContent: initialContent ? async (editor) => {
             // Try to convert HTML to blocks if provided
             // For simplicity in this version, we might just start empty or use partial blocks
             // BlockNote's HTML parsing is robust
             return editor.tryParseHTMLToBlocks(initialContent);
        } : undefined,
    });

    // Handle changes
    const handleChange = async () => {
        // Convert blocks to HTML for easy storage/compatibility with existing backend logic
        const html = await editor.blocksToHTMLLossy(editor.document);
        onChange(html);
        setBlocks(editor.document);
    };

    // Custom Theme or overrides can be applied here
    // Currently using the default BlockNote theme which is clean and Notion-like
    // We add a wrapper for some Tailwind specific overrides if needed

    return (
        <div className={cn("blocknote-wrapper", className)}>
            <BlockNoteView
                editor={editor}
                onChange={handleChange}
                editable={editable}
                theme="light" // Force light theme for consistency with design system for now
                formattingToolbar={true}
                linkToolbar={true}
                sideMenu={true}
                slashMenu={true}
            />
            <style jsx global>{`
                .bn-editor {
                    padding-left: 0 !important;
                    padding-right: 0 !important;
                }
                .bn-block-content {
                    font-family: 'Inter', sans-serif;
                }
                /* Syntro Color Overrides for Selection/Highlights if needed */
                ::selection {
                    background-color: #e0e7ff; /* accent-100 */
                    color: #1e1b4b; /* accent-900 */
                }
            `}</style>
        </div>
    );
}
