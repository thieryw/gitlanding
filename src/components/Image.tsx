/* eslint-disable @typescript-eslint/no-namespace */
import { VsCodeButtons } from "./VsCodeButtons";
import { createUseClassNames } from "../theme";
import { cx } from "tss-react";
import { memo } from "react";

export type ImageProps = {
    url: string;
    frame?: {
        hasFrameButtons?: boolean;
        customFrameColor?: string;
    };
    className?: string;
    alt?: string;
};

const { useClassNames } = createUseClassNames<{
    frame?: ImageProps["frame"];
}>()((theme, { frame }) => ({
    "root": {
        "position": "relative",
        "boxShadow": theme.isDarkModeEnabled ? undefined : "-2px 0px 10px 0px rgba(0,0,0,0.75)",
        "& > img": {
            "width": "100%",
            "height": "100%",
            "objectFit": "cover",
            "verticalAlign": "middle",
            "borderRadius": 5,
        },
        "borderRadius": frame !== undefined ? 5 : undefined,
        "border": (() => {
            if (frame === undefined) {
                return undefined;
            }

            return [
                "solid",
                frame.customFrameColor ?? theme.colors.palette.VsCodeBackground,
                "24px",
            ].join(" ");
        })(),
    },
}));

export const Image = memo((props: ImageProps) => {
    const { className, url, frame, alt } = props;
    const { classNames } = useClassNames({
        frame,
    });

    return (
        <div className={cx(classNames.root, className)}>
            {frame && frame.hasFrameButtons && <VsCodeButtons />}

            <img src={url} alt={alt} />
        </div>
    );
});
