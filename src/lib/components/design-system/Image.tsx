import { VsCodeButtons } from "./VsCodeButtons";
import { createUseClassNames } from "../../theme/useClassesNames";
import { cx } from "tss-react";
import { memo } from "react";

export type Props = {
    url: string;
    hasVsCodeFrame?: boolean;
    className?: string;
    alt?: string;
};

const { useClassNames } = createUseClassNames<{ hasVsCodeFrame?: boolean }>()(
    (theme, { hasVsCodeFrame }) => ({
        "root": {
            "position": "relative",
            "boxShadow": theme.palette.type === "dark" ? "" : "-2px 0px 10px 0px rgba(0,0,0,0.75)",

            "& >img": {
                "width": "100%",
                "height": "100%",
                "objectFit": "cover",
                "verticalAlign": "middle",
            },

            "borderRadius": hasVsCodeFrame && hasVsCodeFrame !== undefined ? 5 : "",
            "border":
                hasVsCodeFrame && hasVsCodeFrame !== undefined
                    ? `solid ${theme.custom.color.palette.visualStudioCodeColor} 24px`
                    : "",
        },
    }),
);

export const Image = memo((props: Props) => {
    const { className, url, hasVsCodeFrame, alt } = props;
    const { classNames } = useClassNames({ hasVsCodeFrame });

    return (
        <div className={cx(classNames.root, className)}>
            {hasVsCodeFrame !== undefined && hasVsCodeFrame && <VsCodeButtons />}
            <img src={url} alt={alt} />
        </div>
    );
});
