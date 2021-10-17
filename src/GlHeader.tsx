/* eslint-disable @typescript-eslint/no-namespace */
/* eslint-disable @typescript-eslint/no-explicit-any */
import Link from "@mui/material/Link";
import { useNamedState } from "powerhooks/useNamedState";
import { useConstCallback } from "powerhooks/useConstCallback";
import { memo } from "react";
import { makeStyles, Text } from "./theme";
import type { ReactNode } from "react";
import { GlGithubStarCount } from "./utils/GlGithubStarCount";
import type { GlGithubStarCountProps } from "./utils/GlGithubStarCount";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import { useClickAway } from "powerhooks";
import { breakpointsValues } from "./theme";
import { GlDarkModeSwitch } from "./utils/GlDarkModeSwitch";
import { useDomRect } from "powerhooks/useDomRect";

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
    showGithubStarCount?: GlGithubStarCountProps["showCount"];
    isCollapsible?: boolean;
};

const useStyles = makeStyles<{
    isMenuUnfolded: boolean;
    numberOfLinks: number;
    linkHeight: number;
}>()((theme, { isMenuUnfolded, numberOfLinks, linkHeight }) => {
    const linkMarginTopBottom = theme.spacing(3);

    return {
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
            ...theme.spacing.rightLeft(
                "padding",
                `${theme.paddingRightLeft}px`,
            ),
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
                    "height": (() => {
                        if (isMenuUnfolded) {
                            return (
                                (linkHeight + linkMarginTopBottom * 2) *
                                    numberOfLinks +
                                10
                            );
                        }
                        return 0;
                    })(),
                    "overflow": "hidden",
                    "flexWrap": "nowrap",
                    "marginTop": theme.spacing(2),
                } as const;
            })(),
        },
        "linkWrapper": {
            ...(theme.windowInnerWidth >= breakpointsValues.md
                ? {
                      ...(() => {
                          const value = theme.spacing(4);
                          return {
                              ...theme.spacing.rightLeft(
                                  "margin",
                                  `${value}px`,
                              ),
                          };
                      })(),
                  }
                : {
                      ...theme.spacing.topBottom(
                          "margin",
                          `${linkMarginTopBottom}px`,
                      ),
                  }),
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
    };
});

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
        showGithubStarCount,
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

    const {
        ref: linkRef,
        domRect: { height: linkHeight },
    } = useDomRect();

    const { classes, cx, theme } = useStyles({
        isMenuUnfolded,
        "numberOfLinks": links !== undefined ? links.length : 0,
        linkHeight,
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
                {links.map(({ link, label }, index) => (
                    <div
                        ref={index === 0 ? linkRef : undefined}
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
                    showCount={showGithubStarCount}
                    className={cx(
                        classes.githubStarAndDarkModeSwitch,
                        classesProp?.githubStar,
                    )}
                />
            )}

            {enableDarkModeSwitch !== undefined && enableDarkModeSwitch && (
                <GlDarkModeSwitch
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
