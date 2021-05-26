import { VsCodeButtons } from "./VsCodeButtons";
import { createUseClassNames } from "../../theme/useClassesNames";
import { cx } from "tss-react";
import { memo } from "react";

export type Props = {
    url?: string;
    frame?: {
        isActive: boolean;
        customColor?: string;
        hasMokButtons?: boolean;
    };
    className?: string;
    alt?: string;
};

const { useClassNames } = createUseClassNames<{ frame?: Props["frame"] }>()((theme, { frame }) => ({
    "root": {
        "position": "relative",
        "boxShadow": theme.palette.type === "dark" ? "" : "-2px 0px 10px 0px rgba(0,0,0,0.75)",

        "& >img": {
            "width": "100%",
            "height": "100%",
            "objectFit": "cover",
            "verticalAlign": "middle",
        },

        "borderRadius": frame !== undefined && frame.isActive ? 5 : "",

        "border": (() => {
            if (frame === undefined) {
                return "";
            }

            return `
                    solid 
                    ${
                        frame.customColor !== undefined
                            ? frame.customColor
                            : theme.custom.color.palette.visualStudioCodeColor
                    }
                    24px
                `;
        })(),
    },
}));

export const Image = memo((props: Props) => {
    const { className, url, frame, alt } = props;
    const { classNames } = useClassNames({ frame });

    return (
        <div className={cx(classNames.root, className)}>
            {frame !== undefined &&
                frame.isActive &&
                frame.hasMokButtons !== undefined &&
                frame.hasMokButtons && <VsCodeButtons />}

            <img src={url} alt={alt} />
        </div>
    );
});
