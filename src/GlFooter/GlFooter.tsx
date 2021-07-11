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
    iconLinks?: {
        iconUrl: string;
        link: Link;
    }[];
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
            ...(() => {
                const value = theme.spacing(6);

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
            "gap": theme.spacing(4),
            "marginBottom": theme.spacing(3),
        },
        "link": {
            "color": theme.colors.useCases.typography.textPrimary,
        },
        "links": {
            "display": "flex",
            "flexDirection": "row",
            "gap": theme.spacing(4),
            "marginTop": theme.spacing(3),
            "marginBottom": theme.spacing(6),
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
                    {iconLinks.map(iconLink => (
                        <div
                            onClick={
                                iconLink.link.onClick ??
                                (() =>
                                    (window.location.href =
                                        iconLink.link.href ?? "#"))
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
                    {links.map(link => (
                        <Link
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
