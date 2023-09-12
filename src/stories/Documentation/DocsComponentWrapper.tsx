import { memo, useEffect } from "react";
import type { ReactNode } from "react";
import { useIsDarkModeEnabled } from "onyxia-ui/lib";
import { useDarkMode } from "storybook-dark-mode";
import { ThemeProvider, tss } from "../theme";

export type DocsComponentWrapperProps = {
    component: ReactNode;
};

export const DocsComponentWrapper = memo((props: DocsComponentWrapperProps) => {
    const { component } = props;
    const { setIsDarkModeEnabled } = useIsDarkModeEnabled();
    const isStorybookDarkModeEnabled = useDarkMode();
    const { classes } = useStyles();

    useEffect(() => {
        setIsDarkModeEnabled(isStorybookDarkModeEnabled);
    }, [isStorybookDarkModeEnabled]);

    return (
        <ThemeProvider>
            <div className={classes.contentWrapper}>{component}</div>
        </ThemeProvider>
    );
});

const useStyles = tss.create(({ theme }) => ({
    "contentWrapper": {
        "border": `solid ${theme.colors.useCases.borderColor} 1px`,
        "borderRadius": theme.borderRadius,
        "boxShadow": theme.boxShadow,
        "backgroundColor": theme.colors.useCases.surfaces.background,
    },
}));
