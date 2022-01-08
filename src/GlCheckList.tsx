import { memo, useMemo, useReducer } from "react";
import CheckIcon from "@mui/icons-material/Check";
import { Text } from "./theme";
import { Markdown } from "./tools/Markdown";
import { makeStyles, breakpointsValues } from "./theme";
import { useIntersectionObserver } from "./tools/useIntersectionObserver";
import { motion } from "framer-motion";
import { useMergedClasses } from "tss-react";

export type GlCheckListProps = {
    className?: string;
    hasAnimation?: boolean;
    classes?: Partial<ReturnType<typeof useStyles>["classes"]>;
    heading?: string;
    subHeading?: string;
    elements?: {
        title?: string;
        description: string;
    }[];
};

export const GlCheckList = memo((props: GlCheckListProps) => {
    const { className, elements, heading, subHeading, hasAnimation } = props;

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
    });

    let { classes } = useStyles({
        "numberOfElements": elements === undefined ? 1 : elements.length,
    });

    classes = useMergedClasses(classes, props.classes);

    return (
        <section className={className}>
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
        classes?: Partial<ReturnType<typeof useStyles>["classes"]> & {
            checkIcon?: string;
            titleAndDescriptionWrapper?: string;
        };
    };

    const CheckListElement = memo((props: Props) => {
        const { description, title, className, classes: classesProp } = props;

        const { classes, cx } = useStyles();
        const mergedClasses = useMergedClasses(classes, classesProp);

        return (
            <div className={cx(mergedClasses.root, className)}>
                <div className={mergedClasses.checkIconWrapper}>
                    <CheckIcon
                        className={classesProp?.checkIcon}
                        color="success"
                    />
                </div>

                <div className={classesProp?.titleAndDescriptionWrapper}>
                    {title !== undefined && (
                        <Markdown className={mergedClasses.title}>
                            {title}
                        </Markdown>
                    )}
                    <Markdown className={mergedClasses.description}>
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
    }));

    return { CheckListElement };
})();
