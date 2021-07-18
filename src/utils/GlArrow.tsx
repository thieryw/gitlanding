import downArrow from "../assets/svg/downArrow.svg";
import { ReactSVG } from "react-svg";

import { memo } from "react";
import { getThemeApi } from "../theme";
import { useGuaranteedMemo } from "powerhooks/useGuaranteedMemo";

export type GlArrowProps = {
    className?: string;
    direction: "up" | "down" | "left" | "right";
    hasCircularBorder?: boolean;
    link?: {
        href: string;
        onClick?: () => void;
    };
};

const getUseStyles = () => {
    const { makeStyles } = getThemeApi();

    const { useStyles } = makeStyles<{
        direction: GlArrowProps["direction"];
        hasCircularBorder: boolean;
    }>()((theme, { direction, hasCircularBorder }) => ({
        "root": {
            "border": hasCircularBorder
                ? `solid ${
                      theme.isDarkModeEnabled
                          ? theme.colors.palette.light.main
                          : theme.colors.palette.dark.main
                  } 2px`
                : undefined,
            "padding": 10,
            "borderRadius": "50%",
            ...(() => {
                const value = theme.spacing(5);

                return {
                    "width": value,
                    "height": value,
                };
            })(),
            "transform": (() => {
                switch (direction) {
                    case "down":
                        return undefined;
                    case "up":
                        return "rotate(180deg)";
                    case "left":
                        return "rotate(90deg)";
                    case "right":
                        return "rotate(-90deg)";
                }
            })(),

            "& >div": {
                "display": "flex",
                "position": "relative",
                "top": 3,

                "& >svg": {
                    "fill": theme.isDarkModeEnabled
                        ? theme.colors.palette.light.main
                        : theme.colors.palette.dark.main,
                },
            },
        },
    }));

    return { useStyles };
};

export const GlArrow = memo((props: GlArrowProps) => {
    const { className, link, direction, hasCircularBorder } = props;
    const { useStyles } = useGuaranteedMemo(() => getUseStyles(), []);

    const { classes, cx } = useStyles({
        direction,
        "hasCircularBorder": hasCircularBorder ?? false,
    });

    return (
        <div
            onClick={
                link?.onClick ??
                (() => (window.location.href = link?.href ?? "#"))
            }
            className={cx(className, classes.root)}
        >
            <ReactSVG src={downArrow} />
        </div>
    );
});
