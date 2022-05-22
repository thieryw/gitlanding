import { memo } from "react";
import type { ReactNode } from "react";
import { makeStyles, breakpointsValues, Text } from "../theme";
import { GlHeaderLinks } from "./GlHeaderLinks";

export type GlHeaderProps = {
    links?: {
        label: string;
        href: string;
        onClick?: () => void;
    }[];
    title?: ReactNode;
    titleDark?: ReactNode;
    titleSmallScreen?: ReactNode;
    titleSmallScreenDark?: ReactNode;
    className?: string;
    classes?: Partial<ReturnType<typeof useStyles>["classes"]>;
    enableDarkModeSwitch?: boolean;
    githubRepoUrl?: string;
    githubButtonSize?: "normal" | "large";
    showGithubStarCount?: boolean;
    customItemStart?: NonNullable<ReactNode>;
    customItemEnd?: NonNullable<ReactNode>;
};
export const GlHeader = memo((props: GlHeaderProps) => {
    const {
        links,
        className,
        /*customItemEnd,
		customItemStart,
		enableDarkModeSwitch,
		githubButtonSize,
		githubRepoUrl,
		showGithubStarCount,*/
        title,
        titleDark,
        titleSmallScreen,
        titleSmallScreenDark,
    } = props;

    const { theme, classes, cx } = useStyles();

    return (
        <header className={cx(classes.root, className)}>
            <div>
                {(() => {
                    const transformElementIfString = (element: ReactNode) => {
                        if (typeof element === "string") {
                            return <Text typo="subtitle">{element}</Text>;
                        }
                        return element;
                    };

                    if (theme.windowInnerWidth >= breakpointsValues.md) {
                        if (!theme.isDarkModeEnabled) {
                            return transformElementIfString(title);
                        }
                        return transformElementIfString(titleDark ?? title);
                    }

                    if (!theme.isDarkModeEnabled) {
                        return transformElementIfString(
                            titleSmallScreen ?? title,
                        );
                    }

                    return transformElementIfString(
                        titleSmallScreenDark ??
                            titleSmallScreen ??
                            titleDark ??
                            title,
                    );
                })()}
            </div>

            {links !== undefined && (
                <GlHeaderLinks
                    className={classes.links}
                    links={links.map(link => ({
                        ...link,
                        classes,
                        "className": classes.linkRoot,
                    }))}
                />
            )}
        </header>
    );
});

const useStyles = makeStyles()(() => ({
    "root": {
        "display": "flex",
        "justifyContent": "space-between",
        "alignItems": "center",
    },
    "links": {},
    "linkRoot": {},
    "link": {},
    "underline": {},
}));
