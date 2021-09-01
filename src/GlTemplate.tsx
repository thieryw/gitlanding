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

export const evtScroll = Evt.create<Event>();

export type GlTemplateProps = {
    header?: ReactNode;
    SplashScreenLogo?: ComponentType<{ className: string }>;
    splashScreenLogoFillColor?: string;
    children?: ReactNode;
    ThemeProvider?: ComponentType<{
        splashScreen?: NonNullable<ThemeProviderProps["splashScreen"]>;
        children: JSX.Element;
    }>;
};

const useStyles = makeStyles<{
    headerHeight: number;
    rootWidth: number;
    isHeaderVisible: boolean;
}>()((theme, { headerHeight, rootWidth, isHeaderVisible }) => {
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
            "visibility":
                headerHeight === 0 || rootWidth === 0 ? "hidden" : "visible",
            "height": "100%",
            "flexDirection": "column",
        },
        "headerWrapper": {
            "position": "fixed",
            ...theme.spacing.rightLeft("padding", `${paddingRightLeft}px`),
            "width": rootWidth,
            "zIndex": 2,
            "transition": "top 350ms",
            "top": isHeaderVisible ? 0 : -headerHeight,
            "backgroundColor": changeColorOpacity({
                "color": theme.colors.useCases.surfaces.background,
                "opacity": 0.94,
            }),
        },
        "childrenWrapper": {
            "paddingTop": headerHeight,
            ...theme.spacing.rightLeft("padding", `${paddingRightLeft}px`),
            "overflow": "auto",
            "height": "100%",
            "scrollBehavior": "smooth",
            "zIndex": 1,
        },
    };
});

const GlTemplateInner = memo(
    (
        props: Omit<GlTemplateProps, "SplashScreenLogo"> & {
            isThemeProvidedOutside: boolean;
        },
    ) => {
        const { header, children, isThemeProvidedOutside } = props;

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

        const { classes } = useStyles({
            rootWidth,
            headerHeight,
            isHeaderVisible,
        });

        useElementEvt(
            ({ ctx, element }) => {
                let previousScrollTop = 0;

                Evt.from(ctx, element, "scroll").attach(e => {
                    const scrollTop = (e as any).target.scrollTop;

                    evtScroll.post(e);

                    setIsHeaderVisible(
                        scrollTop < previousScrollTop
                            ? true
                            : scrollTop <= headerHeight,
                    );

                    previousScrollTop = scrollTop;
                });
            },
            childrenWrapperRef,
            [headerHeight],
        );

        return (
            <div className={classes.root}>
                <div className={classes.headerWrapper} ref={headerWrapperRef}>
                    {header}
                </div>
                <div
                    className={classes.childrenWrapper}
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
