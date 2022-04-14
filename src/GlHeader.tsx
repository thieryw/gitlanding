import { memo, useState, useEffect, useRef } from "react";
import type { ReactNode } from "react";
import { makeStyles } from "./theme";
import { Text } from "./theme";
import { breakpointsValues } from "./theme";
import UnfoldIcon from "@mui/icons-material/FormatLineSpacing";
import { useDomRect } from "powerhooks/useDomRect";
import { useConstCallback } from "powerhooks/useConstCallback";
import { useClickAway } from "powerhooks/useClickAway";
import { GlDarkModeSwitch } from "./utils/GlDarkModeSwitch";
import { Evt } from "evt";
import { useElementEvt } from "evt/hooks/useElementEvt";
import { GlGithubStarCount } from "./utils/GlGithubStarCount";
import { getScrollableParent } from "./tools/getScrollableParent";
import { symToStr } from "tsafe/symToStr";

export type GlHeaderProps = {
    links: {
        label: string;
        href: string;
        onClick?: () => void;
    }[];
    title?: ReactNode;
    titleDark?: ReactNode;
    titleSmallScreen?: ReactNode;
    titleSmallScreenDark?: ReactNode;
    className?: string;
    classes?: Partial<ReturnType<typeof useStyles>["classes"]>;
    enableDarkModeSwitch?: boolean;
    githubRepoUrl?: string;
    githubButtonSize?: "normal" | "large";
    showGithubStarCount?: boolean;
    customItemStart?: NonNullable<ReactNode>;
    customItemEnd?: NonNullable<ReactNode>;
};

export const GlHeader = memo((props: GlHeaderProps) => {
    const {
        links,
        title,
        className,
        enableDarkModeSwitch,
        githubButtonSize,
        githubRepoUrl,
        showGithubStarCount,
        titleDark,
        titleSmallScreen,
        titleSmallScreenDark,
        customItemStart,
        customItemEnd,
    } = props;

    const [isMenuUnfolded, setIsMenuUnfolded] = useState(false);

    const {
        domRect: { height: headerHeight },
        ref: headerRef,
    } = useDomRect();

    const {
        domRect: { height: linksHeight },
        ref: smallDeviceLinksRef,
    } = useDomRect();

    const linksRef = useRef<HTMLDivElement>(null);
    const titleRef = useRef<HTMLDivElement>(null);
    const [buttonsWidth, setButtonsWidth] = useState(0);
    const [titleWidth, setTitleWidth] = useState(0);

    //const { scrollableParent } = useGetScrollableParent({ "ref": headerRef });

    useEffect(() => {
        if (!titleRef.current || !linksRef.current) {
            return;
        }

        setButtonsWidth(linksRef.current.clientWidth);
        setTitleWidth(titleRef.current.clientWidth);
    }, [titleRef.current?.clientWidth, linksRef.current?.clientWidth]);

    const { ref } = useClickAway({
        "onClickAway": () => {
            if (!isMenuUnfolded) {
                return;
            }
            setIsMenuUnfolded(false);
        },
    });

    const toggleMenu = useConstCallback(() => {
        setIsMenuUnfolded(!isMenuUnfolded);
    });

    useElementEvt(
        ({ ctx, element }) => {
            const scrollableParent = getScrollableParent({
                element,
                "doReturnElementIfScrollable": true,
            });

            Evt.from(ctx, scrollableParent, "scroll").attach(() => {
                const { scrollTop } = scrollableParent;

                if (headerHeight < scrollTop) {
                    setIsMenuUnfolded(false);
                }
            });
        },
        ref,
        [headerHeight],
    );

    const { classes, cx, theme } = useStyles(
        {
            headerHeight,
            isMenuUnfolded,
            linksHeight,
            buttonsWidth,
            titleWidth,
        },
        { props },
    );

    return (
        <header className={cx(classes.root, className)} ref={headerRef}>
            <div className={classes.headerInner}>
                <div ref={titleRef} className={classes.title}>
                    {typeof title === "string" ? (
                        <Text typo="subtitle">{title}</Text>
                    ) : (
                        ((): ReactNode => {
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
                        })()
                    )}
                </div>

                <div ref={linksRef} className={classes.buttonAndLinkWrapper}>
                    {customItemStart !== undefined && customItemStart}

                    <Links
                        className={classes.links}
                        links={links}
                        classes={{
                            "text": classes.text,
                            "linkWrapper": classes.linkWrapper,
                            "linkUnderline": classes.linkUnderline,
                        }}
                    />

                    {githubRepoUrl !== undefined && (
                        <GlGithubStarCount
                            repoUrl={githubRepoUrl}
                            size={githubButtonSize}
                            showCount={showGithubStarCount}
                            className={classes.githubStar}
                        />
                    )}

                    {enableDarkModeSwitch !== undefined &&
                        enableDarkModeSwitch && (
                            <div className={classes.darkModeSwitch}>
                                <GlDarkModeSwitch
                                    className={classes.darkModeSwitch}
                                />
                            </div>
                        )}
                    {customItemEnd !== undefined && customItemEnd}

                    <div
                        className={classes.unfoldIconWrapper}
                        onClick={toggleMenu}
                    >
                        <UnfoldIcon className={classes.unfoldIcon} />
                    </div>
                </div>
            </div>
            <div ref={ref} className={classes.smallDeviceLinksWrapper}>
                <div
                    className={classes.smallDeviceLinksInnerWrapper}
                    ref={smallDeviceLinksRef}
                >
                    <Links
                        links={links}
                        className={classes.smallDeviceLinks}
                        classes={{
                            "link": classes.smallDeviceLink,
                            "text": classes.smallDeviceText,
                            "linkWrapper": classes.smallDeviceLinksInnerWrapper,
                            "linkUnderline": classes.smallDeviceLinkUnderline,
                        }}
                    />
                </div>
            </div>
        </header>
    );
});

