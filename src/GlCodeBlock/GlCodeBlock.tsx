import { memo, useState, useEffect } from "react";
import { makeStyles } from "../theme";
import { PrismAsyncLight as SyntaxHighLighter } from "react-syntax-highlighter";
import {
    atomDark as darkStyle,
    solarizedlight as lightStyle,
} from "react-syntax-highlighter/dist/esm/styles/prism";
import { useStateRef } from "powerhooks/useStateRef";
import CopyAllIcon from "@mui/icons-material/CopyAll";
import { Text } from "../theme";
import { useConstCallback } from "powerhooks/useConstCallback";
import { useDomRect } from "powerhooks/useDomRect";
import type { Language } from "./Language";

export type GlCodeBlockProps = {
    className?: string;
    text: string;
    language?: Language;
    showLineNumbers?: boolean;
    hasShadow?: boolean;
    classes?: Partial<ReturnType<typeof useStyles>["classes"]>;
    hasCopyButton?: boolean;
    copiedMessage?: string;
    hasBorderRadius?: boolean;
};

export const GlCodeBlock = memo((props: GlCodeBlockProps) => {
    const {
        text,
        className,
        hasShadow = true,
        language = "javascript",
        showLineNumbers = false,
        hasCopyButton = false,
        copiedMessage = "Copied !",
        hasBorderRadius = true,
    } = props;

    const ref = useStateRef<HTMLDivElement>(null);
    const [backgroundColor, setBackgroundColor] = useState<string | undefined>(
        undefined,
    );
    const [isCopiedMessageShowing, setIsCopiedMessageShowing] = useState(false);
    const [isMouseDown, setIsMouseDown] = useState(false);
    const {
        ref: copiedTextRef,
        domRect: { width: copiedTextWidth },
    } = useDomRect();

    const copyCode = useConstCallback(async () => {
        if (text === undefined) {
            return;
        }
        navigator.clipboard.writeText(text);
        setIsMouseDown(false);
        setIsCopiedMessageShowing(true);
        await new Promise<void>(resolve => setTimeout(resolve, 1000));
        setIsCopiedMessageShowing(false);
    });

    const onMouseDown = useConstCallback(() => {
        if (isMouseDown) {
            return;
        }

        setIsMouseDown(true);
    });

    const { classes, cx, theme } = useStyles(
        {
            hasShadow,
            backgroundColor,
            isCopiedMessageShowing,
            isMouseDown,
            hasBorderRadius,
            copiedTextWidth,
        },
        { props },
    );

    useEffect(() => {
        if (!ref.current?.firstElementChild) {
            return;
        }

        setBackgroundColor(
            window.getComputedStyle(ref.current.firstElementChild)
                .backgroundColor,
        );
    }, [ref.current, theme.isDarkModeEnabled]);

    return (
        <div ref={ref} className={cx(classes.root, className)}>
            <SyntaxHighLighter
                language={language}
                style={theme.isDarkModeEnabled ? darkStyle : lightStyle}
                showLineNumbers={showLineNumbers}
            >
                {text}
            </SyntaxHighLighter>
            {hasCopyButton ? (
                <div className={classes.copyWrapper}>
                    <Text
                        ref={copiedTextRef}
                        className={classes.copiedText}
                        typo="caption"
                    >
                        {copiedMessage}
                    </Text>
                    <CopyAllIcon
                        onMouseUp={copyCode}
                        onMouseDown={onMouseDown}
                        className={classes.copyButton}
                    />
                </div>
            ) : undefined}
        </div>
    );
});

const useStyles = makeStyles<{
    hasShadow: boolean;
    backgroundColor: string | undefined;
    isCopiedMessageShowing: boolean;
    isMouseDown: boolean;
    hasBorderRadius: boolean;
    copiedTextWidth: number;
}>()(
    (
        theme,
        {
            hasShadow,
            backgroundColor,
            isCopiedMessageShowing,
            isMouseDown,
            hasBorderRadius,
            copiedTextWidth,
        },
    ) => ({
        "root": {
            "display": "flex",
            "opacity": backgroundColor === undefined ? 0 : 1,
            backgroundColor,
            "borderRadius": hasBorderRadius ? theme.borderRadius : undefined,
            "boxShadow": hasShadow ? theme.customShadow : undefined,
            "overflow": "hidden",
        },
        "copyButton": {
            "fill": isMouseDown
                ? theme.colors.palette.focus.main
                : theme.colors.useCases.typography.textSecondary,
            "cursor": "pointer",
            ...(() => {
                const value = theme.spacing(2);
                return {
                    "marginTop": value,
                    "marginRight": value,
                };
            })(),
        },
        "copyWrapper": {
            "position": "relative",
        },
        "copiedText": {
            "transition": "opacity 200ms",
            "opacity": isCopiedMessageShowing ? 1 : 0,
            "position": "absolute",
            "backgroundColor": theme.colors.palette.focus.main,
            "padding": theme.spacing(2),
            "borderRadius": "30px",
            "whiteSpace": "nowrap",
            "top": theme.spacing(1),
            "left": -(copiedTextWidth + theme.spacing(2)),
            "color": theme.colors.palette.light.main,
            "pointerEvents": "none",
        },
    }),
);
