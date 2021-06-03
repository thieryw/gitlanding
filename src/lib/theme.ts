/* eslint-disable no-irregular-whitespace */

import { createThemeProvider, defaultPalette, defaultTypography } from "onyxia-ui";
import "onyxia-ui/assets/fonts/work-sans.css";
import { createUseClassNamesFactory } from "tss-react";

const { ThemeProvider, useTheme } = createThemeProvider({
    "typography": {
        ...defaultTypography,
        "fontFamily": '"Work Sans", sans-serif',
    },
    "palette": {
        ...defaultPalette,
        "VsCodeBackground": "#1e1e1e",
    },
});

export { ThemeProvider };

export const { createUseClassNames } = createUseClassNamesFactory({
    "useTheme": useTheme,
});
