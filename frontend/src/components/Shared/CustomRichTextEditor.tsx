import StarterKit from "@tiptap/starter-kit";
import Highlight from "@tiptap/extension-highlight";
import TextAlign from "@tiptap/extension-text-align";
import TextStyle from "@tiptap/extension-text-style";
import Underline from "@tiptap/extension-underline";
import Color from "@tiptap/extension-color";
import {
    isTouchDevice, MenuButtonBlockquote,
    MenuButtonBold,
    MenuButtonBulletedList, MenuButtonCode, MenuButtonCodeBlock,
    MenuButtonEditLink,
    MenuButtonHighlightColor, MenuButtonHorizontalRule,
    MenuButtonIndent,
    MenuButtonItalic,
    MenuButtonOrderedList, MenuButtonRedo,
    MenuButtonStrikethrough,
    MenuButtonTextColor,
    MenuButtonUnderline, MenuButtonUndo,
    MenuButtonUnindent,
    MenuControlsContainer,
    MenuDivider,
    MenuSelectHeading,
    MenuSelectTextAlign, RichTextEditor, type RichTextEditorRef
} from "mui-tiptap";
import {useTheme} from "@mui/material";
import {ForwardedRef, forwardRef} from "react";

type CustomRichTextEditorProps = {
    initialValue: string,
};

 const CustomRichTextEditor = forwardRef(function CustomRichTextEditor(props: Readonly<CustomRichTextEditorProps>, ref: ForwardedRef<RichTextEditorRef>) {
    const theme = useTheme();

    return (
        <RichTextEditor
            ref={ref}
            extensions={[StarterKit, Highlight, TextAlign, TextStyle, Underline, Color]}
            content={props.initialValue}
            renderControls={() => (
                <MenuControlsContainer>
                    <MenuSelectHeading />
                    <MenuDivider />
                    <MenuDivider />
                    <MenuButtonBold />
                    <MenuButtonItalic />
                    <MenuButtonUnderline />
                    <MenuButtonStrikethrough />
                    <MenuDivider />
                    <MenuButtonTextColor
                        defaultTextColor={theme.palette.text.primary}
                        swatchColors={[
                            { value: "#000000", label: "Black" },
                            { value: "#ffffff", label: "White" },
                            { value: "#888888", label: "Grey" },
                            { value: "#ff0000", label: "Red" },
                            { value: "#ff9900", label: "Orange" },
                            { value: "#ffff00", label: "Yellow" },
                            { value: "#00d000", label: "Green" },
                            { value: "#0000ff", label: "Blue" },
                        ]}
                    />
                    <MenuButtonHighlightColor
                        swatchColors={[
                            { value: "#595959", label: "Dark grey" },
                            { value: "#dddddd", label: "Light grey" },
                            { value: "#ffa6a6", label: "Light red" },
                            { value: "#ffd699", label: "Light orange" },
                            // Plain yellow matches the browser default `mark` like when using Cmd+Shift+H
                            { value: "#ffff00", label: "Yellow" },
                            { value: "#99cc99", label: "Light green" },
                            { value: "#90c6ff", label: "Light blue" },
                            { value: "#8085e9", label: "Light purple" },
                        ]}
                    />
                    <MenuDivider />
                    <MenuButtonEditLink />
                    <MenuDivider />
                    <MenuSelectTextAlign />
                    <MenuDivider />
                    <MenuButtonOrderedList />
                    <MenuButtonBulletedList />
                    {isTouchDevice() && (
                        <>
                            <MenuButtonIndent />
                            <MenuButtonUnindent />
                        </>
                    )}
                    <MenuDivider />
                    <MenuButtonBlockquote />
                    <MenuDivider />
                    <MenuButtonCode />
                    <MenuButtonCodeBlock />
                    <MenuDivider />
                    <MenuButtonHorizontalRule />
                    <MenuDivider />
                    <MenuDivider />
                    <MenuButtonUndo />
                    <MenuButtonRedo />
                </MenuControlsContainer>
            )}
        />
    );
});

 export default CustomRichTextEditor;
