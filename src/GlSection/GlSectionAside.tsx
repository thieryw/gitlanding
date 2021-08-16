import { GlImage } from "../utils/GlImage";
import type { GlImageProps } from "../utils/GlImage";
import { GlCode } from "../utils/GlCode";
import type { GlCodeProps } from "../utils/GlCode";
import { memo } from "react";

export declare namespace GlSectionAsideProps {
    export type Aside = Aside.Code | Aside.Image;

    export namespace Aside {
        type Code = { type: "code" } & GlCodeProps;
        type Image = { type: "image" } & GlImageProps;
    }
}

export type GlSectionAsideProps = GlSectionAsideProps.Aside;

export const GlSectionAside = memo((props: GlSectionAsideProps) => {
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
