import { memo /*useEffect*/ } from "react";
import { useIsDarkModeEnabled } from "onyxia-ui/lib";
import { cx } from "tss-react";
import { getThemeApi } from "../theme";
import { useGuaranteedMemo } from "powerhooks";
import GithubBtn from "react-github-btn";

export type GlGithubStarCountProps = {
    className?: string;
    size?: "normal" | "large";
    repoUrl: string;
};

const getUseClassNames = () => {
    const { createUseClassNames } = getThemeApi();

    const { useClassNames } = createUseClassNames()(() => ({
        "root": {
            "& span": {
                "display": "flex",
                "alignItems": "center",
            },
        },
    }));

    return { useClassNames };
};

export const GlGithubStarCount = memo((props: GlGithubStarCountProps) => {
    const { repoUrl, size, className } = props;

    const { useClassNames } = useGuaranteedMemo(() => getUseClassNames(), []);
    const { classNames } = useClassNames({});

    return (
        <div className={cx(classNames.root, className)}>
            <GithubBtn
                href={repoUrl}
                data-color-scheme={`
                    no-preference: light; 
                    light: light; 
                    dark: ${useIsDarkModeEnabled().isDarkModeEnabled ? "dark" : "light"};
                `}
                data-icon="octicon-star"
                data-size={size === "large" ? size : ""}
            >
                Star
            </GithubBtn>
        </div>
    );
});
