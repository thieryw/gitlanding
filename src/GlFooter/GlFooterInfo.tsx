import { memo } from "react";
import { validateEmail } from "../utils/validateEmail";
import Link from "@material-ui/core/Link";
import { assert } from "tsafe";

export type GlFooterInfoProps = {
    email?: string;
};

export const GlFooterInfo = memo((props: GlFooterInfoProps) => {
    const { email } = props;

    assert(validateEmail(email ?? ""));

    return (
        <div>
            <Link href={`mailto:${email}`}>{email}</Link>
        </div>
    );
});
