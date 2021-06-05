import { css, cx } from "tss-react";
import { memo, useEffect } from "react";

type Props = {
    size: "normal" | "large";
    repoUrl: string;
    className?: string;
};

export const GithubStarCount = memo((props: Props) => {
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

    return (
        <div
            className={cx(
                className,
                css({
                    "& span": {
                        "display": "flex",
                        "alignItems": "center",
                    },
                }),
            )}
        >
            <a
                className="github-button"
                href={repoUrl}
                data-color-scheme={`
                        no-preference: light; 
                        light: light; 
                        dark: light;
                    `}
                data-icon="octicon-star"
                data-size={size === "large" ? "large" : ""}
                data-show-count="true"
                aria-label="Star garronej/powerhooks on GitHub"
            >
                Star
            </a>
        </div>
    );
});
