import { useEffect, useState, memo } from "react";
import { makeStyles, ThemeProviderDefault } from "./theme";
import type { ReactNode } from "react";
import { useSplashScreen } from "onyxia-ui";
import type { ComponentType } from "./tools/ComponentType";
import type { ThemeProviderProps } from "onyxia-ui";
import { useIsThemeProvided } from "onyxia-ui/lib/ThemeProvider";
import { breakpointsValues } from "./theme";
import { useDomRect } from "onyxia-ui";
import { useElementEvt } from "evt/hooks";
import { Evt } from "evt";
import { changeColorOpacity } from "onyxia-ui";

export const scrollableDivClassName = "GlScrollable";

export type HeaderOptions = HeaderOptions.Fixed | HeaderOptions.TopOfPage;

export namespace HeaderOptions {
    export type Fixed = {
        position: "fixed";
        /** Default false */
        isRetracted?: boolean | "smart";
    };

    export type TopOfPage = {
        position: "top of page";
        /** Default false */
        isRetracted?: boolean;
        /** Default false */
        doDelegateScroll?: boolean;
    };
}

export type GlTemplateProps = {
    header?: ReactNode;
    footer?: ReactNode;
    SplashScreenLogo?: ComponentType<{ className: string }>;
    splashScreenLogoFillColor?: string;
    children?: ReactNode;
    ThemeProvider?: ComponentType<{
        splashScreen?: NonNullable<ThemeProviderProps["splashScreen"]>;
        children: ReactNode;
    }>;
    headerOptions?: HeaderOptions;
};

const useStyles = makeStyles<{
    headerHeight: number;
    rootWidth: number;
    isHeaderRetracted: boolean;
    headerPosition: "fixed" | "top of page";
    doDelegateScroll: boolean;
}>()(
    (
        theme,
        {
            headerHeight,
            rootWidth,
            isHeaderRetracted,
            headerPosition,
            doDelegateScroll,
        },
    ) => {
        const paddingRightLeft = theme.spacing(
            (() => {
                if (theme.windowInnerWidth >= breakpointsValues["lg"]) {
                    return 7;
                }

                if (theme.windowInnerWidth >= breakpointsValues["sm"]) {
                    return 6;
                }

                return 4;
            })(),
        );

        const paddingTopBottom = theme.spacing(3);

        const headerHeightPlusMargin = headerHeight + 2 * paddingTopBottom;

        return {
            "root": {
                "height": "100%",
                ...(() => {
                    switch (headerPosition) {
                        case "fixed":
                            return {
                                "visibility":
                                    headerHeight === 0 || rootWidth === 0
                                        ? "hidden"
                                        : "visible",
                            } as const;
                        case "top of page":
                            return doDelegateScroll
                                ? ({
                                      "display": "flex",
                                      "flexDirection": "column",
                                  } as const)
                                : ({
                                      "overflow": "auto",
                                      "scrollBehavior": "smooth",
                                  } as const);
                    }
                })(),
            },
            "headerWrapper": {
                "padding": theme.spacing({
                    "rightLeft": `${paddingRightLeft}px`,
                    "topBottom": `${paddingTopBottom}px`,
                }),
                ...(() => {
                    switch (headerPosition) {
                        case "fixed":
                            return {
                                "zIndex": 1000,
                                "position": "fixed",
                                "width": rootWidth,
                                "transition": "top 350ms",
                                "top": !isHeaderRetracted
                                    ? 0
                                    : -headerHeightPlusMargin,
                                "backgroundColor": changeColorOpacity({
                                    "color":
                                        theme.colors.useCases.surfaces
                                            .background,
                                    "opacity": 0.94,
                                }),
                            } as const;
                        case "top of page":
                            return {
                                ...(() => {
                                    const height =
                                        headerHeight === 0
                                            ? undefined
                                            : isHeaderRetracted
                                            ? 0
                                            : headerHeightPlusMargin;

                                    return {
                                        height,
                                        ...(height !== 0
                                            ? {}
                                            : {
                                                  "paddingBottom": 0,
                                              }),
                                    };
                                })(),
                                "overflow": "hidden",
                                "transition": ["height", "padding"]
                                    .map(prop => `${prop} 250ms`)
                                    .join(", "),
                            } as const;
                    }
                })(),
            },
            "childrenWrapper": {
                ...theme.spacing.rightLeft("padding", `${paddingRightLeft}px`),
            },
            "childrenAndFooterWrapper": {
                "overflowX": "hidden",
                ...(() => {
                    switch (headerPosition) {
                        case "fixed":
                            return {
                                "paddingTop": headerHeightPlusMargin,
                                "height": "100%",
                                "zIndex": 1,
                                "overflowY": "auto",
                                "scrollBehavior": "smooth",
                            } as const;
                        case "top of page":
                            return doDelegateScroll
                                ? ({
                                      "flex": 1,
                                      "overflow": "hidden",
                                  } as const)
                                : {};
                    }
                })(),
            },
        };
    },
);

