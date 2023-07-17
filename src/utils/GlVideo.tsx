import { memo, forwardRef, useEffect, useState, useId } from "react";
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
    delayBeforeAutoPlay?: number;
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
            id: id_props,
            width,
            autoPlay = true,
            delayBeforeAutoPlay = 0,
            loop,
            muted,
            controls,
            onLoad,
        } = props;

        const { classes, cx } = useStyles({
            hasShadow,
            hasBorderRadius,
        });

        const [isDataLoaded, setIsDataLoaded] = useState(false);

        const id = (function useClosure() {
            const id = useId();
            return id_props ?? id;
        })();

        useEffect(() => {
            if (!isDataLoaded || !autoPlay) {
                return;
            }

            const timer = setTimeout(() => {
                //@ts-expect-error: we know is will work
                document.getElementById(id).play();
            }, delayBeforeAutoPlay);

            return () => {
                clearTimeout(timer);
            };
        }, [isDataLoaded]);

        return (
            <video
                ref={ref}
                className={cx(classes.root, className)}
                onLoadedData={() => {
                    setIsDataLoaded(true);
                    onLoad?.();
                }}
                loop={loop ?? true}
                muted={muted ?? true}
                autoPlay={false}
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
