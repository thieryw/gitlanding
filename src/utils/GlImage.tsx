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
    },

    "image": {
        "width": "100%",
        "height": "100%",
        "objectFit": "cover",
        "verticalAlign": "middle",
    },
});

export const GlImage = memo((props: GlImageProps) => {
    const { className, url, alt } = props;

    const { classes, cx } = useStyles();

    return (
        <div className={cx(classes.root, className)}>
            <img className={classes.image} src={url} alt={alt} />
        </div>
    );
});
