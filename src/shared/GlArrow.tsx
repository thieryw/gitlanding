import DownArrow from "@mui/icons-material/KeyboardArrowDown";

import { memo } from "react";
import { tss } from "../tss";

export type GlArrowProps = {
    className?: string;
    classes?: Partial<ReturnType<typeof useStyles>["classes"]>;
    direction: "up" | "down" | "left" | "right";
    hasCircularBorder?: boolean;
    onClick?: () => void;
    colorLight?: string;
    colorDark?: string;
};

export const GlArrow = memo((props: GlArrowProps) => {
    const {
        className,
        direction,
        hasCircularBorder,
        onClick,
        colorDark,
        colorLight,
    } = props;

    const { classes, cx } = useStyles({
        direction,
        "hasCircularBorder": hasCircularBorder ?? false,
        "colorDark": colorDark ?? "",
        "colorLight": colorLight ?? "",
        "classesOverrides": props.classes,
    });

    return (
        <div onClick={onClick} className={cx(classes.root, className)}>
            <DownArrow className={classes.arrow} />
        </div>
    );
});

const useStyles = tss
    .withName({ GlArrow })
    .withParams<
        Required<Omit<GlArrowProps, "onClick" | "classes" | "className">>
    >()
    .create(
        ({ theme, direction, hasCircularBorder, colorDark, colorLight }) => {
            const color = (() => {
                if (theme.isDarkModeEnabled) {
                    return colorDark.length === 0
                        ? theme.colors.palette.light.main
                        : colorDark;
                }

                return colorLight.length === 0
                    ? theme.colors.palette.dark.main
                    : colorLight;
            })();

            return {
                "root": {
                    "border": hasCircularBorder
                        ? `
                    solid ${color} 2px
                `
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
                },
                "arrow": {
                    "fill": color,
                },
            };
        },
    );
