import {
    isTouchDevice, MenuButton, MenuButtonBlockquote,
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
import {Stack, useTheme} from "@mui/material";
import {ForwardedRef, forwardRef, ReactNode, useState} from "react";
import useExtensions from "../../hooks/useExtensions.ts";
import {TextFields} from "@mui/icons-material";

type CustomRichTextEditorProps = {
    initialValue: string,
    extraButtons?: ReactNode
};

 const CustomRichTextEditor = forwardRef(function CustomRichTextEditor(props: Readonly<CustomRichTextEditorProps>, ref: ForwardedRef<RichTextEditorRef>) {
     const [showControls, setShowControls] = useState<boolean>(false);
     const theme = useTheme();
     const extensions = useExtensions();

    return (
        <RichTextEditor
            ref={ref}
            extensions={extensions}
            content={props.initialValue}
            RichTextFieldProps={{
                variant:"outlined",
                MenuBarProps: {
                    hide: !showControls
                },
                footer: (
                    <Stack
                        direction={"row"}
                        spacing={"2"}
                        alignContent={"center"}
                        alignItems={"center"}
                        justifyContent={"space-between"}
                        sx={{
                            borderTopStyle: "solid",
                            borderTopWidth: 1,
                            borderTopColor: (theme) => theme.palette.divider,
                            px: 1.5,
                            py: 1
                        }}
                    >
                        <MenuButton
                            value={'formatting'}
                            tooltipLabel={`${!showControls ? "Show" : "Hide"} formatting controls`}
                            size={'small'}
                            onClick={()=>setShowControls(!showControls)}
                            selected={showControls}
                            IconComponent={TextFields}
                        />
                        {props.extraButtons}
                    </Stack>

                )
            }}
            renderControls={() => (
                <MenuControlsContainer>
                    <MenuButtonBold />
                    <MenuButtonItalic />
                <MenuButtonUnderline />
                    <MenuButtonStrikethrough />
                    <MenuDivider />
                    <MenuSelectHeading />
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
                    <MenuButtonUndo />
                    <MenuButtonRedo />
                </MenuControlsContainer>
            )}
        />
    );
});

 export default CustomRichTextEditor;
