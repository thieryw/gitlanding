import { memo } from "react";
import { useConstCallback } from "powerhooks";
import { useIsDarkModeEnabled } from "../../theme/useIsDarkModeEnabled";
import IconButton from "@material-ui/core/IconButton";
import Brightness4 from "@material-ui/icons/Brightness4";
import Brightness7 from "@material-ui/icons/Brightness7";

export const DarkModeSwitch = memo(() => {
    const { isDarkModeEnabled, setIsDarkModeEnabled } = useIsDarkModeEnabled();

    return (
        <div
            className="dark-mode-switch"
            onClick={useConstCallback(() => setIsDarkModeEnabled(!isDarkModeEnabled))}
        >
            <IconButton>{isDarkModeEnabled ? <Brightness7 /> : <Brightness4 />}</IconButton>
        </div>
    );
});
