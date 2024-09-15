import type { Source } from "./Source";

export type IllustrationProps =
    | IllustrationProps.Image
    | IllustrationProps.Video
    | IllustrationProps.CustomComponent;

declare namespace IllustrationProps {
    export type Image = {
        type: "image";
        sources?: Source[];
        src: string;
        hasShadow?: boolean;
        hasBorderRadius?: boolean;
        alt?: string;
    };

    export type Video = {
        type: "video";
        sources: Source[];
        hasShadow?: boolean;
        autoPlay?: boolean;
        delayBeforeAutoPlay?: number;
        muted?: boolean;
        loop?: boolean;
        controls?: boolean;
        hasBorderRadius?: boolean;
    };

    export type CustomComponent = {
        type: "custom component";
        Component: (props: {
            className?: string;
            onLoad: () => void;
            id: string;
        }) => JSX.Element | null;
    };
}
