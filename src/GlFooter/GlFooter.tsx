import type { ReactNode } from "react";
import { memo } from "react";
import { GlLogo } from "../utils/GlLogo";
import Link from "@material-ui/core/Link";
import { getThemeApi } from "../theme";
import { useGuaranteedMemo } from "powerhooks";
import { cx } from "tss-react";

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

const getUseClassNames = () => {
    const { createUseClassNames } = getThemeApi();

    const { useClassNames } = createUseClassNames()(theme => ({
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
                    "paddingLeft": value,
                    "paddingRight": value,
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

    return { useClassNames };
};

export const GlFooter = memo((props: GlFooterProps) => {
    const { bottomDiv, className, info, iconLinks, links } = props;

    const { useClassNames } = useGuaranteedMemo(() => getUseClassNames(), []);

    const { classNames } = useClassNames({});

    return (
        <footer className={cx(classNames.root, className)}>
            {iconLinks !== undefined && (
                <div className={classNames.icons}>
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
                                className={classNames.icon}
                                logoUrl={iconLink.iconUrl}
                            />
                        </div>
                    ))}
                </div>
            )}

            {links !== undefined && (
                <div className={classNames.links}>
                    {links.map((link, index) => (
                        <Link
                            key={index}
                            href={link.href}
                            onClick={link.onClick}
                            className={classNames.link}
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
