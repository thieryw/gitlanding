/* eslint-disable @typescript-eslint/no-namespace */
import { memo } from "react";
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

export const GlImage = memo((props: GlImageProps) => {
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
});

const useStyles = makeStyles<{ hasShadow: boolean }>({
    "name": { GlImage },
})((theme, { hasShadow }) => ({
    "root": {
        "boxShadow": !hasShadow ? undefined : theme.customShadow,
    },
}));
