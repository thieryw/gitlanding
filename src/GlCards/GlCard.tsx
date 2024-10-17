import type { ReactNode } from "react";
import { memo } from "react";
import { tss } from "../tss";

export type GlCardProps = {
    className?: string;
    children?: ReactNode;
    link?: {
        href: string;
        onClick?: () => void;
    };
};

export const GlCard = memo((props: GlCardProps) => {
    const { children, link, className } = props;

    const { classes, cx } = useStyles({ "isLink": link !== undefined });

    const onClick = (() => {
        if (link === undefined) {
            return undefined;
        }

        return () => window.open(link.href, "_blank");
    })();

    return (
        <div className={cx(classes.root, className)} onClick={onClick}>
            {children}
        </div>
    );
});

const useStyles = tss
    .withName({ GlCard })
    .withParams<{ isLink: boolean }>()
    .create(({ theme, isLink }) => ({
        "root": {
            "borderRadius": 16,
            "transition": "box-shadow 200ms",
            "margin": theme.spacing(2),
            "boxShadow": theme.shadows[1],
            "backgroundColor": theme.colors.useCases.surfaces.surface1,
            "cursor": isLink ? "pointer" : undefined,
            ":hover": {
                "boxShadow": theme.shadows[2],
            },
        },
    }));
