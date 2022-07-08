import { memo, useState, useEffect, useCallback } from "react";
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
import { useEvt } from "evt/hooks/useEvt";
import { Evt } from "evt";

type Behavior = "hide" | "wrap" | "normal";

type CustomItem = {
    item: NonNullable<ReactNode>;
    behaviorOnSmallDevice?: Behavior;
}

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
    customBreakpoint?: number;
    className?: string;
    classes?: Partial<ReturnType<typeof useStyles>["classes"]>;
    enableDarkModeSwitch?: boolean;
    githubRepoUrl?: string;
    githubButtonSize?: "normal" | "large";
    showGithubStarCount?: boolean;
    customItemStart?: CustomItem;
    customItemEnd?: CustomItem;
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
        customBreakpoint,
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
        if (isSmallDevice) {
            return;
        }
        setIsMenuUnfolded(false);
    }, [isSmallDevice]);

    useEffect(() => {
        if (
            isSmallDevice ||
            titleWidth === 0 ||
            buttonsAndLinksWidth === 0 ||
            headerWidth === 0 ||
            customBreakpoint !== undefined
        ) {
            return;
        }

        const contentWidth =
            titleWidth +
            buttonsAndLinksWidth +
            theme.spacing(7) +
            2 * theme.paddingRightLeft;

        if (headerWidth < contentWidth && breakpoint !== undefined) {
            return;
        }

        setBreakpoint(contentWidth);
    }, [titleWidth, buttonsAndLinksWidth, headerWidth, isSmallDevice]);

    useEvt(
        ctx => {
            if (!ref.current) {
                return;
            }
            const scrollableParent = getScrollableParent({
                "element": ref.current,
                "doReturnElementIfScrollable": true,
            });

            Evt.from(ctx, scrollableParent, "scroll").attach(() => {
                const { scrollTop } = scrollableParent;

                if (headerHeight < scrollTop) {
                    setIsMenuUnfolded(false);
                }
            });
        },
        [ref.current, headerHeight],
    );

    const getCustomItemBehavior = useCallback((customItem: CustomItem | undefined): Behavior=>{
        if(customItem === undefined){
            return "normal";
        }
        return customItem.behaviorOnSmallDevice ?? "normal";
    }, [
        customItemStart?.behaviorOnSmallDevice,
        customItemEnd?.behaviorOnSmallDevice
    ])

    const { theme, classes, cx } = useStyles({ 
        isSmallDevice ,
        "customItemStartSmallBehavior": getCustomItemBehavior(customItemStart),
        "customItemEndSmallBehavior": getCustomItemBehavior(customItemEnd)
    }, { props });

    useEffect(() => {
        if (customBreakpoint !== undefined) {
            setIsSmallDevice(theme.windowInnerWidth < customBreakpoint);
            return;
        }
        if (breakpoint === undefined) {
            return;
        }
        setIsSmallDevice(
            theme.windowInnerWidth < breakpoint ||
                theme.windowInnerWidth < breakpointsValues.sm,
        );
    }, [theme.windowInnerWidth, breakpoint]);

    return (
        <header ref={ref} className={cx(classes.root, className)}>
            <div className={classes.largeScreenContentWrapper}>
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
                                    theme.windowInnerWidth >=
                                    breakpointsValues.md
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
                    {
                        customItemStart !== undefined &&
                        <div
                            className={cx(
                                classes.commonCustomItemWrapper,
                                classes.customItemStartWrapper,
                            )}
                        >
                            {customItemStart.item}
                        </div>
                    }
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
                    {enableDarkModeSwitch !== undefined &&
                        enableDarkModeSwitch && (
                            <GlDarkModeSwitch
                                className={classes.darkModeSwitch}
                            />
                        )}

                    {
                        customItemEnd !== undefined &&
                        <div
                            className={cx(
                                classes.commonCustomItemWrapper,
                                classes.customItemEndWrapper,
                            )}
                        >
                            {customItemEnd.item}
                        </div>

                    }

                    <div
                        className={classes.unfoldIconWrapper}
                        onClick={toggleMenuUnfolded}
                    >
                        <UnfoldIcon className={classes.unfoldIcon} />
                    </div>
                </div>
            </div>
            {
                (customItemStart !== undefined || customItemEnd !== undefined) &&
                <div className={classes.smallDeviceCustomItemsWrapper}>
                    {
                        customItemStart !== undefined &&
                        <div
                            className={cx(
                                classes.commonSmallDeviceCustomItemWrapper,
                                classes.smallDeviceCustomItemStartWrapper,
                            )}
                        >
                            {customItemStart.item}
                        </div>
                    }

                    {
                        customItemEnd !== undefined &&
                        <div
                            className={cx(
                                classes.commonSmallDeviceCustomItemWrapper,
                                classes.smallDeviceCustomItemEndWrapper,
                            )}
                        >
                            {customItemEnd.item}
                        </div>
                    }

                </div>
            }
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

const useStyles = makeStyles<
    {
        isSmallDevice: boolean | undefined;
        customItemStartSmallBehavior: Behavior;
        customItemEndSmallBehavior: Behavior;
    }
>({
    "name": { GlHeader },
})((theme, { isSmallDevice, customItemEndSmallBehavior, customItemStartSmallBehavior }) => {

    function getSmallDeviceCustomItemDisplay(behavior: Behavior) {
        if (isSmallDevice && behavior === "wrap") {
            return undefined;
        }
        return "none";
    }

    function getCustomItemDisplay(behavior: Behavior) {
        if (!isSmallDevice) {
            return undefined;
        }
        return behavior === "normal" ? undefined : "none"
    }

    return {
        "root": {
            "padding": theme.spacing({
                "rightLeft": `${theme.paddingRightLeft}px`,
                "topBottom": `${theme.spacing(3)}px`,
            }),
            "position": "relative",
            "opacity": isSmallDevice === undefined ? 0 : 1,
            "maxWidth": "100%",
            "overflowX": !isSmallDevice ? "hidden" : undefined,
        },
        "largeScreenContentWrapper": {
            "display": "flex",
            "justifyContent": "space-between",
            "alignItems": "center",
        },
        "titleWrapper": {
            "marginRight": isSmallDevice ? undefined : theme.spacing(8),
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
        "smallDeviceCustomItemsWrapper": {
            "display": !isSmallDevice ? "none" : "grid",
            "gridAutoFlow": "row",
            "alignItems": "end",
            ...(() => {
                const value = theme.spacing(3);
                return {
                    "gap": value,
                    ...theme.spacing.topBottom("margin", `${value}px`),
                };
            })(),
        },
        "commonSmallDeviceCustomItemWrapper": {
            "display": "flex",
            "justifyContent": "flex-end",
        },
        "smallDeviceCustomItemStartWrapper": {
            "display": getSmallDeviceCustomItemDisplay(customItemStartSmallBehavior)
        },
        "smallDeviceCustomItemEndWrapper": {
            "display": getSmallDeviceCustomItemDisplay(customItemEndSmallBehavior)
        },
        "customItemStartWrapper": {
            "display": getCustomItemDisplay(customItemStartSmallBehavior)
        },
        "customItemEndWrapper": {
            "display": getCustomItemDisplay(customItemEndSmallBehavior)
        },
        "commonCustomItemWrapper": {},
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
