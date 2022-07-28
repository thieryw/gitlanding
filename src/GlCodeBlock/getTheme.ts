import type { ThemeName } from "./ThemeName";
import type { Theme } from "./Theme";

export async function getTheme(params: { dark: ThemeName; light: ThemeName }) {
    const out: any = {};

    for (const key of Object.keys(params)) {
        await new Promise<void>(resolve => {
            switch (params[key as "dark" | "light"]) {
                case "a11y-dark":
                    import(
                        "react-syntax-highlighter/dist/esm/styles/prism/a11y-dark"
                    ).then(theme => {
                        out[key] = theme["default"];
                        resolve();
                    });
                    break;
                case "atom-dark":
                    import(
                        "react-syntax-highlighter/dist/esm/styles/prism/atom-dark"
                    ).then(theme => {
                        out[key] = theme["default"];
                        resolve();
                    });
                    break;
                case "cb":
                    import(
                        "react-syntax-highlighter/dist/esm/styles/prism/cb"
                    ).then(theme => {
                        out[key] = theme["default"];
                        resolve();
                    });
                    break;
                case "coy":
                    import(
                        "react-syntax-highlighter/dist/esm/styles/prism/coy"
                    ).then(theme => {
                        out[key] = theme["default"];
                        resolve();
                    });
                    break;
                case "darcula":
                    import(
                        "react-syntax-highlighter/dist/esm/styles/prism/darcula"
                    ).then(theme => {
                        out[key] = theme["default"];
                        resolve();
                    });
                    break;
                case "dark":
                    import(
                        "react-syntax-highlighter/dist/esm/styles/prism/dark"
                    ).then(theme => {
                        out[key] = theme["default"];
                        resolve();
                    });
                    break;
                case "dracula":
                    import(
                        "react-syntax-highlighter/dist/esm/styles/prism/dracula"
                    ).then(theme => {
                        out[key] = theme["default"];
                        resolve();
                    });
                    break;
                case "duotone-dark":
                    import(
                        "react-syntax-highlighter/dist/esm/styles/prism/duotone-dark"
                    ).then(theme => {
                        out[key] = theme["default"];
                        resolve();
                    });
                    break;
                case "duotone-earth":
                    import(
                        "react-syntax-highlighter/dist/esm/styles/prism/duotone-earth"
                    ).then(theme => {
                        out[key] = theme["default"];
                        resolve();
                    });
                    break;
                case "duotone-forest":
                    import(
                        "react-syntax-highlighter/dist/esm/styles/prism/duotone-forest"
                    ).then(theme => {
                        out[key] = theme["default"];
                        resolve();
                    });
                    break;
                case "duotone-light":
                    import(
                        "react-syntax-highlighter/dist/esm/styles/prism/duotone-light"
                    ).then(theme => {
                        out[key] = theme["default"];
                        resolve();
                    });
                    break;
                case "duotone-sea":
                    import(
                        "react-syntax-highlighter/dist/esm/styles/prism/duotone-sea"
                    ).then(theme => {
                        out[key] = theme["default"];
                        resolve();
                    });
                    break;
                case "duotone-space":
                    import(
                        "react-syntax-highlighter/dist/esm/styles/prism/duotone-space"
                    ).then(theme => {
                        out[key] = theme["default"];
                        resolve();
                    });
                    break;
                case "funky":
                    import(
                        "react-syntax-highlighter/dist/esm/styles/prism/funky"
                    ).then(theme => {
                        out[key] = theme["default"];
                        resolve();
                    });
                    break;
                case "ghcolors":
                    import(
                        "react-syntax-highlighter/dist/esm/styles/prism/ghcolors"
                    ).then(theme => {
                        out[key] = theme["default"];
                        resolve();
                    });
                    break;
                case "gruvbox-dark":
                    import(
                        "react-syntax-highlighter/dist/esm/styles/prism/gruvbox-dark"
                    ).then(theme => {
                        out[key] = theme["default"];
                        resolve();
                    });
                    break;
                case "gruvbox-light":
                    import(
                        "react-syntax-highlighter/dist/esm/styles/prism/gruvbox-light"
                    ).then(theme => {
                        out[key] = theme["default"];
                        resolve();
                    });
                    break;
                case "hopscotch":
                    import(
                        "react-syntax-highlighter/dist/esm/styles/prism/hopscotch"
                    ).then(theme => {
                        out[key] = theme["default"];
                        resolve();
                    });
                    break;
                case "material-dark":
                    import(
                        "react-syntax-highlighter/dist/esm/styles/prism/material-dark"
                    ).then(theme => {
                        out[key] = theme["default"];
                        resolve();
                    });
                    break;
                case "material-light":
                    import(
                        "react-syntax-highlighter/dist/esm/styles/prism/material-light"
                    ).then(theme => {
                        out[key] = theme["default"];
                        resolve();
                    });
                    break;
                case "material-oceanic":
                    import(
                        "react-syntax-highlighter/dist/esm/styles/prism/material-oceanic"
                    ).then(theme => {
                        out[key] = theme["default"];
                        resolve();
                    });
                    break;
                case "nord":
                    import(
                        "react-syntax-highlighter/dist/esm/styles/prism/nord"
                    ).then(theme => {
                        out[key] = theme["default"];
                        resolve();
                    });
                    break;
                case "okaidia":
                    import(
                        "react-syntax-highlighter/dist/esm/styles/prism/okaidia"
                    ).then(theme => {
                        out[key] = theme["default"];
                        resolve();
                    });
                    break;
                case "pojoaque":
                    import(
                        "react-syntax-highlighter/dist/esm/styles/prism/pojoaque"
                    ).then(theme => {
                        out[key] = theme["default"];
                        resolve();
                    });
                    break;
                case "prism":
                    import(
                        "react-syntax-highlighter/dist/esm/styles/prism/prism"
                    ).then(theme => {
                        out[key] = theme["default"];
                        resolve();
                    });
                    break;
                case "shades-of-purple":
                    import(
                        "react-syntax-highlighter/dist/esm/styles/prism/shades-of-purple"
                    ).then(theme => {
                        out[key] = theme["default"];
                        resolve();
                    });
                    break;
                case "solarizedlight":
                    import(
                        "react-syntax-highlighter/dist/esm/styles/prism/solarizedlight"
                    ).then(theme => {
                        out[key] = theme["default"];
                        resolve();
                    });
                    break;
                case "synthwave84":
                    import(
                        "react-syntax-highlighter/dist/esm/styles/prism/synthwave84"
                    ).then(theme => {
                        out[key] = theme["default"];
                        resolve();
                    });
                    break;
                case "tomorrow":
                    import(
                        "react-syntax-highlighter/dist/esm/styles/prism/tomorrow"
                    ).then(theme => {
                        out[key] = theme["default"];
                        resolve();
                    });
                    break;
                case "twilight":
                    import(
                        "react-syntax-highlighter/dist/esm/styles/prism/twilight"
                    ).then(theme => {
                        out[key] = theme["default"];
                        resolve();
                    });
                    break;
                case "vs":
                    import(
                        "react-syntax-highlighter/dist/esm/styles/prism/vs"
                    ).then(theme => {
                        out[key] = theme["default"];
                        resolve();
                    });
                    break;
                case "vsc-dark-plus":
                    import(
                        "react-syntax-highlighter/dist/esm/styles/prism/vsc-dark-plus"
                    ).then(theme => {
                        out[key] = theme["default"];
                        resolve();
                    });
                    break;
                case "xonokai":
                    import(
                        "react-syntax-highlighter/dist/esm/styles/prism/xonokai"
                    ).then(theme => {
                        out[key] = theme["default"];
                        resolve();
                    });
                    break;
            }
        });
    }

    return out as {
        dark: Theme;
        light: Theme;
    };
}
