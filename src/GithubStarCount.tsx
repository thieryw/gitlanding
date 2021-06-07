import { cx } from "tss-react";
import { memo, useEffect } from "react";
import { createUseClassNames } from "./theme";
import { useIsDarkModeEnabled } from "onyxia-ui";

export type GithubStarCountProps = {
    className?: string;
    size: "normal" | "large";
    repoUrl: string;
};

const { useClassNames } = createUseClassNames()(() => ({
    "root": {
        "& span": {
            "display": "flex",
            "alignItems": "center",
        },
    },
}));

export const GithubStarCount = memo((props: GithubStarCountProps) => {
    const { size, repoUrl, className } = props;

    useEffect(() => {
        const script = document.createElement("script");

        script.src = "https://buttons.github.io/buttons.js";
        script.async = true;

        document.body.appendChild(script);

        return () => {
            document.body.removeChild(script);
        };
    }, []);

    const { classNames } = useClassNames({});

    const { isDarkModeEnabled } = useIsDarkModeEnabled();

    return (
        <div className={cx(classNames.root, className)}>
            <a
                className="github-button"
                href={repoUrl}
                data-color-scheme={["no-preference", "light", "dark"]
                    .map(prefix => `${prefix}: ${isDarkModeEnabled ? "dark" : "light"};`)
                    .join("\n")}
                data-icon="octicon-star"
                data-size={size === "large" ? "large" : ""}
                data-show-count="true"
            >
                Star
            </a>
        </div>
    );
});