const GlTemplateInner = memo(
    (
        props: Omit<GlTemplateProps, "SplashScreenLogo"> & {
            isThemeProvidedOutside: boolean;
        },
    ) => {
        const { header, isThemeProvidedOutside, children, footer } = props;

        const headerOptions: Required<HeaderOptions> = (() => {
            const { headerOptions } = props;

            if (headerOptions === undefined) {
                return {
                    "position": "fixed",
                    "isRetracted": false,
                } as const;
            }

            switch (headerOptions.position) {
                case "fixed":
                    return {
                        ...headerOptions,
                        "isRetracted": headerOptions.isRetracted ?? false,
                    };
                case "top of page":
                    return {
                        ...headerOptions,
                        "isRetracted": headerOptions.isRetracted ?? false,
                        "doDelegateScroll":
                            headerOptions.doDelegateScroll ?? false,
                    };
            }
        })();

        {
            const { hideRootSplashScreen } = useSplashScreen();

            useEffect(() => {
                if (isThemeProvidedOutside) {
                    return;
                }

                hideRootSplashScreen();
            }, []);
        }

        const {
            ref: headerWrapperRef,
            domRect: { height: headerHeight },
        } = useDomRect();
        const {
            ref: childrenWrapperRef,
            domRect: { width: rootWidth },
        } = useDomRect();

        const [isSmartHeaderVisible, setIsSmartHeaderVisible] = useState(true);

        const { classes, cx } = useStyles({
            rootWidth,
            headerHeight,
            "isHeaderRetracted":
                headerOptions.isRetracted === "smart"
                    ? !isSmartHeaderVisible
                    : headerOptions.isRetracted,
            "headerPosition": headerOptions.position,
            "doDelegateScroll":
                headerOptions.position === "fixed"
                    ? false
                    : headerOptions.doDelegateScroll,
        });

        useElementEvt(
            ({ ctx, element }) => {
                if (headerOptions.isRetracted !== "smart") {
                    return;
                }

                let previousScrollTop = 0;

                Evt.from(ctx, element, "scroll").attach(e => {
                    const scrollTop = (e as any).target.scrollTop;

                    setIsSmartHeaderVisible(
                        scrollTop < previousScrollTop
                            ? true
                            : scrollTop <= headerHeight,
                    );

                    previousScrollTop = scrollTop;
                });
            },
            childrenWrapperRef,
            [headerHeight, headerOptions.isRetracted],
        );

        return (
            <div
                className={cx(
                    classes.root,
                    headerOptions.position === "top of page" &&
                        headerOptions.doDelegateScroll
                        ? undefined
                        : scrollableDivClassName,
                )}
            >
                <div className={classes.headerWrapper}>
                    <div ref={headerWrapperRef}>{header}</div>
                </div>
                <div
                    className={classes.childrenAndFooterWrapper}
                    ref={childrenWrapperRef}
                >
                    <div className={classes.childrenWrapper}>{children}</div>
                    <div>{footer}</div>
                </div>
            </div>
        );
    },
);

export const GlTemplate = memo((props: GlTemplateProps) => {
    const {
        ThemeProvider = ThemeProviderDefault,
        SplashScreenLogo,
        splashScreenLogoFillColor,
        ...rest
    } = props;

    const isThemeProvided = useIsThemeProvided();

    const children = (
        <GlTemplateInner {...rest} isThemeProvidedOutside={isThemeProvided} />
    );

    return isThemeProvided ? (
        children
    ) : (
        <ThemeProvider
            splashScreen={
                SplashScreenLogo === undefined
                    ? undefined
                    : {
                          "Logo": SplashScreenLogo,
                          "fillColor": splashScreenLogoFillColor,
                          "minimumDisplayDuration": 0,
                      }
            }
        >
            {children}
        </ThemeProvider>
    );
});
