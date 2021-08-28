/* eslint-disable @typescript-eslint/no-namespace */
import { memo } from "react";
import { makeStyles } from "../theme";

export type GlImageProps = {
    className?: string;
    url: string;
    alt?: string;
};

const useStyles = makeStyles()({
    "root": {
        "position": "relative",
        "width": "100%",
        "height": "auto",
        "objectFit": "cover",
        "verticalAlign": "middle",
    },
});

export const GlImage = memo((props: GlImageProps) => {
    const { className, url, alt } = props;

    const { classes, cx } = useStyles();
    return <img className={cx(classes.root, className)} src={url} alt={alt} />;
});
