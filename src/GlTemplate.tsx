import { useEffect, memo } from "react";
import { makeStyles, ThemeProviderDefault } from "./theme";
import type { ReactNode } from "react";
import { useSplashScreen } from "onyxia-ui";
import type { ComponentType } from "./tools/ComponentType";
import type { ThemeProviderProps } from "onyxia-ui";
import { useIsThemeProvided } from "onyxia-ui/lib/ThemeProvider";
import { breakpointsValues } from "./theme";
import backgroundWaveDarkUrl from "./assets/svg/backgroundWaveDark.svg";
import backgroundWaveLightUrl from "./assets/svg/backgroundWaveLight.svg";
import { useDomRect } from "powerhooks/useDomRect";

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

const useStyles = makeStyles<{ scrollWrapperHeight: number }>()(
    (theme, { scrollWrapperHeight }) => ({
        "root": {
            "height": "100%",
            "display": "flex",
            "flexDirection": "column",
            "overflow": "hidden",
        },
        "scrollWrapper": {
            "flex": 1,
            "position": "relative",
            "overflow": "auto",
            "scrollBehavior": "smooth",
        },
        "waveBackground": {
            "backgroundImage": `url(${
                theme.isDarkModeEnabled
                    ? backgroundWaveDarkUrl
                    : backgroundWaveLightUrl
            })`,
            "backgroundSize":
                theme.windowInnerWidth > 1920 ? "contain" : "auto",
            "backgroundRepeat": "no-repeat",
            "backgroundPositionY": scrollWrapperHeight * 0.7,
            "padding": theme.spacing({
                "topBottom": 0,
                "rightLeft": (() => {
                    if (theme.windowInnerWidth >= breakpointsValues["lg"]) {
                        return 7;
                    }

                    if (theme.windowInnerWidth >= breakpointsValues["sm"]) {
                        return 6;
                    }

                    return 4;
                })(),
            }),
        },
    }),
);

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
            domRect: { height: scrollWrapperHeight },
            ref: scrollWrapperRef,
        } = useDomRect();

        const { classes } = useStyles({ scrollWrapperHeight });

        return (
            <div className={classes.root}>
                {header}
                <div className={classes.scrollWrapper} ref={scrollWrapperRef}>
                    <div className={classes.waveBackground}>{children}</div>
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
