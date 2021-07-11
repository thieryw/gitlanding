import type { ReactNode } from "react";
import { memo } from "react";
import { GlLogo } from "../utils/GlLogo";
import Link from "@material-ui/core/Link";

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

export const GlFooter = memo((props: GlFooterProps) => {
    const { bottomDiv, className, info, iconLinks, links } = props;

    return (
        <footer className={className}>
            {iconLinks !== undefined &&
                iconLinks.map(iconLink => (
                    <div
                        onClick={
                            iconLink.link.onClick ??
                            (() =>
                                (window.location.href =
                                    iconLink.link.href ?? "#"))
                        }
                    >
                        <GlLogo logoUrl={iconLink.iconUrl} />
                    </div>
                ))}

            {links !== undefined &&
                links.map(link => (
                    <Link href={link.href} onClick={link.onClick}>
                        {link.title}
                    </Link>
                ))}

            <div>{info}</div>

            <div>{bottomDiv}</div>
        </footer>
    );
});
