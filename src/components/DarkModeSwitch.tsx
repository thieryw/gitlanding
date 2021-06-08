import { memo } from "react";
import { useConstCallback } from "powerhooks";
import { useIsDarkModeEnabled } from "onyxia-ui";
import { IconButton } from "../theme";

export type DarkModeSwitchProps = {
    className?: string;
};

export const DarkModeSwitch = memo((props: DarkModeSwitchProps) => {
    const { className } = props;
    const { isDarkModeEnabled, setIsDarkModeEnabled } = useIsDarkModeEnabled();

    const onClick = useConstCallback(() => setIsDarkModeEnabled(!isDarkModeEnabled));

    return (
        <IconButton
            className={className}
            id={isDarkModeEnabled ? "brightness7" : "brightness4"}
            onClick={onClick}
        />
    );
});
