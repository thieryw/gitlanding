import { createThemeProvider } from "onyxia-ui";
import { createDefaultColorUseCases } from "onyxia-ui";

const providers = createThemeProvider({
    "createColorUseCases": params => {
        return {
            ...createDefaultColorUseCases(params),
            "borderColor": params.isDarkModeEnabled ? "#424753" : "#d8d8d3",
        };
    },
});

export const { StoryProvider, ThemeProvider } = providers;

export function useTheme() {
    const theme = providers.useTheme();

    return {
        ...theme,
        "borderRadius": 4,
        "boxShadow": theme.isDarkModeEnabled
            ? "rgb(0 0 0 / 20%) 0 2px 5px 0"
            : "rgb(0 0 0 / 10%) 0 1px 3px 0",
    };
}
