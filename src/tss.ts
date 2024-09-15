import { createTss } from "tss-react";
import { useTheme } from "theme";

export const { tss } = createTss({
    "useContext": function useContext() {
        const theme = useTheme();
        return { theme };
    },
});
