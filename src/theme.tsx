/* eslint-disable no-irregular-whitespace */

import { createThemeProvider } from "onyxia-ui";
import { createMakeStyles } from "tss-react/compat";
import { createIcon } from "onyxia-ui/Icon";
import { createIconButton } from "onyxia-ui/IconButton";
import { createButton } from "onyxia-ui/Button";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import DehazeIcon from "@mui/icons-material/Dehaze";
import Brightness1RoundedIcon from "@mui/icons-material/Brightness1Rounded";
import { createText } from "onyxia-ui/Text";
import { breakpointsValues as defaultBreakpointsValues } from "onyxia-ui";
import { useStyles } from "onyxia-ui/lib/ThemeProvider";

export const { ThemeProvider: ThemeProviderDefault } = createThemeProvider({});

export function useTheme() {
    const { theme } = useStyles();
    theme.custom = {
        "shadow": "5px 5px 23px 5px rgba(0,0,0,0.51)",
    };

    const out = {
        ...theme,
        "paddingRightLeft": theme.spacing(
            (() => {
                if (theme.windowInnerWidth >= breakpointsValues["lg"]) {
                    return 7;
                }

                if (theme.windowInnerWidth >= breakpointsValues["sm"]) {
                    return 6;
                }

                return 4;
            })(),
        ),
    };

    return out;
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
