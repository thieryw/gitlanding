import { memo, useState, useEffect } from "react";
import type { ReactNode } from "react";
import { makeStyles, breakpointsValues, Text } from "../theme";
import { GlHeaderLinks } from "./GlHeaderLinks";
import { GlDarkModeSwitch } from "../utils/GlDarkModeSwitch";
import { GlGithubStarCount } from "../utils/GlGithubStarCount";
import UnfoldIcon from "@mui/icons-material/FormatLineSpacing";
import { useConstCallback } from "powerhooks/useConstCallback";
import { useClickAway } from "powerhooks/useClickAway";
import { getScrollableParent } from "powerhooks/getScrollableParent";
import { useDomRect } from "powerhooks/useDomRect";
import { useElementEvt } from "evt/hooks/useElementEvt";
import { Evt } from "evt";

//todo: fix titleWrapper width to the largest available title

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
        className,
        customItemEnd,
        customItemStart,
        enableDarkModeSwitch,
        githubButtonSize,
        githubRepoUrl,
        showGithubStarCount,
        title,
        titleDark,
        titleSmallScreen,
        titleSmallScreenDark,
    } = props;

    const [isMenuUnfolded, setIsMenuUnfolded] = useState(false);
    const [isSmallDevice, setIsSmallDevice] = useState<boolean | undefined>(
        undefined,
    );
    const [breakpoint, setBreakpoint] = useState<number | undefined>(undefined);

    const toggleMenuUnfolded = useConstCallback(() => {
        setIsMenuUnfolded(!isMenuUnfolded);
    });

    const { ref } = useClickAway({
        "onClickAway": () => {
            setIsMenuUnfolded(false);
        },
    });

    const {
        domRect: { height: headerHeight, width: headerWidth },
    } = useDomRect({ ref });

    const {
        ref: titleRef,
        domRect: { width: titleWidth },
    } = useDomRect();

    const {
        ref: buttonsAndLinksRef,
        domRect: { width: buttonsAndLinksWidth },
    } = useDomRect();

    useEffect(() => {
        if (
            isSmallDevice ||
            titleWidth === 0 ||
            buttonsAndLinksWidth === 0 ||
            headerWidth === 0
        ) {
            return;
        }

        const contentWidth =
            titleWidth +
            buttonsAndLinksWidth +
            theme.spacing(8) +
            2 * theme.paddingRightLeft;

        if (headerWidth < contentWidth && breakpoint !== undefined) {
            return;
        }

        setBreakpoint(contentWidth);
    }, [titleWidth, buttonsAndLinksWidth, headerWidth, isSmallDevice]);

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

    const { theme, classes, cx } = useStyles({ isSmallDevice }, { props });

    useEffect(() => {
        if (breakpoint === undefined) {
            return;
        }
        setIsSmallDevice(
            theme.windowInnerWidth < breakpoint ||
                theme.windowInnerWidth < breakpointsValues.sm,
        );
    }, [theme.windowInnerWidth, breakpoint]);

    useEffect(() => {
        if (isSmallDevice) {
            return;
        }
        setIsMenuUnfolded(false);
    }, [isSmallDevice]);

    return (
        <header ref={ref} className={cx(classes.root, className)}>
            {(() => {
                return (
                    <div ref={titleRef} className={classes.titleWrapper}>
                        {(() => {
                            const transformElementIfString = (
                                element: ReactNode,
                            ) => {
                                if (typeof element === "string") {
                                    return (
                                        <Text
                                            className={classes.titleText}
                                            typo="subtitle"
                                        >
                                            {element}
                                        </Text>
                                    );
                                }
                                return element;
                            };

                            if (
                                theme.windowInnerWidth >= breakpointsValues.md
                            ) {
                                if (!theme.isDarkModeEnabled) {
                                    return transformElementIfString(title);
                                }
                                return transformElementIfString(
                                    titleDark ?? title,
                                );
                            }

                            if (!theme.isDarkModeEnabled) {
                                return transformElementIfString(
                                    titleSmallScreen ?? title,
                                );
                            }

                            return transformElementIfString(
                                titleSmallScreenDark ??
                                    titleSmallScreen ??
                                    titleDark ??
                                    title,
                            );
                        })()}
                    </div>
                );
            })()}

            <div
                ref={buttonsAndLinksRef}
                className={classes.linkAndButtonWrapper}
            >
                {customItemStart !== undefined && customItemStart}
                <div className={classes.linksWrapperLargeScreen}>
                    <GlHeaderLinks
                        classes={{
                            "contentWrapper": classes.linksContentWrapper,
                        }}
                        className={classes.links}
                        links={links.map(link => ({
                            ...link,
                            "classes": {
                                "link": classes.link,
                                "underline": classes.underline,
                            },
                            "className": classes.linkRoot,
                        }))}
                        type="largeScreen"
                    />
                </div>
                {githubRepoUrl !== undefined && (
                    <GlGithubStarCount
                        repoUrl={githubRepoUrl}
                        size={githubButtonSize}
                        showCount={showGithubStarCount}
                        className={classes.githubStar}
                    />
                )}
                {enableDarkModeSwitch !== undefined && enableDarkModeSwitch && (
                    <GlDarkModeSwitch className={classes.darkModeSwitch} />
                )}

                {customItemEnd !== undefined && customItemEnd}

                <div
                    className={classes.unfoldIconWrapper}
                    onClick={toggleMenuUnfolded}
                >
                    <UnfoldIcon className={classes.unfoldIcon} />
                </div>
            </div>
            <GlHeaderLinks
                classes={{
                    "contentWrapper": classes.linksContentWrapperSmallScreen,
                    "overline": classes.linksOverline,
                }}
                links={links.map(link => ({
                    ...link,
                    "classes": {
                        "link": classes.linkSmallScreen,
                        "root": classes.linkRootSmallScreen,
                        "underline": classes.underlineSmallScreen,
                    },
                }))}
                className={classes.smallDeviceLinks}
                type="smallScreen"
                isUnfolded={isMenuUnfolded}
            />
        </header>
    );
});

