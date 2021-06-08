import downArrow from "../assets/svg/downArrow.svg";
import { ReactSVG } from "react-svg";
import { cx } from "tss-react";
import { createUseClassNames } from "../theme";
import { memo } from "react";

const { useClassNames } = createUseClassNames()(theme => ({
    "root": {
        "border": `solid ${
            theme.isDarkModeEnabled ? theme.colors.palette.light.main : theme.colors.palette.dark.main
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

export const DownArrow = memo((props: { className?: string }) => {
    const { className } = props;
    const { classNames } = useClassNames({});
    return <ReactSVG className={cx(className, classNames.root)} src={downArrow} />;
});
