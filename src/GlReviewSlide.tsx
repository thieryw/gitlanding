import { makeStyles, Text } from "./theme";
import { memo } from "react";
import { GlLogo } from "./utils/GlLogo";
import Paper from "@mui/material/Paper";
import { breakpointsValues } from "./theme";
import { Markdown } from "./tools/Markdown";
import { useMergedClasses } from "tss-react";

export type GlReviewSlideProps = {
    /**
     * you can use markdown between back ticks.
     */
    descriptionMd?: string;
    signature?: string;
    /**
     * If you use an svg image that does not have a fill,
     * the fill will be set to the current font color,
     * depending on the dark mode being active.
     */
    logoUrl?: string;
    logoFill?: string;
    className?: string;
    classes?: Partial<ReturnType<typeof useStyles>["classes"]>;
};

export const GlReviewSlide = memo((props: GlReviewSlideProps) => {
    const { descriptionMd, className, signature, logoUrl, logoFill } = props;

    let { classes, cx } = useStyles();
    classes = useMergedClasses(classes, props.classes);

    return (
        <Paper className={cx(classes.root, className)}>
            {logoUrl !== undefined && (
                <GlLogo
                    fill={logoFill}
                    logoUrl={logoUrl}
                    className={classes.logo}
                />
            )}
            <div>
                {descriptionMd !== undefined && (
                    <Markdown className={classes.paragraph}>
                        {descriptionMd}
                    </Markdown>
                )}
                {signature !== undefined && (
                    <Text typo="body 2" className={classes.signature}>
                        {signature}
                    </Text>
                )}
            </div>
        </Paper>
    );
});

const useStyles = makeStyles({ "name": { GlReviewSlide } })(theme => ({
    "root": {
        "display": "flex",
        "alignItems": "center",
        "justifyContent": "space-between",
        "position": "relative",
        "flexDirection": (() => {
            if (theme.windowInnerWidth >= breakpointsValues.md) {
                return "row";
            }

            return "column";
        })(),
    },
    "paragraph": {
        ...theme.typography.variants["body 1"].style,
        "textAlign": (() => {
            if (theme.windowInnerWidth >= breakpointsValues.md) {
                return undefined;
            }

            return "center";
        })(),
        "margin": (() => {
            if (theme.windowInnerWidth >= breakpointsValues.sm) {
                return theme.spacing(5);
            }

            return theme.spacing({
                "topBottom": 1,
                "rightLeft": 5,
            });
        })(),
    },
    "signature": {
        "fontStyle": "italic",
        ...theme.spacing.rightLeft("margin", `${theme.spacing(5)}px`),
        "marginBottom": theme.spacing(5),
        "textAlign": (() => {
            if (theme.windowInnerWidth >= breakpointsValues.md) {
                return "right";
            }

            return "center";
        })(),
    },
    "logo": {
        "width": 70,
        "& svg": {
            "width": 70,
            "height": 70,
        },
        ...(() => {
            if (theme.windowInnerWidth >= breakpointsValues.md) {
                return {
                    "marginLeft": theme.spacing(5),
                };
            }

            return {
                "marginLeft": 0,
                "marginTop": theme.spacing(5),
            };
        })(),
    },
}));
