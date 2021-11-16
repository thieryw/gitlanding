/* eslint-disable @typescript-eslint/no-namespace */
import { memo, useState } from "react";
import { makeStyles } from "../theme";
import { useConstCallback } from "powerhooks";

export type GlImageProps = {
    className?: string;
    url: string;
    alt?: string;
    width?: number;
    height?: number;
    hasShadow?: boolean;
};

export const GlImage = memo((props: GlImageProps) => {
    const { className, url, alt, height, width, hasShadow } = props;
    const [isImageLoaded, setIsImageLoaded] = useState(false);

    const onLoad = useConstCallback(() => {
        setIsImageLoaded(true);
    });

    const { classes, cx } = useStyles({
        isImageLoaded,
        "hasShadow": hasShadow ?? false,
    });
    return !url.endsWith(".mp4") ? (
        <img
            onLoad={onLoad}
            className={cx(classes.root, className)}
            src={url}
            alt={alt}
            width={width}
            height={height}
        />
    ) : (
        <video
            width={width}
            height={height}
            className={cx(classes.root, className)}
            autoPlay={true}
            muted={true}
            loop={true}
        >
            <source src={url} type="video/mp4" />
            Your browser does not support HTML video.
        </video>
    );
});

const useStyles = makeStyles<{ isImageLoaded: boolean; hasShadow: boolean }>()(
    (theme, { isImageLoaded, hasShadow }) => ({
        "root": {
            "position": "relative",
            "width": isImageLoaded ? "100%" : undefined,
            "height": isImageLoaded ? "auto" : undefined,
            "objectFit": "cover",
            "verticalAlign": "middle",
            "boxShadow": !hasShadow ? undefined : theme.customShadow,
        },
    }),
);
