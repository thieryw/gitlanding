import { memo, forwardRef, useEffect, useState, useId } from "react";
import type { ForwardedRef } from "react";
import { Source } from "../tools/Source";
import { tss } from "../tss";
import { useIntersectionObserver } from "../tools/useIntersectionObserver";
import { useMergeRefs } from "powerhooks/useMergeRefs";

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
    forwardRef(
        (
            props: GlVideoProps,
            ref_forwarded: ForwardedRef<HTMLVideoElement>,
        ) => {
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
            const [isIntersected, setIntersected] = useState(false);

            const id = (function useClosure() {
                const id = useId();
                return id_props ?? id;
            })();

            const { ref: internalRef } = useIntersectionObserver({
                "callback": ({ observer, entry }) => {
                    if (entry.isIntersecting) {
                        observer.unobserve(entry.target);
                        setIntersected(true);
                    }
                },
                "threshold": 0.2,
            });

            const ref = useMergeRefs([internalRef, ref_forwarded]);

            useEffect(() => {
                if (delayBeforeAutoPlay === 0) {
                    return;
                }

                if (!isDataLoaded || !isIntersected) {
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
                    autoPlay={delayBeforeAutoPlay === 0 && autoPlay}
                    id={id}
                    width={width}
                    height={height}
                    playsInline={true}
                    controls={controls ?? false}
                >
                    {sources.map(source => (
                        <source {...source} />
                    ))}
                </video>
            );
        },
    ),
);

const useStyles = tss
    .withParams<{ hasShadow: boolean; hasBorderRadius: boolean }>()
    .withName({ GlVideo })
    .create(({ theme, hasShadow, hasBorderRadius }) => ({
        "root": {
            "boxShadow": !hasShadow ? undefined : theme.customShadow,
            "borderRadius": !hasBorderRadius ? undefined : theme.borderRadius,
        },
    }));
