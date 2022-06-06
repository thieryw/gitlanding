import type { Source } from "./Source";
import type { ReactComponent } from "./ReactComponent";

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
        maxWidth?: number | string;
        maxWidthSmallScreen?: number | string;
    };

    export type Video = {
        type: "video";
        sources: Source[];
        hasShadow?: boolean;
        autoPlay?: boolean;
        muted?: boolean;
        loop?: boolean;
        controls?: boolean;
        maxWidth?: number | string | string;
        maxWidthSmallScreen?: number | string | string;
    };

    export type CustomComponent = {
        type: "custom component";
        Component: ReactComponent<{
            className: string;
            onLoad: () => void;
            id: string;
        }>;
    };
}
