import { GlImage } from "../utils/GlImage";
import type { GlImageProps } from "../utils/GlImage";
import { GlCode } from "../utils/GlCode";
import type { GlCodeProps } from "../utils/GlCode";
import { memo } from "react";

export declare namespace GlAsideProps {
    export type Aside = Aside.Code | Aside.Image;

    export namespace Aside {
        type Code = { type: "code" } & GlCodeProps;
        type Image = { type: "image" } & GlImageProps;
    }
}

export type GlAsideProps = GlAsideProps.Aside;

export const GlAside = memo((props: GlAsideProps) => {
    return (
        <>
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
        </>
    );
});
