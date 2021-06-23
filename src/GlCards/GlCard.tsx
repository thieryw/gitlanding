import type { ReactNode } from "react";
import { memo } from "react";
import { getThemeApi } from "../theme";
import { useGuaranteedMemo } from "powerhooks";
import { cx } from "tss-react";

const getUseClassNames = () => {
    const { createUseClassNames } = getThemeApi();
    const { useClassNames } = createUseClassNames()(theme => ({
        "root": {
            "borderRadius": 16,
            "transition": "box-shadow 200ms",
            "margin": theme.spacing(1.5),
            "boxShadow": theme.shadows[1],
            "backgroundColor": theme.colors.useCases.surfaces.surface1,
            ":hover": {
                "boxShadow": theme.shadows[2],
                "cursor": "pointer",
            },
        },
    }));

    return { useClassNames };
};

export type GlCardProps = {
    className?: string;
    children?: ReactNode;
    link?: {
        href?: string;
        onClick?: () => void;
    };
};

export const GlCard = memo((props: GlCardProps) => {
    const { children, link, className } = props;
    const { useClassNames } = useGuaranteedMemo(() => getUseClassNames(), []);

    const { classNames } = useClassNames({});

    return (
        <div
            onClick={
                link?.onClick ??
                (() => (window.location.href = link?.href ?? "#"))
            }
            className={cx(classNames.root, className)}
        >
            {children}
        </div>
    );
});
