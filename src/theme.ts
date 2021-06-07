/* eslint-disable no-irregular-whitespace */

import { createThemeProvider, defaultPalette, defaultTypography } from "onyxia-ui";
import "onyxia-ui/assets/fonts/work-sans.css";
import { createUseClassNamesFactory } from "tss-react";
import { createIcon } from "onyxia-ui/Icon";
import { createIconButton } from "onyxia-ui/IconButton";
import { createButton } from "onyxia-ui/Button";

import IconButtonIcon from "@material-ui/core/IconButton";
import Brightness4Icon from "@material-ui/icons/Brightness4";
import Brightness7Icon from "@material-ui/icons/Brightness7";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import DehazeIcon from "@material-ui/icons/Dehaze";
import Brightness1RoundedIcon from "@material-ui/icons/Brightness1Rounded";

const { ThemeProvider, useTheme } = createThemeProvider({
    "typography": {
        ...defaultTypography,
        "fontFamily": '"Work Sans", sans-serif',
    },
    "palette": {
        ...defaultPalette,
        "vsCodeBackground": "#1e1e1e",
    },
});

export { ThemeProvider };

export const { createUseClassNames } = createUseClassNamesFactory({
    "useTheme": useTheme,
});

export const { Icon } = createIcon({
    "iconButton": IconButtonIcon,
    "brightness4": Brightness4Icon,
    "brightness7": Brightness7Icon,
    "arrowBackIos": ArrowBackIosIcon,
    "arrowForwardIos": ArrowForwardIosIcon,
    "dehaze": DehazeIcon,
    "brightness1Rounded": Brightness1RoundedIcon,
});

export const { IconButton } = createIconButton({ Icon });

export const { Button } = createButton({ Icon });
