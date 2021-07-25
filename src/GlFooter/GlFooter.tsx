import type { ReactNode } from "react";
import { memo } from "react";
import { GlLogo } from "../utils/GlLogo";
import Link from "@material-ui/core/Link";
import { makeStyles } from "../theme";

type Link = {
    href: string;
    onClick?: () => void;
};

export type GlFooterProps = {
    className?: string;
    iconLinks?: (Link & { iconUrl: string })[];
    links?: (Link & { title: string })[];
    info?: ReactNode;
    bottomDiv?: ReactNode;
};

const useStyles = makeStyles()(theme => ({
    "root": {
        "display": "flex",
        "flexDirection": "column",
        "alignItems": "center",
        "justifyContent": "center",
        "marginTop": theme.spacing(8),
        "backgroundColor": theme.colors.useCases.surfaces.surface2,
        ...(() => {
            const value = theme.spacing(4);

            return {
                "paddingTop": value,
            };
        })(),
    },
    "icon": {
        "transition": "transform 200ms",
        ":hover": {
            "cursor": "pointer",
            "transform": "scale(1.2)",
        },
        ...(() => {
            const value = theme.spacing(5);

            return {
                "width": value,
                "height": value,
                "& svg": {
                    "width": value,
                    "height": value,
                },
            };
        })(),
    },
    "icons": {
        "display": "flex",
        "flexDirection": "row",
        "flexWrap": "wrap",
        "justifyContent": "center",
        "gap": theme.spacing(4),
        "marginBottom": theme.spacing(3),
        "marginTop": theme.spacing(2),
    },
    "link": {
        "color": theme.colors.useCases.typography.textPrimary,
    },
    "links": {
        "display": "flex",
        "flexDirection": "row",
        "flexWrap": "wrap",
        "justifyContent": "center",
        "gap": theme.spacing(4),
        "marginTop": theme.spacing(3),
        "marginBottom": theme.spacing(3),
    },
}));

export const GlFooter = memo((props: GlFooterProps) => {
    const { bottomDiv, className, info, iconLinks, links } = props;

    const { classes, cx } = useStyles();

    return (
        <footer className={cx(classes.root, className)}>
            {iconLinks !== undefined && (
                <div className={classes.icons}>
                    {iconLinks.map((iconLink, index) => (
                        <div
                            key={index}
                            onClick={
                                iconLink.onClick ??
                                (() =>
                                    (window.location.href =
                                        iconLink.href ?? "#"))
                            }
                        >
                            <GlLogo
                                className={classes.icon}
                                logoUrl={iconLink.iconUrl}
                            />
                        </div>
                    ))}
                </div>
            )}

            {links !== undefined && (
                <div className={classes.links}>
                    {links.map((link, index) => (
                        <Link
                            key={index}
                            href={link.href}
                            onClick={link.onClick}
                            className={classes.link}
                        >
                            {link.title}
                        </Link>
                    ))}
                </div>
            )}

            {info}

            {bottomDiv}
        </footer>
    );
});
