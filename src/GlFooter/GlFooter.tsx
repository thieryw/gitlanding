import { memo } from "react";
import type { ReactNode } from "react";
import { GlLogo } from "../utils/GlLogo";
import Link from "@mui/material/Link";
import { makeStyles } from "../theme";
import { GlFooterInfo } from "./GlFooterInfo";
import { Markdown } from "../tools/Markdown";
import { useMergedClasses } from "tss-react";

type Link = {
    href: string;
    onClick?: () => void;
};

export type GlFooterProps = {
    className?: string;
    classes?: Partial<ReturnType<typeof useStyles>["classes"]>;
    iconLinks?: (Link & { iconUrl: string })[];
    links?: (Link & { label: ReactNode })[];
    bottomDivContent?: string;
    email?: string;
    phoneNumber?: string;
};

export const GlFooter = memo((props: GlFooterProps) => {
    const {
        bottomDivContent,
        className,
        email,
        phoneNumber,
        iconLinks,
        links,
    } = props;

    let { classes, cx } = useStyles();
    classes = useMergedClasses(classes, props.classes);

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
                            className={classes.iconWrapper}
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
                            underline="hover"
                        >
                            {link.label}
                        </Link>
                    ))}
                </div>
            )}

            {(email !== undefined || phoneNumber !== undefined) && (
                <GlFooterInfo
                    className={classes.info}
                    email={email}
                    phoneNumber={phoneNumber}
                />
            )}

            {bottomDivContent !== undefined && (
                <div className={classes.bottomDiv}>
                    <Markdown>{bottomDivContent}</Markdown>
                </div>
            )}
        </footer>
    );
});

const useStyles = makeStyles({ "name": { GlFooter } })(theme => ({
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
        "margin": theme.spacing({
            "rightLeft": 2,
            "topBottom": 2,
        }),
    },
    "links": {
        "display": "flex",
        "flexDirection": "row",
        "flexWrap": "wrap",
        "justifyContent": "center",
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
    "iconWrapper": {},
    "info": {},
}));
