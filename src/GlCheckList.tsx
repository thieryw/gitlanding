import { memo, useMemo, useReducer } from "react";
import CheckIcon from "@mui/icons-material/Check";
import { Text } from "./theme";
import { Markdown } from "./tools/Markdown";
import { makeStyles, breakpointsValues } from "./theme";
import { useIntersectionObserver } from "./tools/useIntersectionObserver";
import { motion } from "framer-motion";

export type GlCheckListProps = {
    className?: string;
    hasAnimation?: boolean;
    classes?: {
        headingWrapper?: string;
        heading?: string;
        subHeading?: string;
        elements?: string;
        element?: string;
        checkIconWrapper?: string;
        checkIcon?: string;
        elementTitleAndDescriptionWrapper?: string;
        elementTitle?: string;
        elementDescription?: string;
    };
    heading?: string;
    subHeading?: string;
    elements?: {
        title?: string;
        description: string;
    }[];
};

export const GlCheckList = memo((props: GlCheckListProps) => {
    const {
        className,
        elements,
        heading,
        subHeading,
        hasAnimation,
        classes: classesProp,
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
    }, []);

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
    }, []);

    const { ref } = useIntersectionObserver({
        "callback": ({ observer, entry }) => {
            if (hasAnimation === undefined || !hasAnimation) {
                observer.unobserve(entry.target);
                return;
            }

            if (container === undefined || listItem === undefined) {
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
                        "duration": 1,
                        "ease": "easeOut",
                    },
                };

                observer.unobserve(entry.target);
                forceUpdate();
            }
        },
        "threshold": 0.6,
    });

    const { classes, cx } = useStyles({
        "numberOfElements": elements === undefined ? 1 : elements.length,
    });

    return (
        <section className={cx(classes.root, className)}>
            {(heading !== undefined || subHeading !== undefined) && (
                <div
                    className={cx(
                        classes.headingWrapper,
                        classesProp?.headingWrapper,
                    )}
                >
                    {heading !== undefined && (
                        <Text
                            className={cx(
                                classes.heading,
                                classesProp?.heading,
                            )}
                            typo="section heading"
                        >
                            {heading}
                        </Text>
                    )}
                    {subHeading !== undefined && (
                        <Markdown
                            className={cx(
                                classes.subHeading,
                                classesProp?.subHeading,
                            )}
                        >
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
                className={cx(classes.elements, classesProp?.elements)}
            >
                {elements !== undefined &&
                    elements.map(elementProps => (
                        <motion.div variants={listItem}>
                            <CheckListElement
                                key={elementProps.description}
                                className={classesProp?.element}
                                classes={{
                                    "checkIcon": classesProp?.checkIcon,
                                    "checkIconWrapper":
                                        classesProp?.checkIconWrapper,
                                    "description":
                                        classesProp?.elementDescription,
                                    "title": classesProp?.elementTitle,
                                    "titleAndDescriptionWrapper":
                                        classesProp?.elementTitleAndDescriptionWrapper,
                                }}
                                {...elementProps}
                            />
                        </motion.div>
                    ))}
            </motion.div>
        </section>
    );
});

const useStyles = makeStyles<{ numberOfElements: number }>()(
    (theme, { numberOfElements }) => ({
        "root": {
            "display": "flex",
            "flexDirection": "column",
            "alignItems": "center",
        },
        "heading": {
            "fontSize": "2rem",
        },
        "headingWrapper": {
            "marginBottom": theme.spacing(6),
            "display": "flex",
            "flexDirection": "column",
            "alignItems": "center",
        },
        "elements": {
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
    }),
);

const { CheckListElement } = (() => {
    type Props = Required<GlCheckListProps>["elements"][number] & {
        className?: string;
        classes?: {
            checkIconWrapper?: string;
            checkIcon?: string;
            titleAndDescriptionWrapper?: string;
            title?: string;
            description?: string;
        };
    };

    const CheckListElement = memo((props: Props) => {
        const { description, title, className, classes: classesProp } = props;

        const { classes, cx } = useStyles();

        return (
            <div className={cx(classes.root, className)}>
                <div
                    className={cx(
                        classes.CheckIcon,
                        classesProp?.checkIconWrapper,
                    )}
                >
                    <CheckIcon
                        className={classesProp?.checkIcon}
                        color="success"
                    />
                </div>

                <div className={classesProp?.titleAndDescriptionWrapper}>
                    {title !== undefined && (
                        <Markdown
                            className={cx(classes.title, classesProp?.title)}
                        >
                            {title}
                        </Markdown>
                    )}
                    <Markdown
                        className={cx(
                            classes.description,
                            classesProp?.description,
                        )}
                    >
                        {description}
                    </Markdown>
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
        "CheckIcon": {
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
    }));

    return { CheckListElement };
})();
