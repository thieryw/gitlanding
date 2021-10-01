import { CodeBlock, railscast } from "react-code-blocks";
import { memo } from "react";
import { makeStyles } from "../theme";

const colors = {
    "tomatoRed": "#f85b52",
    "goldenRoad": "#e1bb2a",
    "limeGreen": "#54bd2b",
    "darkslategray": "#232323",
};

const useStyles = makeStyles<{
    hasDecorativeVsCodeButtons: boolean;
}>()((...[, { hasDecorativeVsCodeButtons }]) => ({
    "root": {
        ...(hasDecorativeVsCodeButtons
            ? {
                  "position": "relative",
                  "paddingTop": 24,
                  "backgroundColor": colors.darkslategray,
              }
            : {}),
    },
    "vsCodeButtons": {
        "position": "absolute",
        "top": 0,
        "left": 0,
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
                theme={railscast}
            />
        </div>
    );
});

const { VsCodeButtons } = (() => {
    const useStyles = makeStyles()(theme => ({
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

    return { VsCodeButtons };
})();
