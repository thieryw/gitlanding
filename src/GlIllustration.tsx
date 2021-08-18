import { GlImage } from "./utils/GlImage";
import type { GlImageProps } from "./utils/GlImage";
import { GlCode } from "./utils/GlCode";
import type { GlCodeProps } from "./utils/GlCode";
import { memo } from "react";

export declare namespace GlIllustrationProps {
    export type Illustration = Illustration.Code | Illustration.Image;

    export namespace Illustration {
        type Code = { type: "code" } & GlCodeProps;
        type Image = { type: "image" } & GlImageProps;
    }
}

export type GlIllustrationProps = GlIllustrationProps.Illustration;

export const GlIllustration = memo((props: GlIllustrationProps) => {
    const { className } = props;
    return (
        <aside className={className}>
            {props.type === "image" ? (
                <GlImage
                    url={props.url}
                    alt={props.alt}
                    className={props.className}
                />
            ) : (
                <GlCode
                    text={props.text}
                    language={props.language}
                    showLineNumbers={props.showLineNumbers}
                    hasDecorativeVsCodeButtons={
                        props.hasDecorativeVsCodeButtons
                    }
                    className={props.className}
                />
            )}
        </aside>
    );
});
