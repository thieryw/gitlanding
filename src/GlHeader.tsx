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
import { useMergedClasses } from "tss-react";

export type GlHeaderProps = {
    className?: string;
    classes?: Omit<Partial<ReturnType<typeof useStyles>["classes"]>, "root">;
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

    const mergedClasses = useMergedClasses(classes, classesProp);

    return (
        <header className={cx(classes.root, className)}>
            <div className={mergedClasses.title}>
                {typeof title === "string" ? (
                    <div className={mergedClasses.titleInner}>
                        <Text typo="subtitle">{title}</Text>
                    </div>
                ) : (
                    <div className={mergedClasses.titleInner}>
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

            <div className={mergedClasses.links}>
                {links.map(({ link, label }, index) => (
                    <div
                        ref={index === 0 ? linkRef : undefined}
                        className={mergedClasses.linkWrapper}
                        key={label}
                    >
                        <Link
                            underline="hover"
                            className={mergedClasses.link}
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
                    className={mergedClasses.githubStar}
                />
            )}

            {enableDarkModeSwitch !== undefined && enableDarkModeSwitch && (
                <GlDarkModeSwitch className={mergedClasses.darkModeSwitch} />
            )}

            <FormatListBulletedIcon
                ref={rootRef}
                onClick={unfoldLinks}
                className={mergedClasses.unfoldButton}
            />
        </header>
    );
});

const useStyles = makeStyles<{
    isMenuUnfolded: boolean;
    numberOfLinks: number;
    linkHeight: number;
}>({ "name": { GlHeader } })(
    (theme, { isMenuUnfolded, numberOfLinks, linkHeight }) => {
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
            "unfoldButton": {
                "cursor": "pointer",
                "marginLeft": theme.spacing(2),
                "display": (() => {
                    if (theme.windowInnerWidth >= breakpointsValues.md) {
                        return "none";
                    }

                    return "flex";
                })(),
            },
            "githubStar": {
                ...theme.spacing.rightLeft("margin", `${theme.spacing(2)}px`),
            },
            "darkModeSwitch": {
                ...theme.spacing.rightLeft("margin", `${theme.spacing(2)}px`),
            },

            "titleInner": {
                "display": "flex",
                "alignItems": "center",
            },
        };
    },
);
