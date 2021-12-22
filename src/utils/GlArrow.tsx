import downArrow from "../assets/svg/downArrow.svg";
import { ReactSVG } from "react-svg";

import { memo } from "react";
import { makeStyles } from "../theme";

export type GlArrowProps = {
    className?: string;
    direction: "up" | "down" | "left" | "right";
    hasCircularBorder?: boolean;
    link?: {
        href: string;
        onClick?: () => void;
    };
};

export const GlArrow = memo((props: GlArrowProps) => {
    const { className, link, direction, hasCircularBorder } = props;

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
            className={cx(classes.root, className)}
        >
            <ReactSVG src={downArrow} />
        </div>
    );
});

const useStyles = makeStyles<{
    direction: GlArrowProps["direction"];
    hasCircularBorder: boolean;
}>({ "name": { GlArrow } })((theme, { direction, hasCircularBorder }) => ({
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
        "alignItems": "center",
        "justifyContent": "center",
        "display": "flex",

        "& >div": {
            "display": "flex",
            "width": "12px",
            "& >svg": {
                "fill": theme.isDarkModeEnabled
                    ? theme.colors.palette.light.main
                    : theme.colors.palette.dark.main,
            },
        },
    },
}));
