/* eslint-disable @typescript-eslint/no-namespace */
import { memo, useState } from "react";
import { makeStyles } from "../theme";
import { useConstCallback } from "powerhooks";
import { ImageSource } from "../tools/ImageSource";

export type GlImageProps = {
    id?: string;
    className?: string;
    url: string;
    alt?: string;
    width?: number;
    height?: number;
    hasShadow?: boolean;
    imageSources?: ImageSource[];
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
        imageSources,
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
    return !url.endsWith(".mp4") ? (
        <picture>
            {imageSources !== undefined &&
                imageSources.map(source => <source {...source} />)}
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
    ) : (
        <video
            id={id}
            width={width}
            height={height}
            className={cx(classes.root, className)}
            autoPlay={true}
            muted={true}
            loop={true}
            onLoadStart={onLoadProp}
        >
            <source src={url} type="video/mp4" />
            Your browser does not support HTML video.
        </video>
    );
});

const useStyles = makeStyles<{ isImageLoaded: boolean; hasShadow: boolean }>({
    "name": { GlImage },
})((theme, { isImageLoaded, hasShadow }) => ({
    "root": {
        "position": "relative",
        "width": isImageLoaded ? "100%" : undefined,
        "height": isImageLoaded ? "auto" : undefined,
        "objectFit": "cover",
        "verticalAlign": "middle",
        "boxShadow": !hasShadow ? undefined : theme.customShadow,
    },
}));
