import { CodeBlock, dracula } from "react-code-blocks";
import { memo } from "react";
import { makeStyles } from "../theme";

const colors = {
    "tomatoRed": "#f85b52",
    "goldenRoad": "#e1bb2a",
    "limeGreen": "#54bd2b",
    "darkslategray": "#282a36",
};

const useStyles = makeStyles<{
    hasDecorativeVsCodeButtons: boolean;
}>()((theme, { hasDecorativeVsCodeButtons }) => ({
    "root": {
        ...(hasDecorativeVsCodeButtons
            ? {
                  "position": "relative",
                  "borderTop": `solid ${colors.darkslategray} 24px`,
                  "borderRadius": 3,
              }
            : {}),
    },
    "vsCodeButtons": {
        "position": "absolute",
        "top": -theme.spacing(3),
        "left": theme.spacing(2),
    },
}));

export type GlCodeProps = {
    className?: string;
    text?: string;
    language?: string;
    showLineNumbers?: boolean;
    hasDecorativeVsCodeButtons?: boolean;
};

export const GlCode = memo((props: GlCodeProps) => {
    const {
        className,
        language,
        showLineNumbers,
        text,
        hasDecorativeVsCodeButtons,
    } = props;

    const { classes, cx } = useStyles({
        "hasDecorativeVsCodeButtons": hasDecorativeVsCodeButtons ?? false,
    });

    return (
        <div className={cx(classes.root, className)}>
            {hasDecorativeVsCodeButtons !== undefined &&
                hasDecorativeVsCodeButtons && (
                    <VsCodeButtons className={classes.vsCodeButtons} />
                )}
            <CodeBlock
                language={language}
                showLineNumbers={showLineNumbers}
                text={text}
                theme={dracula}
            />
        </div>
    );
});

const { VsCodeButtons } = (() => {
    const useStyles = makeStyles()(theme => ({
        "root": {
            "display": "flex",
            "gap": theme.spacing(1),
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

    type VsCodeButtonsProps = {
        className?: string;
    };

    const VsCodeButtons = memo((props: VsCodeButtonsProps) => {
        const { className } = props;

        const { classes, cx, css } = useStyles();
        return (
            <div className={cx(classes.root, className)}>
                {[colors.tomatoRed, colors.goldenRoad, colors.limeGreen].map(
                    color => {
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
                    },
                )}
            </div>
        );
    });

    return { VsCodeButtons };
})();
