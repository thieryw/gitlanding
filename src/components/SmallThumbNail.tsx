import { memo } from "react";
import { createUseClassNames } from "../theme";
import Link from "@material-ui/core/Link";
import { Typography } from "onyxia-ui/Typography";
import { cx } from "tss-react";

export type SmallThumbNailProps = {
    className?: string;
    title?: string;
    href?: string;
    width?: string | number;
    height?: string | number;
};

const { useClassNames } = createUseClassNames<Pick<SmallThumbNailProps, "width" | "height">>()(
    (theme, { width, height }) => ({
        "root": {
            "height": height !== undefined ? height : 280,
            "width": width !== undefined ? width : 557,
            "borderRadius": 16,
            "backgroundColor": theme.isDarkModeEnabled
                ? theme.colors.palette.dark.greyVariant1
                : theme.colors.palette.light.greyVariant1,

            "& a": {
                "width": "100%",
                "height": "100%",
                "display": "flex",
                "justifyContent": "center",
                "alignItems": "center",
            },
            "cursor": "pointer",
        },
    }),
);

export const SmallThumbNail = memo((props: SmallThumbNailProps) => {
    const { className, height, href, title, width } = props;

    const { classNames } = useClassNames({ width, height });

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
