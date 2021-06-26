/* eslint-disable @typescript-eslint/no-namespace */
/* eslint-disable @typescript-eslint/no-explicit-any */
//import List from "@material-ui/core/List";
import Link from "@material-ui/core/Link";
import { useNamedState } from "powerhooks/useNamedState";
import { useConstCallback } from "powerhooks/useConstCallback";
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
import FormatListBulletedIcon from "@material-ui/icons/FormatListBulleted";

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

    const { useClassNames } = createUseClassNames<{
        isMenuUnfolded: boolean;
        numberOfLinks: number;
    }>()((theme, { isMenuUnfolded, numberOfLinks }) => ({
        "root": {
            "display": "flex",
            "alignItems": "center",
            "width": "100%",
            "gap": theme.spacing(4),
            "padding": theme.spacing(2, 4),
            ...(theme.responsive.down("md")
                ? {
                      "flexWrap": "wrap",
                  }
                : {}),
        },
        "title": {
            "flex": 1,
        },
        "links": {
            "display": "flex",
            "gap": theme.spacing(4),
            "transition": "height 300ms",
            ...(theme.responsive.down("md")
                ? {
                      "order": 123,
                      "flex": "100%",
                      "flexDirection": "column",
                      "gap": theme.spacing(1),
                      "height": isMenuUnfolded
                          ? (21 + theme.spacing(1)) * numberOfLinks
                          : 0,
                      "overflow": "hidden",
                  }
                : {}),
        },

        "link": {
            "color": theme.colors.useCases.typography.textPrimary,
            "fontSize": "18px",
        },

        "unfoldIcon": {
            "display": "none",
            "cursor": "pointer",
            ...(theme.responsive.down("md")
                ? {
                      "display": "flex",
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

    const { isMenuUnfolded, setIsMenuUnfolded } = useNamedState(
        "isMenuUnfolded",
        false,
    );

    const unfoldLinks = useConstCallback(() => {
        setIsMenuUnfolded(!isMenuUnfolded);
    });

    const { classNames } = useClassNames({
        isMenuUnfolded,
        "numberOfLinks": links !== undefined ? links.length : 0,
    });

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

            <div className={classNames.links}>
                {links !== undefined &&
                    links.map(({ link, label }) => (
                        <div key={label}>
                            <Link className={classNames.link} {...link}>
                                {label}
                            </Link>
                        </div>
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

            <FormatListBulletedIcon
                onClick={unfoldLinks}
                className={classNames.unfoldIcon}
            />
        </header>
    );
});
