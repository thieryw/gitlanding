import { createUseClassNames } from "../theme";
import { css } from "tss-react";
import { memo } from "react";
import { Icon } from "../theme";

const { useClassNames } = createUseClassNames()(() => ({
    "roundedIcons": {
        "position": "absolute",
        "top": -23,
        "left": -17,
        "display": "flex",
        "& >svg": {
            "width": 15,
            "margin": "0 2px 0 2px",
        },
    },
}));

export const VsCodeButtons = memo(() => {
    const { classNames } = useClassNames({});
    const colors = ["red", "yellow", "green"];

    return (
        <div className={classNames.roundedIcons}>
            {colors.map(color => (
                <Icon
                    id="brightness1Rounded"
                    key={color}
                    className={css({
                        "fill": color,
                    })}
                />
            ))}
        </div>
    );
});
