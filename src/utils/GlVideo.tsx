import { memo, forwardRef } from "react";
import type { ForwardedRef } from "react";
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
    hasBorderRadius?: boolean;
};

export const GlVideo = memo(
    forwardRef((props: GlVideoProps, ref: ForwardedRef<HTMLVideoElement>) => {
        const {
            sources,
            className,
            hasShadow = true,
            hasBorderRadius = true,
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
            hasShadow,
            hasBorderRadius,
        });

        return (
            <video
                ref={ref}
                className={cx(classes.root, className)}
                onLoadedData={onLoad}
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
    }),
);

const useStyles = makeStyles<{ hasShadow: boolean; hasBorderRadius: boolean }>({
    "name": { GlVideo },
})((theme, { hasShadow, hasBorderRadius }) => ({
    "root": {
        "boxShadow": !hasShadow ? undefined : theme.customShadow,
        "borderRadius": !hasBorderRadius ? undefined : theme.borderRadius,
    },
}));
