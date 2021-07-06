import type { ReactNode } from "react";
import { memo } from "react";
import { getThemeApi } from "../theme";
import { useGuaranteedMemo } from "powerhooks";
import { cx } from "tss-react";

export type GlSlideProps = {
    className?: string;
    children?: ReactNode;
};

const getUseClassNames = () => {
    const { createUseClassNames } = getThemeApi();

    const { useClassNames } = createUseClassNames()(theme => ({
        "root": {
            "position": "relative",
            "minWidth": "100%",
            "display": "flex",
            "justifyContent": "center",
            "overflow": "hidden",
            ...(() => {
                const value = theme.spacing(4);
                return {
                    "paddingLeft": value,
                    "paddingRight": value,
                };
            })(),
        },
    }));

    return { useClassNames };
};

export const GlSlide = memo((props: GlSlideProps) => {
    const { children, className } = props;

    const { useClassNames } = useGuaranteedMemo(() => getUseClassNames(), []);

    const { classNames } = useClassNames({});

    return <div className={cx(classNames.root, className)}>{children}</div>;
});