const useStyles = makeStyles<{
    headerHeight: number;
    isMenuUnfolded: boolean;
    linksHeight: number;
    buttonsWidth: number;
    titleWidth: number;
}>({ "name": { GlHeader } })(
    (
        theme,
        { isMenuUnfolded, linksHeight, buttonsWidth, titleWidth, headerHeight },
    ) => {
        const isCollapsibleMenu =
            buttonsWidth + theme.spacing(9) + theme.paddingRightLeft * 2 >
                theme.windowInnerWidth - titleWidth ||
            theme.windowInnerWidth < breakpointsValues.sm;

        return {
            "root": {
                "position": "relative",
            },
            "unfoldIconWrapper": {
                "pointerEvents": isMenuUnfolded ? "none" : undefined,
            },
            "headerInner": {
                "display": "flex",
                "justifyContent": "space-between",
                "alignItems": "center",
                "position": "relative",
            },
            "unfoldIcon": {
                "display": "none",
                "pointerEvents": "none",
                ...(isCollapsibleMenu
                    ? {
                          "display": "block",
                          "pointerEvents": "unset",
                      }
                    : {}),
                "marginLeft": theme.spacing(2),
            },
            "smallDeviceLinksWrapper": {
                //"zIndex": 4,
                "position": "absolute",
                "left": -theme.paddingRightLeft,
                "backgroundColor": theme.colors.useCases.surfaces.background,
                "top": headerHeight + theme.spacing(3),
                "width": window.innerWidth,
                "opacity": 0,
                "height": 0,
                "overflow": "hidden",
                "pointerEvents": "none",
                "display": "flex",
                "flexDirection": "column",
                "alignItems": "flex-start",
                "justifyContent": "center",
                "transition": "height 350ms, border-top-color 200ms",
                ...theme.spacing.rightLeft(
                    "padding",
                    `${theme.paddingRightLeft}px`,
                ),
                ...(isCollapsibleMenu
                    ? {
                          "borderTop": isMenuUnfolded
                              ? `solid 1px ${theme.colors.useCases.typography.textSecondary}`
                              : undefined,
                          "height": isMenuUnfolded ? linksHeight : 0,
                          "opacity": 0.94,
                          "pointerEvents": "unset",
                      }
                    : {}),
            },

            "smallDeviceLinksInnerWrapper": {
                ...theme.spacing.topBottom("padding", `${theme.spacing(3)}px`),
            },

            "smallDeviceLinks": {
                "flexDirection": "column",
                "display": "flex",
                ...(isCollapsibleMenu
                    ? {
                          "opacity": 1,
                          "pointerEvents": "unset",
                      }
                    : {}),
            },

            "darkModeSwitch": {
                ...(theme.windowInnerWidth < breakpointsValues.md
                    ? {
                          ...theme.spacing.rightLeft(
                              "margin",
                              `${theme.spacing(2)}px`,
                          ),
                      }
                    : {}),
                "marginLeft": theme.spacing(
                    (() => {
                        if (theme.windowInnerWidth >= breakpointsValues.md) {
                            return 2;
                        }

                        return 0;
                    })(),
                ),
            },
            "buttonAndLinkWrapper": {
                "position": "absolute",
                "right": 0,
                "display": "flex",
                "alignItems": "center",
            },
            "githubStar": {
                ...(theme.windowInnerWidth >= breakpointsValues.md
                    ? {
                          "paddingRight": theme.spacing(2),
                      }
                    : {}),
                "marginLeft": theme.spacing(
                    (() => {
                        if (theme.windowInnerWidth >= breakpointsValues.md) {
                            return 2;
                        }

                        return 0;
                    })(),
                ),
            },
            "links": {
                ...(() => {
                    if (isCollapsibleMenu) {
                        return {
                            "opacity": 0,
                            "pointerEvents": "none",
                        };
                    }
                })(),
            },
            "title": {},
            "text": {},
            "linkWrapper": {},
            "linkUnderline": {},
            "smallDeviceText": {},
            "smallDeviceLink": {
                "margin": 0,
            },
            "smallDeviceLinkUnderline": {
                "left": isCollapsibleMenu ? theme.spacing(2) : undefined,
            },
            "darkModeSwitchWrapper": {},
        };
    },
);

