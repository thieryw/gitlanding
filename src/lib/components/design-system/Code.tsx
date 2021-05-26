import { CodeBlock, dracula } from "react-code-blocks";
import { memo } from "react";

export type Props = {
    text?: string;
    language?: string;
    showLineNumbers?: boolean;
    className?: string;
};

export const Code = memo((props: Props) => {
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
