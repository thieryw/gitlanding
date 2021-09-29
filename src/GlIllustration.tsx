import { GlImage } from "./utils/GlImage";
import type { GlImageProps } from "./utils/GlImage";
import { GlCode } from "./utils/GlCode";
import type { GlCodeProps } from "./utils/GlCode";
import { memo } from "react";
import { makeStyles } from "./theme";

export declare namespace GlIllustrationProps {
    export type Illustration = Illustration.Code | Illustration.Image;

    export namespace Illustration {
        type Code = { type: "code" } & GlCodeProps;
        type Image = { type: "image" } & GlImageProps;
    }
}

export type GlIllustrationProps = {
    hasShadow?: boolean;
} & GlIllustrationProps.Illustration;

const useStyles = makeStyles<{ hasShadow: boolean }>()(
    (theme, { hasShadow }) => ({
        "root": {
            "boxShadow": !hasShadow
                ? undefined
                : (theme.custom.shadow as string),
        },
    }),
);

export const GlIllustration = memo((props: GlIllustrationProps) => {
    const { className, hasShadow } = props;

    const { classes, cx } = useStyles({
        "hasShadow": hasShadow ?? false,
    });
    return (
        <aside className={cx(classes.root, className)}>
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
