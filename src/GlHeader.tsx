/* eslint-disable @typescript-eslint/no-namespace */
/* eslint-disable @typescript-eslint/no-explicit-any */
import Link from "@material-ui/core/Link";
import { useNamedState } from "powerhooks/useNamedState";
import { useConstCallback } from "powerhooks/useConstCallback";
import { memo } from "react";
import { makeStyles, Text } from "./theme";
import type { ReactNode } from "react";
import { GlGithubStarCount } from "./utils/GlGithubStarCount";
import type { GlGithubStarCountProps } from "./utils/GlGithubStarCount";
import FormatListBulletedIcon from "@material-ui/icons/FormatListBulleted";
import { useClickAway } from "powerhooks";
import { breakpointsValues } from "./theme";
import { DarkModeSwitch } from "onyxia-ui/DarkModeSwitch";

export type GlHeaderProps = {
    className?: string;
    classes?: {
        title?: string;
        titleInner?: string;
        links?: string;
        linkWrapper?: string;
        link?: string;
        githubStar?: string;
        darkModeSwitch?: string;
        unfoldButton?: string;
    };
    title: ReactNode;
    titleDark?: ReactNode;
    titleSmallScreen?: ReactNode;
    titleSmallScreenDark?: ReactNode;
    links: {
        label: string;
        link: {
            href: string;
            onClick?(): void;
        };
    }[];
    enableDarkModeSwitch?: boolean;
    githubRepoUrl?: GlGithubStarCountProps["repoUrl"];
    githubButtonSize?: GlGithubStarCountProps["size"];
    isCollapsible?: boolean;
};

const useStyles = makeStyles<{
    isMenuUnfolded: boolean;
    numberOfLinks: number;
}>()((theme, { isMenuUnfolded, numberOfLinks }) => ({
    "root": {
        "display": "flex",
        "alignItems": "center",
        "width": "100%",
        "flexWrap": (() => {
            if (theme.windowInnerWidth >= breakpointsValues.md) {
                return undefined;
            }

            return "wrap";
        })(),
        ...theme.spacing.rightLeft("padding", `${theme.paddingRightLeft}px`),
    },
    "title": {
        "display": "flex",
        "flex": 1,
        "marginRight": theme.spacing(2),
    },
    "links": {
        "display": "flex",
        "transition": "height 300ms",
        ...(() => {
            if (theme.windowInnerWidth >= breakpointsValues.md) {
                return {
                    "flexWrap": "wrap",
                } as const;
            }

            return {
                "order": 123,
                "flex": "100%",
                "flexDirection": "column",
                "gap": theme.spacing(2),
                "height": isMenuUnfolded
                    ? (21 + theme.spacing(2)) * numberOfLinks
                    : 0,
                "overflow": "hidden",
                "flexWrap": "nowrap",
                "marginTop": theme.spacing(2),
            } as const;
        })(),
    },
    "linkWrapper": {
        ...(() => {
            const leftRight = theme.spacing(4);
            const topBottom = theme.spacing(1);
            return {
                "marginRight": leftRight,
                "marginTop": topBottom,
                "marginBottom": topBottom,
                "marginLeft": (() => {
                    if (theme.windowInnerWidth >= breakpointsValues.md) {
                        return leftRight;
                    }

                    return 0;
                })(),
            };
        })(),
    },

    "link": {
        "color": theme.colors.useCases.typography.textPrimary,
        "whiteSpace": "nowrap",
        ...theme.typography.variants["body 1"].style,
    },
    "unfoldIcon": {
        "cursor": "pointer",
        "marginLeft": theme.spacing(2),
        "display": (() => {
            if (theme.windowInnerWidth >= breakpointsValues.md) {
                return "none";
            }

            return "flex";
        })(),
    },
    "githubStarAndDarkModeSwitch": {
        "margin": theme.spacing({
            "topBottom": 0,
            "rightLeft": 2,
        }),
    },
    "titleInner": {
        "display": "flex",
        "alignItems": "center",
    },
}));

export const GlHeader = memo((props: GlHeaderProps) => {
    const {
        className,
        title,
        links,
        enableDarkModeSwitch,
        githubButtonSize,
        githubRepoUrl,
        titleDark,
        titleSmallScreen,
        titleSmallScreenDark,
        classes: classesProp,
    } = props;

    const { isMenuUnfolded, setIsMenuUnfolded } = useNamedState(
        "isMenuUnfolded",
        false,
    );

    const unfoldLinks = useConstCallback(() => {
        setIsMenuUnfolded(!isMenuUnfolded);
    });

    const { rootRef } = useClickAway(() => {
        setIsMenuUnfolded(false);
    });

    const { classes, cx, theme } = useStyles({
        isMenuUnfolded,
        "numberOfLinks": links !== undefined ? links.length : 0,
    });

    return (
        <header className={cx(classes.root, className)}>
            <div className={cx(classes.title, classesProp?.title)}>
                {typeof title === "string" ? (
                    <div
                        className={cx(
                            classes.titleInner,
                            classesProp?.titleInner,
                        )}
                    >
                        <Text typo="subtitle">{title}</Text>
                    </div>
                ) : (
                    <div
                        className={cx(
                            classes.titleInner,
                            classesProp?.titleInner,
                        )}
                    >
                        {((): ReactNode => {
                            if (
                                theme.windowInnerWidth >= breakpointsValues.md
                            ) {
                                if (theme.isDarkModeEnabled) {
                                    return titleDark ?? title;
                                }
                                return title;
                            }

                            if (theme.isDarkModeEnabled) {
                                return (
                                    titleSmallScreenDark ??
                                    titleSmallScreen ??
                                    title
                                );
                            }
                            return titleSmallScreen ?? title;
                        })()}
                    </div>
                )}
            </div>

            <div className={cx(classes.links, classesProp?.links)}>
                {links.map(({ link, label }) => (
                    <div
                        className={cx(
                            classes.linkWrapper,
                            classesProp?.linkWrapper,
                        )}
                        key={label}
                    >
                        <Link
                            underline="hover"
                            className={cx(classes.link, classesProp?.link)}
                            {...link}
                        >
                            {label}
                        </Link>
                    </div>
                ))}
            </div>

            {githubRepoUrl !== undefined && (
                <GlGithubStarCount
                    repoUrl={githubRepoUrl}
                    size={githubButtonSize}
                    className={cx(
                        classes.githubStarAndDarkModeSwitch,
                        classesProp?.githubStar,
                    )}
                />
            )}

            {enableDarkModeSwitch !== undefined && enableDarkModeSwitch && (
                <DarkModeSwitch
                    className={cx(
                        classes.githubStarAndDarkModeSwitch,
                        classesProp?.darkModeSwitch,
                    )}
                />
            )}

            <FormatListBulletedIcon
                ref={rootRef}
                onClick={unfoldLinks}
                className={cx(classes.unfoldIcon, classesProp?.unfoldButton)}
            />
        </header>
    );
});
