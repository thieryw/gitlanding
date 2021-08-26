/* eslint-disable no-irregular-whitespace */

import { createThemeProvider } from "onyxia-ui";
import { createMakeStyles } from "tss-react";
import { createIcon } from "onyxia-ui/Icon";
import { createIconButton } from "onyxia-ui/IconButton";
import { createButton } from "onyxia-ui/Button";

import Brightness4Icon from "@material-ui/icons/Brightness4";
import Brightness7Icon from "@material-ui/icons/Brightness7";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import DehazeIcon from "@material-ui/icons/Dehaze";
import Brightness1RoundedIcon from "@material-ui/icons/Brightness1Rounded";
import { createText } from "onyxia-ui/Text";
import { breakpointsValues as defaultBreakpointsValues } from "onyxia-ui";
import { useStyles } from "onyxia-ui/lib/ThemeProvider";

export const { ThemeProvider: ThemeProviderDefault } = createThemeProvider({});

export function useTheme() {
    const { theme } = useStyles();

    return theme;
}

export const { makeStyles } = createMakeStyles({ useTheme });

export const { Text } = createText({ useTheme });

export const { Icon } = createIcon({
    "brightness4": Brightness4Icon,
    "brightness7": Brightness7Icon,
    "arrowBackIos": ArrowBackIosIcon,
    "arrowForwardIos": ArrowForwardIosIcon,
    "dehaze": DehazeIcon,
    "brightness1Rounded": Brightness1RoundedIcon,
});

export const { IconButton } = createIconButton({ Icon });

export const { Button } = createButton({ Icon });

export const breakpointsValues = {
    ...defaultBreakpointsValues,
    "lg+": 1440 as const,
};
