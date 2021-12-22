import { CodeBlock, railscast } from "react-code-blocks";
import { memo } from "react";
import { makeStyles } from "./theme";

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
};

export const GlCodeBlock = memo((props: GlCodeBlockProps) => {
    const {
        className,
        language,
        showLineNumbers,
        text,
        hasDecorativeVsCodeButtons,
        hasShadow,
    } = props;

    const { classes, cx } = useStyles({
        "hasDecorativeVsCodeButtons": hasDecorativeVsCodeButtons ?? false,
        "hasShadow": hasShadow ?? false,
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

const useStyles = makeStyles<{
    hasDecorativeVsCodeButtons: boolean;
    hasShadow: boolean;
}>()((theme, { hasDecorativeVsCodeButtons, hasShadow }) => ({
    "root": {
        ...(hasDecorativeVsCodeButtons
            ? {
                  "position": "relative",
                  "paddingTop": 24,
                  "backgroundColor": colors.darkslategray,
              }
            : {}),
        "boxShadow": !hasShadow ? undefined : theme.customShadow,
    },
    "vsCodeButtons": {
        "position": "absolute",
        "top": 0,
        "left": 0,
    },
}));

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
