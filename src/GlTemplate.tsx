import { useEffect, useState, memo } from "react";
import { makeStyles, splashScreen } from "./theme";
import { useStateRef } from "powerhooks/useStateRef";
import type { ReactNode } from "react";
import { useSplashScreen } from "onyxia-ui";
import { useIsThemeProvided } from "onyxia-ui/lib/ThemeProvider";
import { useDomRect } from "onyxia-ui";
import { useEvt } from "evt/hooks/useEvt";
import { Evt } from "evt";
import { changeColorOpacity } from "onyxia-ui";
import { GlLinkToTop } from "./utils/GlLinkToTop";
import { disableEmotionWarnings } from "./tools/disableEmotionWarnings";
import type { CSSObject } from "tss-react/types";
import { getScrollableParent } from "powerhooks/getScrollableParent";
import { createThemeProvider } from "onyxia-ui";
import memoize from "memoizee";

disableEmotionWarnings();

export type HeaderOptions = HeaderOptions.TopOfPage | HeaderOptions.Sticky;

export namespace HeaderOptions {
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
    children: ReactNode;
    headerOptions?: HeaderOptions;
    applyHeaderPadding?: boolean;
    className?: string;
    hasTopOfPageLinkButton?: boolean;
    classes?: Partial<ReturnType<typeof useStyles>["classes"]>;
};

//NOTE: Here we are sure that we are wrapped into a <ThemeProvider />.
//we can use useTheme, useStyles, ect...
const GlTemplateInner = memo(
    (
        props: GlTemplateProps & {
            doTakeChargeOfHidingRootSplashScreen: boolean;
        },
    ) => {
        const {
            header,
            children,
            footer,
            className,
            hasTopOfPageLinkButton,
            doTakeChargeOfHidingRootSplashScreen,
            applyHeaderPadding,
        } = props;

        const rootRef = useStateRef<HTMLDivElement>(null);

        const headerOptions: Required<HeaderOptions> = (() => {
            const { headerOptions } = props;

            if (headerOptions === undefined) {
                return {
                    "position": "top of page",
                    "isRetracted": false,
                } as const;
            }

            switch (headerOptions.position) {
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
                if (!doTakeChargeOfHidingRootSplashScreen) {
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
            domRect: { width: childrenWrapperWidth },
        } = useDomRect();

        const [isSmartHeaderVisible, setIsSmartHeaderVisible] = useState(true);

        useEvt(
            ctx => {
                const element = rootRef.current;
                if (!element) {
                    return;
                }
                let previousScrollTop = 0;
                const scrollableParent = getScrollableParent({
                    element,
                    "doReturnElementIfScrollable": true,
                });

                Evt.from(ctx, scrollableParent, "scroll").attach(() => {
                    const { scrollTop } = scrollableParent;

                    setIsSmartHeaderVisible(
                        scrollTop < previousScrollTop
                            ? true
                            : scrollTop <= headerHeight,
                    );

                    previousScrollTop = scrollTop;
                });
            },
            [rootRef.current, headerHeight, headerOptions.isRetracted],
        );

        const { classes, cx } = useStyles(
            {
                childrenWrapperWidth,
                headerHeight,
                "isHeaderRetracted":
                    headerOptions.isRetracted === "smart"
                        ? !isSmartHeaderVisible
                        : headerOptions.isRetracted,
                "headerPosition": headerOptions.position,
                "applyHeaderPadding": applyHeaderPadding ?? false,
            },
            { props },
        );

        return (
            <div ref={rootRef} className={cx(classes.root, className)}>
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

//NOTE: If the theme provider is manually provided, the user is in charge of
//hiding the splash screen.
export const GlTemplate = memo((props: GlTemplateProps) => {
    const { ThemeProvider } = useThemeProvider();

    const children = (
        <GlTemplateInner
            {...props}
            doTakeChargeOfHidingRootSplashScreen={ThemeProvider !== undefined}
        />
    );

    return ThemeProvider === undefined ? (
        children
    ) : (
        <ThemeProvider splashScreen={splashScreen}>{children}</ThemeProvider>
    );
});

const { useThemeProvider } = (() => {
    const getThemeProvider = memoize((isThemeProvided: boolean) => {
        if (isThemeProvided) {
            return undefined;
        }

        const { ThemeProvider } = createThemeProvider({});

        return ThemeProvider;
    });

    function useThemeProvider() {
        const isThemeProvided = useIsThemeProvided();

        const ThemeProvider = getThemeProvider(isThemeProvided);

        return { ThemeProvider };
    }

    return { useThemeProvider };
})();

const useStyles = makeStyles<{
    headerHeight: number;
    childrenWrapperWidth: number;
    isHeaderRetracted: boolean;
    headerPosition: Required<HeaderOptions>["position"];
    applyHeaderPadding: boolean;
}>({ "name": { GlTemplate } })(
    (
        theme,
        {
            headerHeight,
            childrenWrapperWidth,
            isHeaderRetracted,
            headerPosition,
            applyHeaderPadding,
        },
    ) => {
        return {
            "root": {},
            "headerWrapper": {
                "padding": applyHeaderPadding
                    ? theme.spacing({
                          "rightLeft": `${theme.paddingRightLeft}px`,
                          "topBottom": `${theme.spacing(3)}px`,
                      })
                    : undefined,
                ...(() => {
                    let out: CSSObject = {
                        "zIndex": 1,
                    };
                    if (headerPosition === "sticky") {
                        out = {
                            ...out,
                            "width": childrenWrapperWidth,
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
            },
            "childrenWrapper": {
                "overflowX": "hidden",
                "display": "flex",
                "flexDirection": "column",
                "minHeight": window.innerHeight,
            },
        };
    },
);
