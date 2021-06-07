import { createUseClassNames } from "../theme";
import { Typography } from "onyxia-ui/Typography";
import { memo } from "react";
import Link from "@material-ui/core/Link";
import { cx } from "tss-react";

export type ThumbNailProps = {
    className?: string;
    thumbNails: {
        title?: string;
        href?: string;
        width?: string | number;
        height?: string | number;
    }[];
};

const { useClassNames } = createUseClassNames<{ width?: number | string; height?: number | string }>()(
    (...[theme, { height, width }]) => ({
        "root": {
            "display": "flex",
            "justifyContent": "center",
            "marginBottom": 138,

            "& div": {
                "height": height !== undefined ? height : 280,
                "width": width !== undefined ? width : 557,
                "display": "flex",
                "justifyContent": "center",
                "alignItems": "center",
                "borderRadius": 16,
                "backgroundColor": theme.isDarkModeEnabled
                    ? theme.colors.palette.dark.greyVariant1
                    : theme.colors.palette.light.greyVariant1,
                "margin": "0 12px 0 12px",
            },
        },
    }),
);

export const ThumbNails = memo((props: ThumbNailProps) => {
    const { thumbNails, className } = props;

    const { classNames } = useClassNames({});
    return (
        <div className={cx(className, classNames.root)}>
            {thumbNails.map(thumbNail => (
                <Link key={thumbNail.title} href={thumbNail.href}>
                    <div>
                        {thumbNail.title && <Typography variant="h5">{thumbNail.title}</Typography>}
                    </div>
                </Link>
            ))}
        </div>
    );
});
