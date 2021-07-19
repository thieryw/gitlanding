import { useGuaranteedMemo } from "powerhooks/useGuaranteedMemo";
import { useEffect, memo } from "react";
import { getThemeProvider, makeStyles } from "./theme";
import type { ReactNode } from "react";
import type { ComponentType } from "./tools/ComponentType";
import { useSplashScreen } from "onyxia-ui";

export type GlTemplateProps = {
    header?: ReactNode;
    SplashScreenLogo?: ComponentType<{ className: string }>;
    splashScreenLogoFillColor?: string;
    children?: ReactNode;
};

export const { GlTemplate } = (() => {
    const { GlTemplateInner } = (() => {
        const { useStyles } = makeStyles()({
            "root": {
                "height": "100%",
                "display": "flex",
                "flexDirection": "column",
                "overflow": "hidden",
            },
            "scrollWrapper": {
                "flex": 1,
                "overflow": "auto",
                "scrollBehavior": "smooth",
            },
        });

        const GlTemplateInner = memo(
            (props: Omit<GlTemplateProps, "SplashScreenLogo">) => {
                const { header, children } = props;

                {
                    const { hideRootSplashScreen } = useSplashScreen();

                    useEffect(() => {
                        hideRootSplashScreen();
                    }, []);
                }

                const { classes } = useStyles();

                return (
                    <div className={classes.root}>
                        {header}
                        <div className={classes.scrollWrapper}>{children}</div>
                    </div>
                );
            },
        );

        return { GlTemplateInner };
    })();

    const GlTemplate = memo((props: GlTemplateProps) => {
        const { ThemeProviderOrId } = useGuaranteedMemo(
            () => getThemeProvider(),
            [],
        );

        const { SplashScreenLogo, splashScreenLogoFillColor, ...rest } = props;

        return (
            <ThemeProviderOrId
                splashScreen={{
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    "Logo": SplashScreenLogo as any,
                    "fillColor": splashScreenLogoFillColor,
                    "minimumDisplayDuration": 0,
                }}
            >
                <GlTemplateInner {...rest} />
            </ThemeProviderOrId>
        );
    });

    return { GlTemplate };
})();
