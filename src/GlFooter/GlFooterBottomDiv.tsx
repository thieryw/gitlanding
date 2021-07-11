import ReactMarkDown from "react-markdown";
import { getThemeApi } from "../theme";
import { memo } from "react";
import { useGuaranteedMemo } from "powerhooks";
import type { ReactNode } from "react";
import { cx } from "tss-react";

const getUseClassNames = () => {
    const { createUseClassNames } = getThemeApi();

    const { useClassNames } = createUseClassNames()(theme => ({
        "root": {
            "borderTop": `solid ${theme.colors.useCases.typography.textDisabled} 1px`,
            "marginTop": theme.spacing(6),
            "width": "100%",
            "display": "flex",
            "justifyContent": "center",
            "alignItems": "center",
        },
    }));

    return { useClassNames };
};

export type GlFooterBottomDivProps = {
    className?: string;
    contentMd?: string;
    children?: ReactNode;
};

export const GlFooterBottomDiv = memo((props: GlFooterBottomDivProps) => {
    const { contentMd, children, className } = props;

    const { useClassNames } = useGuaranteedMemo(() => getUseClassNames(), []);

    const { classNames } = useClassNames({});

    return (
        <div className={cx(classNames.root, className)}>
            {contentMd !== undefined && (
                <ReactMarkDown>{contentMd}</ReactMarkDown>
            )}

            {children}
        </div>
    );
});
