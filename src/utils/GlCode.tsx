import { CodeBlock, dracula } from "react-code-blocks";
import { memo } from "react";

export type GlCodeProps = {
    text?: string;
    language?: string;
    showLineNumbers?: boolean;
    className?: string;
};

export const GlCode = memo((props: GlCodeProps) => {
    const { className, language, showLineNumbers, text } = props;

    return (
        <div className={className}>
            <CodeBlock
                language={language}
                showLineNumbers={showLineNumbers}
                text={text}
                theme={dracula}
            />
        </div>
    );
});
