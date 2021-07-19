/* eslint-disable no-irregular-whitespace */

import type { ReactNode } from "react";
import { createThemeProvider, defaultGetTypographyDesc } from "onyxia-ui";
import { createMakeStyles } from "tss-react";
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
import type { ThemeProviderProps, Theme } from "onyxia-ui";
import type { ComponentType } from "./tools/ComponentType";
import { id } from "tsafe/id";
import { createText } from "onyxia-ui/Text";
import { useThemeBase as useTheme } from "onyxia-ui/lib/ThemeProvider";

let isThemeOverwritten = false;

let { ThemeProvider } = (() => {
    const { ThemeProvider: ThemeProvider_specific, useTheme } =
        createThemeProvider({
            "getTypographyDesc": params => ({
                ...defaultGetTypographyDesc(params),
                "fontFamily": '"Work Sans", sans-serif',
            }),
        });

    const ThemeProvider = id<ComponentType<ThemeProviderProps>>(
        ThemeProvider_specific,
    );

    return { ThemeProvider, useTheme };
})();

export { useTheme };

export const { makeStyles } = createMakeStyles({ useTheme });

export function overwriteTheme(params: {
    ThemeProvider: ComponentType<ThemeProviderProps>;
    useTheme(): Theme;
}): void {
    isThemeOverwritten = true;

    ThemeProvider = params.ThemeProvider;
}

export const { getThemeProvider } = (() => {
    const Id: typeof ThemeProvider = (props: { children: ReactNode }) => (
        <>{props.children}</>
    );

    function getThemeProvider() {
        return {
            "ThemeProviderOrId": isThemeOverwritten ? Id : ThemeProvider,
        };
    }

    return { getThemeProvider };
})();

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

export const { Text } = createText({ useTheme });
