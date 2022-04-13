import { memo } from "react";
import { Source } from "../tools/Source";
import { makeStyles } from "../theme";

export type GlVideoProps = {
    id?: string;
    className?: string;
    width?: number;
    height?: number;
    hasShadow?: boolean;
    sources: Source[];
    onLoad?: () => void;
    autoPlay?: boolean;
    muted?: boolean;
    loop?: boolean;
    controls?: boolean;
};

export const GlVideo = memo((props: GlVideoProps) => {
    const {
        sources,
        className,
        hasShadow,
        height,
        id,
        width,
        autoPlay,
        loop,
        muted,
        controls,
        onLoad,
    } = props;

    const { classes, cx } = useStyles({
        "hasShadow": hasShadow ?? true,
    });

    return (
        <video
            className={cx(classes.root, className)}
            onLoadStart={onLoad}
            loop={loop ?? true}
            muted={muted ?? true}
            autoPlay={autoPlay ?? true}
            id={id}
            width={width}
            height={height}
            playsInline={autoPlay ?? true}
            controls={controls ?? false}
        >
            {sources.map(source => (
                <source {...source} />
            ))}
        </video>
    );
});

const useStyles = makeStyles<{ hasShadow: boolean }>({ "name": { GlVideo } })(
    (theme, { hasShadow }) => ({
        "root": {
            "width": "100%",
            "boxShadow": !hasShadow ? undefined : theme.customShadow,
        },
    }),
);
