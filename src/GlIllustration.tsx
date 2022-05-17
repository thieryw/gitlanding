import { GlImage } from "./utils/GlImage";
import type { GlImageProps } from "./utils/GlImage";
import { GlCodeBlock } from "./GlCodeBlock";
import type { GlCodeBlockProps } from "./GlCodeBlock";
import { memo } from "react";
import { makeStyles } from "./theme";
import type { GlVideoProps } from "./utils/GlVideo";
import { GlVideo } from "./utils/GlVideo";

//TODO: Remove this component

export type GlIllustrationProps =
    | GlIllustrationProps.Code
    | GlIllustrationProps.Image
    | GlIllustrationProps.Video;
export namespace GlIllustrationProps {
    export type Common = {
        className?: string;
        hasShadow?: boolean;
    };

    export type Code = Common & { type: "code" } & Omit<
            GlCodeBlockProps,
            "className"
        >;
    export type Image = Common & { type: "image" } & Omit<
            GlImageProps,
            "className"
        >;
    export type Video = Common & { type: "video" } & Omit<
            GlVideoProps,
            "className"
        >;
}

export const GlIllustration = memo((props: GlIllustrationProps) => {
    const { className, hasShadow, ...rest } = props;

    const { classes, cx } = useStyles();

    return (
        <div className={cx(classes.root, className)}>
            {(() => {
                const commonProps = {
                    hasShadow,
                    "className": classes.content,
                };
                switch (rest.type) {
                    case "code":
                        return <GlCodeBlock {...commonProps} {...rest} />;
                    case "image":
                        return <GlImage {...commonProps} {...rest} />;
                    case "video":
                        return <GlVideo {...commonProps} {...rest} />;
                }
            })()}
        </div>
    );
});

const useStyles = makeStyles({ "name": { GlIllustration } })({
    "root": {},
    "content": {
        "width": "100%",
    },
});
