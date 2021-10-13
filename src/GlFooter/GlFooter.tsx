import { memo } from "react";
import { GlLogo } from "../utils/GlLogo";
import Link from "@mui/material/Link";
import { makeStyles } from "../theme";
import ReactMarkDown from "react-markdown";
import { GlFooterInfo } from "./GlFooterInfo";

type Link = {
    href: string;
    onClick?: () => void;
};

export type GlFooterProps = {
    className?: string;
    classes?: {
        iconsLinks?: string;
        iconWrapper?: string;
        icon?: string;
        links?: string;
        link?: string;
        info?: string;
        bottomDiv?: string;
    };
    iconLinks?: (Link & { iconUrl: string })[];
    links?: (Link & { title: string })[];
    bottomDivContent?: string;
    email?: string;
    phoneNumber?: string;
};

const useStyles = makeStyles()(theme => ({
    "root": {
        "display": "flex",
        "flexDirection": "column",
        "alignItems": "center",
        "justifyContent": "center",
        "marginTop": theme.spacing(7),
        "backgroundColor": theme.colors.useCases.surfaces.surface2,
        ...(() => {
            const value = theme.spacing(4);

            return {
                "paddingTop": value,
            };
        })(),
        ...theme.spacing.rightLeft("padding", `${theme.paddingRightLeft}px`),
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
    "bottomDiv": {
        "borderTop": `solid ${theme.colors.useCases.typography.textDisabled} 1px`,
        "marginTop": theme.spacing(3),
        "width": "100%",
        "display": "flex",
        "justifyContent": "center",
        "alignItems": "center",
    },
}));

export const GlFooter = memo((props: GlFooterProps) => {
    const {
        bottomDivContent,
        className,
        email,
        phoneNumber,
        iconLinks,
        links,
        classes: classesProp,
    } = props;

    const { classes, cx } = useStyles();

    return (
        <footer className={cx(classes.root, className)}>
            {iconLinks !== undefined && (
                <div className={cx(classes.icons, classesProp?.iconsLinks)}>
                    {iconLinks.map((iconLink, index) => (
                        <div
                            key={index}
                            onClick={
                                iconLink.onClick ??
                                (() =>
                                    (window.location.href =
                                        iconLink.href ?? "#"))
                            }
                            className={classesProp?.iconWrapper}
                        >
                            <GlLogo
                                className={cx(classes.icon, classesProp?.icon)}
                                logoUrl={iconLink.iconUrl}
                            />
                        </div>
                    ))}
                </div>
            )}

            {links !== undefined && (
                <div className={cx(classes.links, classesProp?.links)}>
                    {links.map((link, index) => (
                        <Link
                            key={index}
                            href={link.href}
                            onClick={link.onClick}
                            className={cx(classes.link, classesProp?.link)}
                            underline="hover"
                        >
                            {link.title}
                        </Link>
                    ))}
                </div>
            )}

            {(email !== undefined || phoneNumber !== undefined) && (
                <GlFooterInfo
                    className={classesProp?.info}
                    email={email}
                    phoneNumber={phoneNumber}
                />
            )}

            {bottomDivContent !== undefined && (
                <div className={cx(classes.bottomDiv, classesProp?.bottomDiv)}>
                    <ReactMarkDown>{bottomDivContent}</ReactMarkDown>
                </div>
            )}
        </footer>
    );
});