const useStyles = makeStyles<{ isSmallDevice: boolean | undefined }>({
    "name": { GlHeader },
})((theme, { isSmallDevice }) => {
    return {
        "root": {
            "padding": theme.spacing({
                "rightLeft": `${theme.paddingRightLeft}px`,
                "topBottom": `${theme.spacing(3)}px`,
            }),
            "position": "relative",
            "display": "flex",
            "justifyContent": "space-between",
            "alignItems": "center",
            "opacity": isSmallDevice === undefined ? 0 : 1,
            "maxWidth": "100%",
            "overflowX": !isSmallDevice ? "hidden" : undefined,
        },
        "titleWrapper": {
            "marginRight": theme.spacing(8),
        },
        "titleText": {
            "whiteSpace": "nowrap",
        },
        "linkAndButtonWrapper": {
            "display": "grid",
            "gridAutoFlow": "column",
            "alignItems": "center",
            "gap": theme.spacing(3),
        },
        "link": {
            "marginTop": theme.spacing(1),
        },
        "smallDeviceLinks": {
            "position": "absolute",
            "top": "100%",
            "left": 0,
            "width": "100%",
        },
        "unfoldIconWrapper": {
            "display": isSmallDevice ? "flex" : "none",
            "alignItems": "center",
        },
        "links": {
            "order": 2,
            "display": isSmallDevice ? "none" : "flex",
            "pointerEvents": isSmallDevice ? "none" : undefined,
        },
        "linksWrapperLargeScreen": {
            "order": isSmallDevice ? -1 : undefined,
        },
        "unfoldIcon": {},
        "githubStar": {},
        "darkModeSwitch": {},
        "linkRoot": {},
        "underline": {},
        "linkRootSmallScreen": {},
        "underlineSmallScreen": {},
        "linkSmallScreen": {},
        "linksContentWrapper": {},
        "linksContentWrapperSmallScreen": {},
        "linksOverline": {},
    };
});
