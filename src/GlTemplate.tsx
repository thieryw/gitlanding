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

export type GlTemplateProps = {
    header?: ReactNode;
    SplashScreenLogo?: ComponentType<{ className: string }>;
    splashScreenLogoFillColor?: string;
    children?: ReactNode;
    ThemeProvider?: ComponentType<{
        splashScreen?: NonNullable<ThemeProviderProps["splashScreen"]>;
        children: ReactNode;
    }>;
    headerBehavior: "always visible" | "only visible at the top" | "smart";
};

const useStyles = makeStyles<{
    headerHeight: number;
    rootWidth: number;
    isHeaderVisible: boolean;
    headerPosition: "fixed" | "top";
}>()((theme, { headerHeight, rootWidth, isHeaderVisible, headerPosition }) => {
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
                    case "top":
                        return {
                            "overflow": "auto",
                            "scrollBehavior": "smooth",
                        } as const;
                }
            })(),
        },
        "headerWrapper": {
            ...theme.spacing.rightLeft("padding", `${paddingRightLeft}px`),
            ...(() => {
                switch (headerPosition) {
                    case "fixed":
                        return {
                            "zIndex": 1000,
                            "position": "fixed",
                            "width": rootWidth,
                            "transition": "top 350ms",
                            "top": isHeaderVisible ? 0 : -headerHeight,
                            "backgroundColor": changeColorOpacity({
                                "color":
                                    theme.colors.useCases.surfaces.background,
                                "opacity": 0.94,
                            }),
                        } as const;
                    case "top":
                        return {};
                }
            })(),
        },
        "childrenWrapper": {
            ...theme.spacing.rightLeft("padding", `${paddingRightLeft}px`),
            ...(() => {
                switch (headerPosition) {
                    case "fixed":
                        return {
                            "paddingTop": headerHeight,
                            "height": "100%",
                            "zIndex": 1,
                            "overflow": "auto",
                            "scrollBehavior": "smooth",
                        } as const;
                    case "top":
                        return {};
                }
            })(),
        },
    };
});

const GlTemplateInner = memo(
    (
        props: Omit<GlTemplateProps, "SplashScreenLogo"> & {
            isThemeProvidedOutside: boolean;
        },
    ) => {
        const { header, isThemeProvidedOutside, headerBehavior, children } =
            props;

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

        const [isHeaderVisible, setIsHeaderVisible] = useState(true);

        const { classes, cx } = useStyles({
            rootWidth,
            headerHeight,
            isHeaderVisible,
            "headerPosition": (() => {
                switch (headerBehavior) {
                    case "only visible at the top":
                        return "top";
                    case "always visible":
                    case "smart":
                        return "fixed";
                }
            })(),
        });

        useElementEvt(
            ({ ctx, element }) => {
                if (headerBehavior !== "smart") {
                    return;
                }

                let previousScrollTop = 0;

                Evt.from(ctx, element, "scroll").attach(e => {
                    const scrollTop = (e as any).target.scrollTop;

                    setIsHeaderVisible(
                        scrollTop < previousScrollTop
                            ? true
                            : scrollTop <= headerHeight,
                    );

                    previousScrollTop = scrollTop;
                });
            },
            childrenWrapperRef,
            [headerHeight, headerBehavior],
        );

        return (
            <div
                className={cx(
                    classes.root,
                    headerBehavior === "only visible at the top" &&
                        scrollableDivClassName,
                )}
            >
                <div className={classes.headerWrapper} ref={headerWrapperRef}>
                    {header}
                </div>
                <div
                    className={cx(
                        classes.childrenWrapper,
                        headerBehavior !== "only visible at the top" &&
                            scrollableDivClassName,
                    )}
                    ref={childrenWrapperRef}
                >
                    {children}
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
