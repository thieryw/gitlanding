/* eslint-disable @typescript-eslint/no-namespace */
import { memo } from "react";
import { createUseClassNames } from "../theme";
import Link from "@material-ui/core/Link";
import { Typography } from "onyxia-ui/Typography";
import { cx } from "tss-react";

declare namespace BackgroundProps {
    export type Image = {
        type: "image";
        url: string;
    };

    export type Color = {
        type: "color";
        color: string;
    };
}

export type SmallThumbNailProps = {
    className?: string;
    title?: string;
    href?: string;
    width?: string | number;
    height?: string | number;
    background?: BackgroundProps.Color | BackgroundProps.Image;
};

const { useClassNames } = createUseClassNames<
    Pick<SmallThumbNailProps, "width" | "height" | "background">
>()((theme, { width, height, background }) => ({
    "root": {
        "height": height !== undefined ? height : 280,
        "width": width !== undefined ? width : 557,
        "borderRadius": 16,

        "& a": {
            "width": "100%",
            "height": "100%",
            "display": "flex",
            "justifyContent": "center",
            "alignItems": "center",
        },
        "cursor": "pointer",
        "background": (() => {
            if (background === undefined) {
                return theme.isDarkModeEnabled
                    ? theme.colors.palette.dark.greyVariant1
                    : theme.colors.palette.light.greyVariant1;
            }

            if (background.type === "color") {
                return background.color;
            }

            return `url(${background.url}) no-repeat center`;
        })(),
        "backgroundSize": background?.type === "image" ? "cover" : undefined,
    },
}));

export const SmallThumbNail = memo((props: SmallThumbNailProps) => {
    const { className, height, href, title, width, background } = props;

    const { classNames } = useClassNames({ width, height, background });

    return (
        <div className={cx(classNames.root, className)}>
            {title && (
                <Link href={href}>
                    <Typography variant="h5">{title}</Typography>
                </Link>
            )}
        </div>
    );
});
