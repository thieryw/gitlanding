import downArrow from "../assets/svg/downArrow.svg";
import { ReactSVG } from "react-svg";
import { cx } from "tss-react";
import { memo } from "react";
import { getThemeApi } from "../theme";
import { useGuaranteedMemo } from "powerhooks";

export type GlDownArrowProps = {
    className?: string;
};

const getUseClassNames = () => {
    const { createUseClassNames } = getThemeApi();

    const { useClassNames } = createUseClassNames()(theme => ({
        "root": {
            "border": `solid ${
                theme.isDarkModeEnabled
                    ? theme.colors.palette.light.main
                    : theme.colors.palette.dark.main
            } 2px`,
            "padding": 10,
            "borderRadius": "50%",

            "& svg": {
                "fill": theme.isDarkModeEnabled
                    ? theme.colors.palette.light.main
                    : theme.colors.palette.dark.main,
                "position": "relative",
                "top": 2,
            },
        },
    }));

    return { useClassNames };
};

export const GlDownArrow = memo((props: GlDownArrowProps) => {
    const { className } = props;
    const { useClassNames } = useGuaranteedMemo(() => getUseClassNames(), []);
    const { classNames } = useClassNames({});
    return (
        <ReactSVG className={cx(className, classNames.root)} src={downArrow} />
    );
});
