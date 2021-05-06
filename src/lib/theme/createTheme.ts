/* eslint-disable no-irregular-whitespace */
/* eslint-disable @typescript-eslint/ban-ts-comment */

// @ts-ignore: unused
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import type { Theme } from "@material-ui/core/styles/createMuiTheme";

import { createMuiTheme } from "@material-ui/core/styles";
import "typeface-work-sans";

declare module "@material-ui/core/styles/createMuiTheme" {
    interface Theme {
        custom: {
            color: {
                palette: {
                    typeScriptBlue: string;
                    visualStudioCodeColor: string;
                    silverGray: string;
                    tomatoRed: string;
                    goldenRod: string;
                    limeGreen: string;
                    darkBlue: string;
                    lightBlue: string;
                };
                useCases: {
                    surface: string;
                    vsCodeTopLeftButtonColors: {
                        close: string;
                        minimize: string;
                        fullScreen: string;
                    };
                };
            };
        };
    }

    // allow configuration using `createMuiTheme`
    interface ThemeOptions {
        custom: Theme["custom"];
    }
}

export function createTheme(params: { isDarkModeEnabled: boolean }): { theme: Theme } {
    const { isDarkModeEnabled } = params;

    const palette: Theme["custom"]["color"]["palette"] = {
        "typeScriptBlue": "#0076C6",
        "silverGray": "#a2a7ab",
        "visualStudioCodeColor": "#1e1e1e",
        "tomatoRed": "#f85b52",
        "goldenRod": "#e1bb2a",
        "limeGreen": "#54bd2b",
        "darkBlue": "#070224",
        "lightBlue": "#a6d8f5",
    };

    const theme = createMuiTheme({
        "typography": {
            "fontFamily": '"Work Sans"',
        },
        "palette": {
            "type": isDarkModeEnabled ? "dark" : "light",
        },
        "custom": {
            "color": {
                palette,
                "useCases": {
                    "surface": isDarkModeEnabled ? palette.darkBlue : palette.lightBlue,
                    "vsCodeTopLeftButtonColors": {
                        "close": palette.tomatoRed,
                        "minimize": palette.goldenRod,
                        "fullScreen": palette.limeGreen,
                    },
                },
            },
        },
    });

    return { theme };
}
