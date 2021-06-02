/* eslint-disable no-irregular-whitespace */

/*import { useMemo } from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import { createTheme } from "./createTheme";
import { ThemeProvider as MuiThemeProvider, StylesProvider } from "@material-ui/core/styles";
import { useIsDarkModeEnabled } from "./useIsDarkModeEnabled";
import React from "react";*/

/*export function ThemeProvider(props: { children: React.ReactNode }) {
    const { children } = props;

    const { isDarkModeEnabled } = useIsDarkModeEnabled();

    const { theme } = useMemo(() => createTheme({ isDarkModeEnabled }), [isDarkModeEnabled]);

    return (
        <MuiThemeProvider theme={theme}>
            <CssBaseline />
            <StylesProvider injectFirst>{children}</StylesProvider>
        </MuiThemeProvider>
    );
}*/

import { createThemeProvider, defaultPalette, createDefaultColorUseCases } from "onyxia-ui";
import { createUseClassNamesFactory } from "tss-react";
export { useIsDarkModeEnabled } from "onyxia-ui";

export const { OnyxiaThemeProvider, useOnyxiaTheme } = createThemeProvider({
    "palette": {
        ...defaultPalette,
        "VsCodeBackground": "#1e1e1e",
    },
    "createColorUseCases": ({ isDarkModeEnabled, palette }) => ({
        ...createDefaultColorUseCases({ isDarkModeEnabled, palette }),
    }),
});

export const { createUseClassNames } = createUseClassNamesFactory({ "useTheme": useOnyxiaTheme });
