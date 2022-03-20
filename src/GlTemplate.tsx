import { useEffect, useState, memo, useRef } from "react";
import { makeStyles, ThemeProviderDefault } from "./theme";
import type { ReactNode } from "react";
import { useSplashScreen } from "onyxia-ui";
import type { ComponentType } from "./tools/ComponentType";
import type { ThemeProviderProps } from "onyxia-ui";
import { useIsThemeProvided } from "onyxia-ui/lib/ThemeProvider";
import { useDomRect } from "onyxia-ui";
import { useEvt } from "evt/hooks/useEvt";
import { Evt } from "evt";
import { changeColorOpacity } from "onyxia-ui";
import { GlLinkToTop } from "./utils/GlLinkToTop";
import { useMergedClasses } from "tss-react";
import { disableEmotionWarnings } from "./tools/disableEmotionWarnings";
import type { CSSObject } from "tss-react/types";

disableEmotionWarnings();

export type HeaderOptions =
    | HeaderOptions.Fixed
    | HeaderOptions.TopOfPage
    | HeaderOptions.Sticky;

export namespace HeaderOptions {
    export type Fixed = {
        position: "fixed";
        isRetracted?: boolean | "smart";
    };

    export type TopOfPage = {
        position: "top of page";
        isRetracted?: boolean;
    };

    export type Sticky = {
        position: "sticky";
        isRetracted?: boolean | "smart";
    };
}

export type GlTemplateProps = {
    header?: ReactNode;
    footer?: ReactNode;
    SplashScreenLogo?: ComponentType<{ className: string }>;
    splashScreenLogoFillColor?: string;
    children: ReactNode;
    ThemeProvider?: ComponentType<{
        splashScreen?: NonNullable<ThemeProviderProps["splashScreen"]>;
        children: ReactNode;
    }>;
    headerOptions?: HeaderOptions;
    className?: string;
    hasTopOfPageLinkButton?: boolean;
    classes?: Partial<ReturnType<typeof useStyles>["classes"]>;
};

const GlTemplateInner = memo(
    (
        props: Omit<GlTemplateProps, "SplashScreenLogo"> & {
            isThemeProvidedOutside: boolean;
        },
    ) => {
        const {
            header,
            isThemeProvidedOutside,
            children,
            footer,
            className,
            classes: classesProp,
            hasTopOfPageLinkButton,
        } = props;

        const rootRef = useRef<HTMLDivElement>(null);

        const headerOptions: Required<HeaderOptions> = (() => {
            const { headerOptions } = props;

            if (headerOptions === undefined) {
                return {
                    "position": "top of page",
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
                    };
                case "sticky":
                    return {
                        ...headerOptions,
                        "isRetracted": headerOptions.isRetracted ?? false,
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

        useEvt(
            ctx => {
                if (headerOptions.isRetracted !== "smart" || !rootRef.current) {
                    return;
                }

                let previousScrollTop = 0;

                Evt.from(ctx, rootRef.current, "scroll").attach(() => {
                    if (!rootRef.current) return;
                    const scrollTop = rootRef.current?.scrollTop;
                    setIsSmartHeaderVisible(
                        scrollTop < previousScrollTop
                            ? true
                            : scrollTop <= headerHeight,
                    );

                    previousScrollTop = scrollTop;
                });
            },
            [headerHeight, headerOptions.isRetracted],
        );

        let { classes, cx } = useStyles({
            rootWidth,
            headerHeight,
            "isHeaderRetracted":
                headerOptions.isRetracted === "smart"
                    ? !isSmartHeaderVisible
                    : headerOptions.isRetracted,
            "headerPosition": headerOptions.position,
        });

        classes = useMergedClasses(classes, classesProp);

        return (
            <div
                ref={rootRef}
                className={cx(classes.root, className)}
                tabIndex={-1}
            >
                <div ref={headerWrapperRef} className={classes.headerWrapper}>
                    {header}
                </div>
                <div
                    className={classes.childrenWrapper}
                    ref={childrenWrapperRef}
                >
                    {children}
                    {hasTopOfPageLinkButton && <GlLinkToTop />}
                    <div className={classes.footerWrapper}>{footer}</div>
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

const useStyles = makeStyles<{
    headerHeight: number;
    rootWidth: number;
    isHeaderRetracted: boolean;
    headerPosition: Required<HeaderOptions>["position"];
}>({ "name": { GlTemplate } })(
    (theme, { headerHeight, rootWidth, isHeaderRetracted, headerPosition }) => {
        return {
            "root": {
                "height": "100%",
                "overflow": "auto",
            },
            "headerWrapper": {
                "padding": theme.spacing({
                    "rightLeft": `${theme.paddingRightLeft}px`,
                    "topBottom": `${theme.spacing(3)}px`,
                }),
                ...(() => {
                    let out: CSSObject = {
                        "zIndex": 4,
                    };
                    if (
                        headerPosition === "fixed" ||
                        headerPosition === "sticky"
                    ) {
                        out = {
                            ...out,
                            "width": rootWidth,
                            "backgroundColor": changeColorOpacity({
                                "color":
                                    theme.colors.useCases.surfaces.background,
                                "opacity": 0.94,
                            }),
                            "top": !isHeaderRetracted ? 0 : -headerHeight,
                            "transition": "top 350ms",
                        };
                    }
                    switch (headerPosition) {
                        case "fixed":
                            out = {
                                ...out,
                                "position": "fixed",
                            };
                            break;
                        case "sticky":
                            out = {
                                ...out,
                                "position": "sticky",
                                "pointerEvents": isHeaderRetracted
                                    ? "none"
                                    : undefined,
                            };
                            break;
                        case "top of page":
                            return {};
                    }

                    return out;
                })(),
            },

            "footerWrapper": {
                "marginTop": "auto",
                "position": "relative",
                "width": rootWidth,
                "left": -theme.paddingRightLeft,
            },
            "childrenWrapper": {
                "display": "flex",
                "flexDirection": "column",
                "& > :first-child": {
                    "position": "relative",
                    "paddingTop":
                        headerPosition === "fixed" ? headerHeight : undefined,
                    "width": window.innerWidth,
                    "left": -theme.paddingRightLeft,
                    ...theme.spacing.rightLeft(
                        "padding",
                        `${theme.paddingRightLeft}px`,
                    ),
                },
                ...theme.spacing.rightLeft(
                    "padding",
                    `${theme.paddingRightLeft}px`,
                ),
                "minHeight": window.innerHeight,
            },
        };
    },
);
