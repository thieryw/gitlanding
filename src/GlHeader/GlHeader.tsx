/* eslint-disable @typescript-eslint/no-namespace */
/* eslint-disable @typescript-eslint/no-explicit-any */
import Link from "@material-ui/core/Link";
import { useNamedState } from "powerhooks/useNamedState";
import { useConstCallback } from "powerhooks/useConstCallback";
import { memo } from "react";
import { makeStyles, Text } from "../theme";
import type { ReactNode } from "react";
import { GlGithubStarCount } from "./GlGithubStarCount";
import type { GlGithubStarCountProps } from "./GlGithubStarCount";
import FormatListBulletedIcon from "@material-ui/icons/FormatListBulleted";
import { useClickAway } from "powerhooks";
import { breakpointsValues } from "../theme";
import { DarkModeSwitch } from "onyxia-ui/DarkModeSwitch";

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

const useStyles = makeStyles<{
    isMenuUnfolded: boolean;
    numberOfLinks: number;
}>()((theme, { isMenuUnfolded, numberOfLinks }) => ({
    "root": {
        "display": "flex",
        "alignItems": "center",
        "width": "100%",
        "padding": theme.spacing({
            "topBottom": 3,
            "rightLeft": 0,
        }),
        "flexWrap": (() => {
            if (theme.windowInnerWidth >= breakpointsValues.md) {
                return undefined;
            }

            return "wrap";
        })(),
    },
    "title": {
        "display": "flex",
        "flex": 1,
        "marginRight": theme.spacing(2),
    },
    "links": {
        "display": "flex",
        "transition": "height 300ms",
        ...(() => {
            if (theme.windowInnerWidth >= breakpointsValues.md) {
                return {
                    "flexWrap": "wrap",
                } as const;
            }

            return {
                "order": 123,
                "flex": "100%",
                "flexDirection": "column",
                "gap": theme.spacing(2),
                "height": isMenuUnfolded
                    ? (21 + theme.spacing(2)) * numberOfLinks
                    : 0,
                "overflow": "hidden",
                "flexWrap": "nowrap",
                "marginTop": theme.spacing(2),
            } as const;
        })(),
    },
    "linkWrapper": {
        ...(() => {
            const leftRight = theme.spacing(4);
            const topBottom = theme.spacing(1);
            return {
                "marginRight": leftRight,
                "marginTop": topBottom,
                "marginBottom": topBottom,
                "marginLeft": (() => {
                    if (theme.windowInnerWidth >= breakpointsValues.md) {
                        return leftRight;
                    }

                    return 0;
                })(),
            };
        })(),
    },

    "link": {
        "color": theme.colors.useCases.typography.textPrimary,
        "whiteSpace": "nowrap",
        ...theme.typography.variants["body 1"].style,
    },
    "unfoldIcon": {
        "cursor": "pointer",
        "marginLeft": theme.spacing(2),
        "display": (() => {
            if (theme.windowInnerWidth >= breakpointsValues.md) {
                return "none";
            }

            return "flex";
        })(),
    },
    "githubStarAndDarkModeSwitch": {
        //"margin": theme.spacing(0, 2),
        "margin": theme.spacing({
            "topBottom": 0,
            "rightLeft": 2,
        }),
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

    const { rootRef } = useClickAway(() => {
        setIsMenuUnfolded(false);
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
                        <Link
                            underline="hover"
                            className={classes.link}
                            {...link}
                        >
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
                <DarkModeSwitch
                    className={classes.githubStarAndDarkModeSwitch}
                />
            )}

            <FormatListBulletedIcon
                ref={rootRef}
                onClick={unfoldLinks}
                className={classes.unfoldIcon}
            />
        </header>
    );
});
