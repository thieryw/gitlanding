import { memo } from "react";
import { useIsDarkModeEnabled } from "onyxia-ui/lib";
import { makeStyles } from "../theme";
import GithubBtn from "react-github-btn";

export type GlGithubStarCountProps = {
    className?: string;
    size?: "normal" | "large";
    repoUrl: string;
    showCount?: boolean;
};

const useStyles = makeStyles()({
    "root": {
        "& span": {
            "display": "flex",
            "alignItems": "center",
        },
    },
});

export const GlGithubStarCount = memo((props: GlGithubStarCountProps) => {
    const { repoUrl, size, className, showCount } = props;

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
                data-show-count={`${showCount ?? false}`}
            >
                Star
            </GithubBtn>
        </div>
    );
});
