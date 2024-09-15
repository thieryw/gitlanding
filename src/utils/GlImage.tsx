/* eslint-disable @typescript-eslint/no-namespace */
import { memo, forwardRef } from "react";
import type { ForwardedRef } from "react";
import { tss } from "tss";
import { Source } from "../tools/Source";

export type GlImageProps = {
    id?: string;
    className?: string;
    src: string;
    alt?: string;
    width?: number;
    height?: number;
    hasShadow?: boolean;
    hasBorderRadius?: boolean;
    sources?: Source[];
    onLoad?: () => void;
};

export const GlImage = memo(
    forwardRef((props: GlImageProps, ref: ForwardedRef<HTMLImageElement>) => {
        const {
            hasBorderRadius = true,
            id,
            className,
            src,
            alt,
            height,
            width,
            hasShadow = true,
            sources,
            onLoad,
        } = props;

        const { classes, cx } = useStyles({
            hasShadow,
            hasBorderRadius,
        });
        return (
            <picture>
                {sources !== undefined &&
                    sources.map(source => <source {...source} />)}
                <img
                    ref={ref}
                    id={id}
                    onLoad={onLoad}
                    className={cx(classes.root, className)}
                    src={src}
                    alt={alt}
                    width={width}
                    height={height}
                />
            </picture>
        );
    }),
);

const useStyles = tss
    .withParams<{ hasShadow: boolean; hasBorderRadius: boolean }>()
    .withName({ GlImage })
    .create(({ theme, hasShadow, hasBorderRadius }) => ({
        "root": {
            "boxShadow": !hasShadow ? undefined : theme.customShadow,
            "borderRadius": !hasBorderRadius ? undefined : theme.borderRadius,
        },
    }));
