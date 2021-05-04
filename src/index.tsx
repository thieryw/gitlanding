import { App } from "./components/App/App";
import type { Props } from "./components/App/App";
import { ThemeProvider } from "./theme/ThemeProvider";
import { useEffect } from "react";

export type TemplateData = Props;

export const HomepageTemplate = (props: TemplateData) => {
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
