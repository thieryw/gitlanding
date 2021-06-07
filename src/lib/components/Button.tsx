import type { ButtonProps } from "onyxia-ui/Button";
import { createButton } from "onyxia-ui/Button";
import { memo } from "react";

const { Button: OnyxiaButton } = createButton();

export const Button = memo((props: ButtonProps) => {
    return <OnyxiaButton {...props} />;
});
