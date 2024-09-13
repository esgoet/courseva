import type { EditorOptions } from "@tiptap/core";
import StarterKit from "@tiptap/starter-kit";
import Highlight from "@tiptap/extension-highlight";
import TextAlign from "@tiptap/extension-text-align";
import TextStyle from "@tiptap/extension-text-style";
import Underline from "@tiptap/extension-underline";
import Color from "@tiptap/extension-color";
import { useMemo } from "react";

export default function useExtensions(): EditorOptions["extensions"] {
    return useMemo(() => {
        return [
            StarterKit, Highlight, TextAlign, TextStyle, Underline, Color
        ];
    }, []);
}
