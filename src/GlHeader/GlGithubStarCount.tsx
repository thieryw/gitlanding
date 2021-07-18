import { memo } from "react";
import { useIsDarkModeEnabled } from "onyxia-ui/lib";

import { getThemeApi } from "../theme";
import { useGuaranteedMemo } from "powerhooks/useGuaranteedMemo";
import GithubBtn from "react-github-btn";

export type GlGithubStarCountProps = {
    className?: string;
    size?: "normal" | "large";
    repoUrl: string;
};

const getUseStyles = () => {
    const { makeStyles } = getThemeApi();

    const { useStyles } = makeStyles()({
        "root": {
            "& span": {
                "display": "flex",
                "alignItems": "center",
            },
        },
    });

    return { useStyles };
};

export const GlGithubStarCount = memo((props: GlGithubStarCountProps) => {
    const { repoUrl, size, className } = props;

    const { useStyles } = useGuaranteedMemo(() => getUseStyles(), []);
    const { classes, cx } = useStyles();

    const { themeVariant } = (function useClosure() {
        const { isDarkModeEnabled } = useIsDarkModeEnabled();

        const themeVariant = isDarkModeEnabled ? "dark" : ("light" as const);

        return { themeVariant };
    })();

    return (
        <div className={cx(classes.root, className)}>
            <GithubBtn
                href={repoUrl}
                data-color-scheme={[
                    "no-preference: light;",
                    ...["light", "dark"].map(
                        osPref => `${osPref}: ${themeVariant};`,
                    ),
                ].join("\n")}
                data-icon="octicon-star"
                data-size={size === "large" ? size : ""}
            >
                Star
            </GithubBtn>
        </div>
    );
});
