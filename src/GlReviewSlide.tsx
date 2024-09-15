import { tss } from "./tss";
import { Text } from "onyxia-ui/Text";
import { memo } from "react";
import { ThemedImage } from "onyxia-ui/ThemedImage";
import Paper from "@mui/material/Paper";
import { breakpointsValues } from "./theme";
import { Markdown } from "onyxia-ui/Markdown";

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
    className?: string;
    classes?: Partial<ReturnType<typeof useStyles>["classes"]>;
};

export const GlReviewSlide = memo((props: GlReviewSlideProps) => {
    const { descriptionMd, className, signature, logoUrl } = props;

    const { classes, cx } = useStyles({
        "classesOverrides": props.classes,
    });

    return (
        <Paper className={cx(classes.root, className)}>
            {logoUrl !== undefined && (
                <ThemedImage url={logoUrl} className={classes.logo} />
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

const useStyles = tss.withName({ GlReviewSlide }).create(({ theme }) => ({
    "root": {
        "display": "flex",
        "alignItems": "center",
        "justifyContent": "space-between",
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