const { Links } = (() => {
    type LinksProps = {
        links: GlHeaderProps["links"];
        className?: string;
        classes?: Partial<ReturnType<typeof useStyles>["classes"]>;
    };

    const Links = memo((props: LinksProps) => {
        const { links, className } = props;

        const { classes, cx } = useStyles(undefined, { props });

        return (
            <div className={cx(classes.links, className)}>
                {links.map(({ href, label, onClick }) => (
                    <div key={label} className={classes.linkWrapper}>
                        <Link
                            className={classes.link}
                            href={href}
                            label={label}
                            onClick={onClick}
                            classes={{
                                "text": classes.text,
                                "underline": classes.linkUnderline,
                            }}
                        />
                    </div>
                ))}
            </div>
        );
    });

    const useStyles = makeStyles({
        "name": `${symToStr({ GlHeader })}${symToStr({ Links })}`,
    })({
        "links": {
            "display": "flex",
            "justifyContent": "center",
            "flex": 1,
        },
        "linkWrapper": {
            "display": "flex",
        },
        "text": {
            "cursor": "pointer",
        },
        "linkUnderline": {},
        "link": {},
    });

    return { Links };
})();

const { Link } = (() => {
    type LinkProps = GlHeaderProps["links"][number] & {
        className?: string;
        classes?: Partial<ReturnType<typeof useStyles>["classes"]>;
    };

    const Link = memo((props: LinkProps) => {
        const { href, label, onClick, className } = props;
        const ref = useRef<HTMLDivElement>(null);
        const [elementWidth, setElementWidth] = useState(0);

        useEffect(() => {
            if (!ref.current) {
                return;
            }

            setElementWidth(ref.current.clientWidth);
        }, [ref.current?.clientWidth]);

        const { classes, cx } = useStyles({ elementWidth }, { props });

        return (
            <div
                ref={ref}
                onClick={onClick ?? (() => (window.location.href = href))}
                className={cx(classes.root, className)}
            >
                <Text typo="label 1" className={classes.text}>
                    {label}
                </Text>
                <div className={classes.underline}></div>
            </div>
        );
    });

    const useStyles = makeStyles<{ elementWidth: number }, "underline">({
        "name": `${symToStr({ GlHeader })}${symToStr({ Link })}`,
    })((theme, { elementWidth }, classes) => {
        return {
            "root": {
                "display": "flex",
                "flexDirection": "column",
                ...theme.spacing.rightLeft("margin", `${theme.spacing(3)}px`),
                "&: hover": {
                    "cursor": "pointer",
                },
                [`&:hover .${classes.underline}`]: {
                    "width": elementWidth,
                },
                "& :active": {
                    "color": theme.colors.useCases.buttons.actionActive,
                },
                [`&:active .${classes.underline}`]: {
                    "backgroundColor":
                        theme.colors.useCases.buttons.actionActive,
                },
            },
            "underline": {
                "width": 0,
                "marginTop": theme.spacing(1),
                "height": 1,
                "backgroundColor": theme.colors.useCases.typography.textPrimary,
                "transition": "width 200ms, background-color 100ms",
            },
            "text": {
                ...theme.spacing.rightLeft("padding", `${theme.spacing(2)}px`),
                "transition": "color 100ms",
            },
        };
    });
    return { Link };
})();
