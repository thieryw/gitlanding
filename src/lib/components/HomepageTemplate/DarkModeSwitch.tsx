import { memo } from "react";
import { useConstCallback } from "powerhooks";
import { useIsDarkModeEnabled } from "../../theme/useIsDarkModeEnabled";
import IconButton from "@material-ui/core/IconButton";
import Brightness4 from "@material-ui/icons/Brightness4";
import Brightness7 from "@material-ui/icons/Brightness7";

export const DarkModeSwitch = memo((props: { className?: string }) => {
    const { className } = props;
    const { isDarkModeEnabled, setIsDarkModeEnabled } = useIsDarkModeEnabled();

    return (
        <div
            onClick={useConstCallback(() => setIsDarkModeEnabled(!isDarkModeEnabled))}
            className={className}
        >
            <IconButton>{isDarkModeEnabled ? <Brightness7 /> : <Brightness4 />}</IconButton>
        </div>
    );
});
