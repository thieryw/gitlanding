/* eslint-disable @typescript-eslint/no-namespace */
import { memo, useState } from "react";
import { makeStyles } from "../theme";
import { useConstCallback } from "powerhooks";
import { Source } from "../tools/Source";

export type GlImageProps = {
    id?: string;
    className?: string;
    url: string;
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
        url,
        alt,
        height,
        width,
        hasShadow,
        sources,
        onLoad: onLoadProp,
    } = props;

    const [isImageLoaded, setIsImageLoaded] = useState(false);

    const onLoad = useConstCallback(() => {
        setIsImageLoaded(true);
        if (onLoadProp === undefined) {
            return;
        }
        onLoadProp();
    });

    const { classes, cx } = useStyles({
        isImageLoaded,
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
                src={url}
                alt={alt}
                width={width}
                height={height}
            />
        </picture>
    );
});

const useStyles = makeStyles<{ isImageLoaded: boolean; hasShadow: boolean }>({
    "name": { GlImage },
})((theme, { isImageLoaded, hasShadow }) => ({
    "root": {
        "width": isImageLoaded ? "100%" : undefined,
        "height": isImageLoaded ? "auto" : undefined,
        "objectFit": "cover",
        "verticalAlign": "middle",
        "boxShadow": !hasShadow ? undefined : theme.customShadow,
    },
}));
