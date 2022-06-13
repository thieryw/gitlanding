/* eslint-disable @typescript-eslint/no-namespace */
import { memo, forwardRef } from "react";
import type { ForwardedRef } from "react";
import { makeStyles } from "../theme";
import { Source } from "../tools/Source";

export type GlImageProps = {
    id?: string;
    className?: string;
    src: string;
    alt?: string;
    width?: number;
    height?: number;
    hasShadow?: boolean;
    sources?: Source[];
    onLoad?: () => void;
};

export const GlImage = memo(
    forwardRef((props: GlImageProps, ref: ForwardedRef<HTMLImageElement>) => {
        const {
            id,
            className,
            src,
            alt,
            height,
            width,
            hasShadow,
            sources,
            onLoad,
        } = props;

        const { classes, cx } = useStyles({
            "hasShadow": hasShadow ?? true,
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

const useStyles = makeStyles<{ hasShadow: boolean }>({
    "name": { GlImage },
})((theme, { hasShadow }) => ({
    "root": {
        "boxShadow": !hasShadow ? undefined : theme.customShadow,
    },
}));
