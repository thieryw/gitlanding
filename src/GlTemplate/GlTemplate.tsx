import { useEffect, memo } from "react";
import { makeStyles, ThemeProviderDefault } from "../theme";
import type { ReactNode } from "react";
import { useSplashScreen } from "onyxia-ui";
import type { ComponentType } from "../tools/ComponentType";
import type { ThemeProviderProps } from "onyxia-ui";
import { useIsThemeProvided } from "onyxia-ui/lib/ThemeProvider";
import { WaveBackground } from "./WaveBackground";
import { breakpointsValues } from "onyxia-ui";

//window.visualViewport.height

export type GlTemplateProps = {
    header?: ReactNode;
    SplashScreenLogo?: ComponentType<{ className: string }>;
    splashScreenLogoFillColor?: string;
    children?: ReactNode;
    ThemeProvider?: ComponentType<{
        splashScreen: NonNullable<ThemeProviderProps["splashScreen"]>;
        children: JSX.Element;
    }>;
    waveBackgroundOffsets?: number[];
};

const useStyles = makeStyles()(theme => ({
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
        "padding": theme.spacing(
            0,
            (() => {
                if (
                    theme.responsive.windowInnerWidth >= breakpointsValues["lg"]
                ) {
                    return 7;
                }

                if (
                    theme.responsive.windowInnerWidth >= breakpointsValues["sm"]
                ) {
                    return 6;
                }

                return 4;
            })(),
        ),
    },
}));

const GlTemplateInner = memo(
    (
        props: Omit<GlTemplateProps, "SplashScreenLogo"> & {
            isThemeProvidedOutside: boolean;
        },
    ) => {
        const {
            header,
            children,
            isThemeProvidedOutside,
            waveBackgroundOffsets,
        } = props;

        {
            const { hideRootSplashScreen } = useSplashScreen();

            useEffect(() => {
                if (isThemeProvidedOutside) {
                    return;
                }

                hideRootSplashScreen();
            }, []);
        }

        const { classes } = useStyles();

        return (
            <div className={classes.root}>
                {header}
                <div className={classes.scrollWrapper}>
                    {children}
                    {waveBackgroundOffsets !== undefined &&
                        waveBackgroundOffsets.map(offset => (
                            <WaveBackground offset={offset} key={offset} />
                        ))}
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
            splashScreen={{
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                "Logo": SplashScreenLogo as any,
                "fillColor": splashScreenLogoFillColor,
                "minimumDisplayDuration": 0,
            }}
        >
            {children}
        </ThemeProvider>
    );
});
