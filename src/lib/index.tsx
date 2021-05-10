import { App } from "./components/App/App";
import type { Props } from "./components/App/App";
import { ThemeProvider } from "./theme/ThemeProvider";
import { useEffect } from "react";

export type HomepageProps = Props;

export const HomepageTemplate = (props: HomepageProps) => {
    useEffect(() => {
        const script = document.createElement("script");

        script.src = "https://buttons.github.io/buttons.js";
        script.async = true;

        document.body.appendChild(script);

        return () => {
            document.body.removeChild(script);
        };
    }, []);
    return (
        <ThemeProvider>
            <App {...props} />
        </ThemeProvider>
    );
};
