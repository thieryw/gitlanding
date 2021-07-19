/* eslint-disable @typescript-eslint/no-namespace */
/* eslint-disable @typescript-eslint/no-explicit-any */
import Link from "@material-ui/core/Link";
import { useNamedState } from "powerhooks/useNamedState";
import { useConstCallback } from "powerhooks/useConstCallback";

import { memo } from "react";
import { makeStyles, Text } from "../theme";
import type { ReactNode } from "react";
import { GlDarkModeSwitch } from "./GlDarkModeSwitch";
import { GlGithubStarCount } from "./GlGithubStarCount";
import type { GlGithubStarCountProps } from "./GlGithubStarCount";
import FormatListBulletedIcon from "@material-ui/icons/FormatListBulleted";

export type GlHeaderProps = {
    className?: string;
    title: ReactNode;
    links: {
        label: string;
        link: {
            href: string;
            onClick?(): void;
        };
    }[];
    enableDarkModeSwitch?: boolean;
    githubRepoUrl?: GlGithubStarCountProps["repoUrl"];
    githubButtonSize?: GlGithubStarCountProps["size"];
    isCollapsible?: boolean;
};

const { useStyles } = makeStyles<{
    isMenuUnfolded: boolean;
    numberOfLinks: number;
}>()((theme, { isMenuUnfolded, numberOfLinks }) => ({
    "root": {
        "display": "flex",
        "alignItems": "center",
        "width": "100%",
        "padding": theme.spacing(2, 4),
        ...(theme.responsive.down("md")
            ? {
                  "flexWrap": "wrap",
              }
            : {}),
    },
    "title": {
        "display": "flex",
        "flex": 1,
        "marginRight": theme.spacing(2),
    },
    "links": {
        "display": "flex",
        "transition": "height 300ms",
        "flexWrap": "wrap",
        ...(theme.responsive.down("md")
            ? {
                  "order": 123,
                  "flex": "100%",
                  "flexDirection": "column",
                  "gap": theme.spacing(1),
                  "height": isMenuUnfolded
                      ? (21 + theme.spacing(2)) * numberOfLinks
                      : 0,
                  "overflow": "hidden",
                  "flexWrap": "nowrap",
              }
            : {}),
    },

    "linkWrapper": {
        ...(() => {
            const leftRight = theme.spacing(2);
            const topBottom = theme.spacing(1);
            return {
                "marginLeft": leftRight,
                "marginRight": leftRight,
                "marginTop": topBottom,
                "marginBottom": topBottom,
                ...(theme.responsive.down("md")
                    ? {
                          ...(() => {
                              const value = 0;
                              return {
                                  "marginLeft": value,
                              };
                          })(),
                      }
                    : {}),
            };
        })(),
    },

    "link": {
        "color": theme.colors.useCases.typography.textPrimary,
        "fontSize": "18px",
        "whiteSpace": "nowrap",
    },

    "unfoldIcon": {
        "display": "none",
        "cursor": "pointer",
        "marginLeft": theme.spacing(2),
        ...(theme.responsive.down("md")
            ? {
                  "display": "flex",
              }
            : {}),
    },

    "githubStarAndDarkModeSwitch": {
        ...(() => {
            const value = theme.spacing(2);

            return {
                "marginLeft": value,
                "marginRight": value,
            };
        })(),
    },
}));

export const GlHeader = memo((props: GlHeaderProps) => {
    const {
        className,
        title,
        links,
        enableDarkModeSwitch,
        githubButtonSize,
        githubRepoUrl,
    } = props;

    const { isMenuUnfolded, setIsMenuUnfolded } = useNamedState(
        "isMenuUnfolded",
        false,
    );

    const unfoldLinks = useConstCallback(() => {
        setIsMenuUnfolded(!isMenuUnfolded);
    });

    const { classes, cx } = useStyles({
        isMenuUnfolded,
        "numberOfLinks": links !== undefined ? links.length : 0,
    });

    return (
        <header className={cx(classes.root, className)}>
            <div className={classes.title}>
                {typeof title === "string" ? (
                    <div>
                        <Text typo="subtitle">{title}</Text>
                    </div>
                ) : (
                    <div>{title}</div>
                )}
            </div>

            <div className={classes.links}>
                {links.map(({ link, label }) => (
                    <div className={classes.linkWrapper} key={label}>
                        <Link className={classes.link} {...link}>
                            {label}
                        </Link>
                    </div>
                ))}
            </div>

            {githubRepoUrl !== undefined && (
                <GlGithubStarCount
                    repoUrl={githubRepoUrl}
                    size={githubButtonSize}
                    className={classes.githubStarAndDarkModeSwitch}
                />
            )}

            {enableDarkModeSwitch !== undefined && enableDarkModeSwitch && (
                <GlDarkModeSwitch
                    className={classes.githubStarAndDarkModeSwitch}
                />
            )}

            <FormatListBulletedIcon
                onClick={unfoldLinks}
                className={classes.unfoldIcon}
            />
        </header>
    );
});
