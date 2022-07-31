import { memo, useState, useEffect } from "react";
import { makeStyles } from "../theme";
import SyntaxHighLighter from "react-syntax-highlighter/dist/esm/prism-async-light";
import { useStateRef } from "powerhooks/useStateRef";
import CopyAllIcon from "@mui/icons-material/CopyAll";
import { Text } from "../theme";
import { useConstCallback } from "powerhooks/useConstCallback";
import { useDomRect } from "powerhooks/useDomRect";
import type { Language } from "./Language";
import type { ThemeName } from "./ThemeName";
import type { Theme } from "./Theme";

export type GlCodeBlockProps = {
    className?: string;
    text: string;
    programingLanguage?: Language;
    showLineNumbers?: boolean;
    hasShadow?: boolean;
    classes?: Partial<ReturnType<typeof useStyles>["classes"]>;
    hasCopyButton?: boolean;
    copiedMessage?: string;
    hasBorderRadius?: boolean;
    darkTheme?: ThemeName;
    lightTheme?: ThemeName;
};

export const GlCodeBlock = memo((props: GlCodeBlockProps) => {
    const {
        text,
        className,
        hasShadow = true,
        programingLanguage: language = "typescript",
        showLineNumbers = false,
        hasCopyButton = false,
        copiedMessage = "Copied !",
        hasBorderRadius = true,
        darkTheme: darkThemeUserInput = "atom-dark",
        lightTheme: lightThemeUserInput = "solarizedlight",
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
    const [lightTheme, setLightTheme] = useState<undefined | Theme>();
    const [darkTheme, setDarkTheme] = useState<undefined | Theme>();

    useEffect(() => {
        [
            {
                "theme": darkThemeUserInput,
                "setTheme": setDarkTheme,
            },
            {
                "theme": lightThemeUserInput,
                "setTheme": setLightTheme,
            },
        ].forEach(async ({ theme, setTheme }) => {
            setTheme(
                (
                    await import(
                        `react-syntax-highlighter/dist/esm/styles/prism/${theme}`
                    )
                )["default"],
            );
        });
    }, [darkThemeUserInput, lightThemeUserInput]);

    useEffect(() => {
        if (!ref.current?.firstElementChild) {
            return;
        }

        setBackgroundColor(
            window.getComputedStyle(ref.current.firstElementChild)
                .backgroundColor,
        );
    }, [ref.current, theme.isDarkModeEnabled, darkTheme, lightTheme]);

    return (
        <div ref={ref} className={cx(classes.root, className)}>
            <SyntaxHighLighter
                language={language}
                showInlineLineNumbers={showLineNumbers}
                style={theme.isDarkModeEnabled ? darkTheme : lightTheme}
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
            "justifyContent": "space-between",
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
