import { CodeBlock, dracula } from "react-code-blocks";
import { memo } from "react";
import { getThemeApi } from "../theme";
import { useGuaranteedMemo } from "powerhooks";
import { cx } from "tss-react";

const getUseClassNames = () => {
    const { createUseClassNames } = getThemeApi();

    const { useClassNames } = createUseClassNames()(() => ({
        "root": {
            "& code": {
                "width": 0,
            },
        },
    }));

    return { useClassNames };
};

export type GlCodeProps = {
    text?: string;
    language?: string;
    showLineNumbers?: boolean;
    className?: string;
};

export const GlCode = memo((props: GlCodeProps) => {
    const { className, language, showLineNumbers, text } = props;

    const { useClassNames } = useGuaranteedMemo(() => getUseClassNames(), []);

    const { classNames } = useClassNames({});

    return (
        <div className={cx(classNames.root, className)}>
            <CodeBlock
                language={language}
                showLineNumbers={showLineNumbers}
                text={text}
                theme={dracula}
            />
        </div>
    );
});
