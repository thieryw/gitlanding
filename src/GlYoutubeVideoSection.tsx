import { memo, useMemo, useReducer } from "react";
import { Text, breakpointsValues, makeStyles, Button } from "./theme";
import { useDomRect } from "powerhooks/useDomRect";
import { motion } from "framer-motion";
import { useIntersectionObserver } from "./tools/useIntersectionObserver";

export type GlYoutubeVideoSectionProps = {
    className?: string;
    title?: string;
    classes?: {
        title: string;
        iframe?: string;
        button?: string;
    };
    src?: string;
    width?: string | number;
    height?: string | number;
    link?: {
        href: string;
        onClick?: () => void;
    };
    buttonLabel?: string;
    hasAnimation?: boolean;
};

export const GlYoutubeVideoSection = memo(
    (props: GlYoutubeVideoSectionProps) => {
        const {
            className,
            link,
            src,
            title,
            width,
            height,
            buttonLabel,
            classes: classesProp,
            hasAnimation,
        } = props;

        const [, forceUpdate] = useReducer(x => x + 1, 0);

        const {
            domRect: { width: iframeWidth },
            ref: iframeRef,
        } = useDomRect();

        const animationProps = useMemo(() => {
            if (
                hasAnimation === undefined ||
                !hasAnimation ||
                src === undefined
            ) {
                return undefined;
            }

            return {
                "initial": {
                    "opacity": 0,
                    "scale": 0.4,
                },
                "animate": {},
                "transition": {
                    "duration": 1,
                    "ease": "easeOut",
                },
            };
        }, []);

        const { ref } = useIntersectionObserver({
            "callback": ({ entry, observer }) => {
                if (
                    hasAnimation === undefined ||
                    !hasAnimation ||
                    animationProps === undefined
                ) {
                    observer.unobserve(entry.target);
                    return;
                }

                if (entry.isIntersecting) {
                    animationProps.animate = {
                        "scale": 1,
                        "opacity": 1,
                    };
                    observer.unobserve(entry.target);
                    forceUpdate();
                }
            },
            "threshold": 0.5,
        });

        const { classes, cx } = useStyles({
            width,
            height,
            "currentWidth": iframeWidth,
        });

        return (
            <section ref={ref} className={cx(classes.root, className)}>
                {title !== undefined && (
                    <Text className={classesProp?.title} typo="page heading">
                        {title}
                    </Text>
                )}
                {src !== undefined && (
                    <motion.iframe
                        {...animationProps}
                        ref={iframeRef}
                        className={cx(classes.iframe, classesProp?.iframe)}
                        src={src}
                        title="YouTube video player"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                    />
                )}

                {buttonLabel !== undefined && (
                    <Button
                        onClick={link?.onClick}
                        className={classesProp?.button}
                        href={link?.href}
                        type="submit"
                        variant="secondary"
                    >
                        {buttonLabel}
                    </Button>
                )}
            </section>
        );
    },
);

const useStyles = makeStyles<{
    width: string | number | undefined;
    height: string | number | undefined;
    currentWidth: number;
}>()((theme, { height, width, currentWidth }) => ({
    "root": {
        "display": "flex",
        "flexDirection": "column",
        "alignItems": "center",
    },
    "iframe": {
        "border": "none",
        ...theme.spacing.topBottom("margin", `${theme.spacing(7)}px`),
        "boxShadow": theme.customShadow,
        "width":
            width ??
            (() => {
                if (theme.windowInnerWidth >= breakpointsValues.md) {
                    return 700;
                }

                if (theme.windowInnerWidth >= breakpointsValues.sm) {
                    return "70%";
                }

                return "100%";
            })(),
        "height":
            height ??
            (() => {
                if (theme.windowInnerWidth >= breakpointsValues.md) {
                    return 7 * 60;
                }

                return (currentWidth / 100) * 60;
            })(),
    },
}));
