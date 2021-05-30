import { VsCodeButtons } from "./VsCodeButtons";
import { createUseClassNames } from "../useClassesNames";
import { cx } from "tss-react";
import { memo } from "react";

export type Props = {
    url?: string;
    hasFrame?: boolean;
    customFrameColor?: string;
    hasFrameButtons?: boolean;
    className?: string;
    alt?: string;
};

const { useClassNames } = createUseClassNames<{
    frame: {
        isActive?: boolean;
        customColor?: string;
        hasMokButtons?: boolean;
    };
}>()((theme, { frame }) => ({
    "root": {
        "position": "relative",
        "boxShadow": theme.palette.type === "dark" ? undefined : "-2px 0px 10px 0px rgba(0,0,0,0.75)",
        "& > img": {
            "width": "100%",
            "height": "100%",
            "objectFit": "cover",
            "verticalAlign": "middle",
        },
        "borderRadius": frame.isActive ? 5 : undefined,
        "border": !frame.isActive
            ? undefined
            : [
                  "solid",
                  frame.customColor ?? theme.custom.color.palette.visualStudioCodeColor,
                  "24px",
              ].join(" "),
    },
}));

export const Image = memo((props: Props) => {
    const { className, url, hasFrame, customFrameColor, hasFrameButtons, alt } = props;
    const { classNames } = useClassNames({
        "frame": {
            "customColor": customFrameColor,
            "hasMokButtons": hasFrameButtons,
            "isActive": hasFrame,
        },
    });

    return (
        <div className={cx(classNames.root, className)}>
            {hasFrame && hasFrameButtons && <VsCodeButtons />}

            <img src={url} alt={alt} />
        </div>
    );
});
