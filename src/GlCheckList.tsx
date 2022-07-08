import { memo, useMemo, useReducer } from "react";
import MuiCheckIcon from "@mui/icons-material/Check";
import { Text } from "./theme";
import { Markdown } from "./tools/Markdown";
import { makeStyles, breakpointsValues } from "./theme";
import { useIntersectionObserver } from "./tools/useIntersectionObserver";
import { motion } from "framer-motion";
import { createIcon } from "onyxia-ui/Icon";
import type { MuiIconLike, SvgComponentLike } from "onyxia-ui/Icon";
import { useGuaranteedMemo } from "powerhooks/useGuaranteedMemo";

export type GlCheckListProps = {
    className?: string;
    hasAnimation?: boolean;
    classes?: Partial<ReturnType<typeof useStyles>["classes"]>;
    heading?: string;
    subHeading?: string;
    elements?: {
        title?: string;
        description?: string;
    }[];
    CheckIcon?: MuiIconLike | SvgComponentLike;
};

export const GlCheckList = memo((props: GlCheckListProps) => {
    const {
        className,
        elements,
        heading,
        subHeading,
        hasAnimation,
        CheckIcon = MuiCheckIcon,
    } = props;

    const [, forceUpdate] = useReducer(x => x + 1, 0);

    const container = useMemo(() => {
        if (hasAnimation === undefined || !hasAnimation) {
            return undefined;
        }
        return {
            "show": {},
            "hidden": { "opacity": 0 },
        };
    }, [hasAnimation]);

    const listItem = useMemo(() => {
        if (hasAnimation === undefined || !hasAnimation) {
            return undefined;
        }

        return {
            "hidden": {
                "opacity": 0,
                "y": -40,
            },
            "show": {},
        };
    }, [hasAnimation]);

    const { ref } = useIntersectionObserver(
        {
            "callback": ({ observer, entry }) => {
                if (hasAnimation === undefined || !hasAnimation) {
                    observer.unobserve(entry.target);
                    return;
                }

                if (container === undefined || listItem === undefined) {
                    observer.unobserve(entry.target);
                    return;
                }

                if (entry.isIntersecting) {
                    container.show = {
                        "transition": {
                            "staggerChildren": 0.2,
                        },
                        "opacity": 1,
                    };

                    listItem.show = {
                        "opacity": 1,
                        "y": 0,
                        "transition": {
                            "duration": 0.6,
                            "ease": "easeOut",
                        },
                    };

                    observer.unobserve(entry.target);
                    forceUpdate();
                }
            },
            "threshold": 0.4,
        },
        [],
    );

    const { classes, cx } = useStyles(
        {
            "numberOfElements": elements === undefined ? 1 : elements.length,
        },
        { props },
    );

    return (
        <section className={cx(classes.root, className)}>
            {(heading !== undefined || subHeading !== undefined) && (
                <div className={classes.headingWrapper}>
                    {heading !== undefined && (
                        <Text
                            className={classes.heading}
                            typo="section heading"
                        >
                            {heading}
                        </Text>
                    )}
                    {subHeading !== undefined && (
                        <Markdown className={classes.subHeading}>
                            {subHeading}
                        </Markdown>
                    )}
                </div>
            )}

            <motion.div
                ref={ref}
                variants={container}
                initial="hidden"
                animate="show"
                className={classes.elements}
            >
                {elements !== undefined &&
                    elements.map((elementProps, index) => (
                        <motion.div variants={listItem} key={index}>
                            <CheckListElement
                                className={classes.element}
                                classes={{
                                    "checkIcon": classes.checkIcon,
                                    "checkIconWrapper":
                                        classes.checkIconWrapper,
                                    "description": classes.elementDescription,
                                    "title": classes.elementTitle,
                                    "titleAndDescriptionWrapper":
                                        classes.elementTitleAndDescriptionWrapper,
                                }}
                                CheckIcon={CheckIcon}
                                {...elementProps}
                            />
                        </motion.div>
                    ))}
            </motion.div>
        </section>
    );
});

const useStyles = makeStyles<{ numberOfElements: number }>({
    "name": { GlCheckList },
})((theme, { numberOfElements }) => ({
    "root": {
        ...theme.spacing.rightLeft("padding", `${theme.paddingRightLeft}px`),
        ...theme.spacing.topBottom("margin", `${theme.spacing(7)}px`),
    },
    "heading": {
        ...(() => {
            const value = "2rem";
            return {
                "fontSize": value,
                "lineHeight": value,
            };
        })(),
    },
    "headingWrapper": {
        "marginBottom": theme.spacing(6),
        "display": "flex",
        "flexDirection": "column",
        "alignItems": "center",
    },
    "elements": {
        "justifyItems":
            theme.windowInnerWidth <= breakpointsValues.sm
                ? undefined
                : "center",
        "display": "grid",
        "gridTemplateColumns": `repeat(${(() => {
            if (theme.windowInnerWidth >= breakpointsValues.lg) {
                if (numberOfElements >= 3) {
                    return 3;
                }
                return numberOfElements;
            }

            if (theme.windowInnerWidth >= breakpointsValues.md) {
                if (numberOfElements >= 2) {
                    return 2;
                }

                return 1;
            }

            return 1;
        })()}, 1fr)`,
        "gap": theme.spacing(6),
    },
    "subHeading": {
        ...theme.typography.variants["body 1"].style,
        "color": theme.colors.useCases.typography.textSecondary,
    },
    "element": {},
    "checkIconWrapper": {},
    "checkIcon": {},
    "elementTitleAndDescriptionWrapper": {},
    "elementTitle": {},
    "elementDescription": {},
}));

const { CheckListElement } = (() => {
    type Props = Required<GlCheckListProps>["elements"][number] & {
        className?: string;
        classes?: Partial<ReturnType<typeof useStyles>["classes"]>;
        CheckIcon: MuiIconLike | SvgComponentLike;
    };

    const CheckListElement = memo((props: Props) => {
        const { description, title, className, CheckIcon } = props;

        const { classes, cx } = useStyles(undefined, { props });

        const { Icon } = useGuaranteedMemo(
            () => createIcon({ "check": CheckIcon }),
            [CheckIcon],
        );

        return (
            <div className={cx(classes.root, className)}>
                <div className={classes.checkIconWrapper}>
                    <Icon iconId="check" className={classes.checkIcon} />
                </div>

                <div className={classes.titleAndDescriptionWrapper}>
                    {title !== undefined && (
                        <Markdown className={classes.title}>{title}</Markdown>
                    )}
                    {description !== undefined && (
                        <Markdown className={classes.description}>
                            {description}
                        </Markdown>
                    )}
                </div>
            </div>
        );
    });

    const useStyles = makeStyles()(theme => ({
        "root": {
            "width":
                theme.windowInnerWidth >= breakpointsValues.sm
                    ? 300
                    : undefined,
            "display": "flex",
        },
        "checkIcon": {
            "color": theme.colors.useCases.alertSeverity.success.main,
        },
        "checkIconWrapper": {
            "paddingTop": theme.spacing(3.5),
            "marginRight": theme.spacing(3),
        },
        "description": {
            "color": theme.colors.useCases.typography.textSecondary,
            ...theme.typography.variants["body 1"].style,
        },
        "title": {
            ...theme.typography.variants["object heading"].style,
        },
        "titleAndDescriptionWrapper": {},
    }));

    return { CheckListElement };
})();
