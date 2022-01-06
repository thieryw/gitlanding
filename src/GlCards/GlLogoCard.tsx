/* eslint-disable @typescript-eslint/no-namespace */
import { memo } from "react";
import { makeStyles, Text } from "../theme";
import { GlLogo } from "../utils/GlLogo";
import { GlCard } from "./GlCard";
import type { GlCardProps } from "./GlCard";
import { breakpointsValues } from "../theme";
import { GlButton } from "../utils/GlButton";
import { useMergedClasses } from "tss-react";

export type GlLogoCardProps = GlCardProps & {
    iconUrls?: string[];
    title?: string;
    paragraph?: string;
    buttonLabel?: string;
    overlapIcons?: boolean;
    classes?: Partial<ReturnType<typeof useStyles>["classes"]> & {
        button?: string;
    };
};

export const GlLogoCard = memo((props: GlLogoCardProps) => {
    const {
        className,
        iconUrls,
        paragraph,
        title,
        buttonLabel,
        overlapIcons,
        link,
    } = props;

    const { classes, cx, css } = useStyles({
        "numberOfIcons": iconUrls?.length ?? 0,
        "overlapIcons": overlapIcons ?? false,
    });

    const mergedClasses = useMergedClasses(classes, props.classes);

    return (
        <GlCard link={link} className={cx(mergedClasses.root, className)}>
            {iconUrls && (
                <div className={mergedClasses.iconWrapper}>
                    {iconUrls.map((url, index) => (
                        <GlLogo
                            className={cx(
                                mergedClasses.icon,
                                css({
                                    "zIndex": iconUrls.length - index,
                                }),
                            )}
                            logoUrl={url}
                            key={index}
                        />
                    ))}
                </div>
            )}

            <div className={mergedClasses.textWrapper}>
                {title !== undefined && (
                    <Text
                        typo="section heading"
                        className={mergedClasses.title}
                    >
                        {title}
                    </Text>
                )}
                {paragraph !== undefined && (
                    <Text typo="body 1" className={mergedClasses.paragraph}>
                        {paragraph}
                    </Text>
                )}
            </div>

            {buttonLabel !== undefined && (
                <GlButton
                    type="submit"
                    href={link?.href}
                    variant="secondary"
                    onClick={link?.onClick}
                    className={props.classes?.button}
                >
                    {buttonLabel}
                </GlButton>
            )}
        </GlCard>
    );
});

const useStyles = makeStyles<{
    numberOfIcons: number;
    overlapIcons: boolean;
}>()((theme, { numberOfIcons, overlapIcons }) => ({
    "root": {
        "padding": theme.spacing({
            "rightLeft": 3,
            "topBottom": 4,
        }),
        "boxShadow": theme.shadows[1],
        "display": "flex",
        "flexDirection": "column",
        "justifyContent": "space-between",
        "alignItems": "center",
        "margin": (() => {
            if (theme.windowInnerWidth >= breakpointsValues.lg) {
                return undefined;
            }

            return theme.spacing(1);
        })(),
    },
    "iconWrapper": {
        "marginRight": overlapIcons ? theme.spacing(3) + 5 : undefined,
        "display": "grid",
        "columnGap": theme.spacing(2),
        "gridTemplateColumns": (() => {
            if (overlapIcons) {
                return "repeat(auto-fit, minmax(10px, max-content))";
            }

            return `repeat(${numberOfIcons}, 1fr)`;
        })(),
        "width": (() => {
            if (!overlapIcons) {
                return undefined;
            }

            return numberOfIcons * 35;
        })(),
    },

    "icon": {
        ...(() => {
            const value = (() => {
                if (theme.windowInnerWidth >= breakpointsValues.lg) {
                    return 50;
                }

                return 40;
            })();

            return {
                "width": value,
                "fill": theme.colors.palette.focus.main,
                "& svg": {
                    "width": value,
                    "height": value,
                },
            };
        })(),
    },
    "title": {
        "marginTop": theme.spacing(4),
    },
    "paragraph": {
        "marginTop": theme.spacing(4),
    },
    "textWrapper": {
        "textAlign": "center",
        "marginBottom": theme.spacing(4),
    },
}));
