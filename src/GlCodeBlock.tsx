import { CodeBlock, railscast } from "react-code-blocks";
import { memo, useState } from "react";
import { makeStyles } from "./theme";
import { useConstCallback } from "powerhooks/useConstCallback";
import CopyAllIcon from "@mui/icons-material/CopyAll";
import { Text } from "./theme";

const colors = {
    "tomatoRed": "#f85b52",
    "goldenRoad": "#e1bb2a",
    "limeGreen": "#54bd2b",
    "darkslategray": "#232323",
};

export type GlCodeBlockProps = {
    className?: string;
    text?: string;
    language?: string;
    showLineNumbers?: boolean;
    hasDecorativeVsCodeButtons?: boolean;
    hasShadow?: boolean;
    classes?: Partial<ReturnType<typeof useStyles>["classes"]>;
    isCopyBlock?: boolean;
    copiedToClipboardMessage?: string;
};

export const GlCodeBlock = memo((props: GlCodeBlockProps) => {
    const {
        className,
        language,
        showLineNumbers,
        text,
        hasDecorativeVsCodeButtons,
        hasShadow,
        isCopyBlock,
        copiedToClipboardMessage,
    } = props;

    const [isMouseDown, setIsMouseDown] = useState(false);
    const [isCopiedMessageShowing, setIsCopiedMessageShowing] = useState(false);

    const copyCode = useConstCallback(() => {
        if (text === undefined) {
            return;
        }
        navigator.clipboard.writeText(text);
        setIsMouseDown(false);
        if (isCopiedMessageShowing) {
            return;
        }
        setIsCopiedMessageShowing(true);
        setTimeout(() => {
            setIsCopiedMessageShowing(false);
        }, 2000);
    });

    const onMouseDown = useConstCallback(() => {
        if (isMouseDown) {
            return;
        }

        setIsMouseDown(true);
    });

    const { classes, cx } = useStyles(
        {
            "hasDecorativeVsCodeButtons": hasDecorativeVsCodeButtons ?? false,
            "hasShadow": hasShadow ?? true,
            isMouseDown,
            isCopiedMessageShowing,
        },
        { props },
    );

    return (
        <div className={cx(classes.root, className)}>
            <div className={classes.heading}>
                {hasDecorativeVsCodeButtons !== undefined &&
                    hasDecorativeVsCodeButtons && (
                        <VsCodeButtons className={classes.vsCodeButtons} />
                    )}
                {isCopyBlock !== undefined && isCopyBlock && (
                    <div
                        className={classes.copyButtonWrapper}
                        onMouseUp={copyCode}
                        onMouseDown={onMouseDown}
                    >
                        <CopyAllIcon className={classes.copyButtonIcon} />
                    </div>
                )}
            </div>

            <CodeBlock
                language={language}
                showLineNumbers={showLineNumbers}
                text={text}
                theme={railscast}
            />
            <Text className={classes.copiedTextMessage} typo="caption">
                {copiedToClipboardMessage !== undefined
                    ? copiedToClipboardMessage
                    : "Copied to clipboard"}
            </Text>
        </div>
    );
});

const useStyles = makeStyles<{
    hasDecorativeVsCodeButtons: boolean;
    isCopiedMessageShowing: boolean;
    hasShadow: boolean;
    isMouseDown: boolean;
}>()(
    (
        theme,
        {
            hasDecorativeVsCodeButtons,
            hasShadow,
            isMouseDown,
            isCopiedMessageShowing,
        },
    ) => ({
        "root": {
            ...(hasDecorativeVsCodeButtons
                ? {
                      "backgroundColor": colors.darkslategray,
                  }
                : {}),
            "boxShadow": !hasShadow ? undefined : theme.customShadow,
        },
        "heading": {
            "display": "flex",
            "justifyContent": "space-between",
        },
        "vsCodeButtons": {},
        "copyButtonWrapper": {
            "cursor": "pointer",
            ...(() => {
                const value = theme.spacing(1);
                return {
                    "paddingTop": value,
                    "paddingRight": value,
                };
            })(),
        },
        "copyButtonIcon": {
            "fill": isMouseDown
                ? theme.colors.palette.focus.light
                : theme.colors.palette.light.greyVariant1,
        },
        "copiedTextMessage": {
            "transition": "opacity 200ms",
            "opacity": isCopiedMessageShowing ? 1 : 0,
            "pointerEvents": "none",
            "paddingBottom": theme.spacing(1),
            "paddingRight": theme.spacing(2),
            "textAlign": "right",
        },
    }),
);

const { VsCodeButtons } = (() => {
    type VsCodeButtonsProps = {
        className?: string;
    };

    const VsCodeButtons = memo((props: VsCodeButtonsProps) => {
        const { className } = props;

        const { classes, cx, css } = useStyles();
        return (
            <div className={cx(classes.root, className)}>
                <div className={cx(classes.buttons)}>
                    {[
                        colors.tomatoRed,
                        colors.goldenRoad,
                        colors.limeGreen,
                    ].map(color => {
                        return (
                            <div
                                className={cx(
                                    classes.icon,
                                    css({
                                        "backgroundColor": color,
                                    }),
                                )}
                                key={color}
                            ></div>
                        );
                    })}
                </div>
            </div>
        );
    });

    const useStyles = makeStyles({ "name": { GlCodeBlock } })(theme => ({
        "root": {
            "width": "100%",
            "height": 24,
        },
        "buttons": {
            "display": "flex",
            "gap": theme.spacing(1),
            ...(() => {
                const value = theme.spacing(2);
                return {
                    "marginTop": value,
                    "marginLeft": value,
                };
            })(),
        },
        "icon": {
            ...(() => {
                const value = 14;
                return {
                    "width": value,
                    "height": value,
                };
            })(),
            "borderRadius": "50%",
        },
    }));

    return { VsCodeButtons };
})();
