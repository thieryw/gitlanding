/* eslint-disable @typescript-eslint/no-namespace */
/* eslint-disable @typescript-eslint/no-explicit-any */
//import List from "@material-ui/core/List";
import Link from "@material-ui/core/Link";
//import { useNamedState } from "powerhooks/useNamedState";
//import { useConstCallback } from "powerhooks/useConstCallback";
import { cx } from "tss-react";
//import { useClickAway } from "powerhooks/useClickAway";
import { memo } from "react";
import { Typography } from "onyxia-ui/Typography";
//import { GlIcon } from "../GlIcon";
import { getThemeApi } from "../theme";
import { useGuaranteedMemo } from "powerhooks";
import type { ReactNode } from "react";
import { GlDarkModeSwitch } from "./GlDarkModeSwitch";
import { GlGithubStarCount } from "./GlGithubStarCount";
import type { GlGithubStarCountProps } from "./GlGithubStarCount";

export type GlHeaderProps = {
    className?: string;
    title?: ReactNode;
    links?: {
        label: string;
        link: {
            href: string;
            onClick?(): void;
        };
    }[];
    enableDarkModeSwitch?: boolean;
    githubRepoUrl?: GlGithubStarCountProps["repoUrl"];
    githubButtonSize?: GlGithubStarCountProps["size"];
};

const getUseClassNames = () => {
    const { createUseClassNames } = getThemeApi();

    const { useClassNames } = createUseClassNames()(theme => ({
        "root": {
            "display": "flex",
            "alignItems": "center",
            "width": "100%",
            "gap": theme.spacing(4),
            "height": 80,
            "padding": theme.spacing(0, 4),
        },
        "title": {
            "flex": 1,
        },
        "linkWrapper": {
            "display": "flex",
            "gap": theme.spacing(4),
        },

        "link": {
            "color": theme.colors.useCases.typography.textPrimary,
            "fontSize": "22px",
            ...(theme.responsive.down("lg")
                ? {
                      "fontSize": "14px",
                      "lineHeight": "24px",
                  }
                : {}),
        },
    }));

    return { useClassNames };
};

export const GlHeader = memo((props: GlHeaderProps) => {
    const {
        className,
        title,
        links,
        enableDarkModeSwitch,
        githubButtonSize,
        githubRepoUrl,
    } = props;

    const { useClassNames } = useGuaranteedMemo(() => getUseClassNames(), []);

    const { classNames } = useClassNames({});

    return (
        <header className={cx(classNames.root, className)}>
            <div className={classNames.title}>
                {title !== undefined &&
                    (typeof title === "string" ? (
                        <Typography variant="h3">{title}</Typography>
                    ) : (
                        title
                    ))}
            </div>

            <div className={classNames.linkWrapper}>
                {links !== undefined &&
                    links.map(({ link, label }) => (
                        <Link className={classNames.link} key={label} {...link}>
                            {label}
                        </Link>
                    ))}
            </div>

            {githubRepoUrl !== undefined && (
                <GlGithubStarCount
                    repoUrl={githubRepoUrl}
                    size={githubButtonSize}
                />
            )}

            {enableDarkModeSwitch !== undefined && enableDarkModeSwitch && (
                <GlDarkModeSwitch />
            )}
        </header>
    );
});
