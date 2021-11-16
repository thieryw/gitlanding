import { GlImage } from "./utils/GlImage";
import type { GlImageProps } from "./utils/GlImage";
import { GlCodeBlock } from "./GlCodeBlock";
import type { GlCodeBlockProps } from "./GlCodeBlock";
import { memo } from "react";
import { makeStyles } from "./theme";

export declare namespace GlIllustrationProps {
    export type Illustration = Illustration.Code | Illustration.Image;

    export namespace Illustration {
        type Code = { type: "code" } & GlCodeBlockProps;
        type Image = { type: "image" } & GlImageProps;
    }
}

export type GlIllustrationProps = {
    hasShadow?: boolean;
} & GlIllustrationProps.Illustration;

export const GlIllustration = memo((props: GlIllustrationProps) => {
    const { className, hasShadow } = props;

    const { classes, cx } = useStyles();

    return (
        <div className={cx(classes.root, className)}>
            {props.type === "image" ? (
                <GlImage
                    url={props.url}
                    alt={props.alt}
                    className={cx(classes.content, props.className)}
                    hasShadow={hasShadow}
                />
            ) : (
                <GlCodeBlock
                    text={props.text}
                    language={props.language}
                    showLineNumbers={props.showLineNumbers}
                    hasDecorativeVsCodeButtons={
                        props.hasDecorativeVsCodeButtons
                    }
                    className={cx(classes.content, props.className)}
                    hasShadow={hasShadow}
                />
            )}
        </div>
    );
});

const useStyles = makeStyles()({
    "root": {
        "position": "relative",
    },

    "content": {
        "width": "100%",
    },
});
