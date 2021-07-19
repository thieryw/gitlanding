import { memo } from "react";
import { useConstCallback } from "powerhooks/useConstCallback";
import { useIsDarkModeEnabled } from "onyxia-ui/lib";
import { GlIconButton } from "../utils/GlIconButton";

export type GlDarkModeSwitchProps = {
    className?: string;
};

export const GlDarkModeSwitch = memo((props: GlDarkModeSwitchProps) => {
    const { className } = props;
    const { isDarkModeEnabled, setIsDarkModeEnabled } = useIsDarkModeEnabled();

    const onClick = useConstCallback(() =>
        setIsDarkModeEnabled(!isDarkModeEnabled),
    );

    return (
        <GlIconButton
            className={className}
            iconId={isDarkModeEnabled ? "brightness7" : "brightness4"}
            onClick={onClick}
        />
    );
});
