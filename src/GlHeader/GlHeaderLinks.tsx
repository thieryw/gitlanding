import { memo } from "react";
import type { GlHeaderLinkProps } from "./GlHeaderLink";
import { GlHeaderLink } from "./GlHeaderLink";
import { makeStyles } from "../theme";

export type GlHeaderLinks = {
    className?: string;
    classes?: Partial<ReturnType<typeof useStyles>["classes"]>;
    links: GlHeaderLinkProps[];
};

export const GlHeaderLinks = memo((props: GlHeaderLinks) => {
    const { links, className } = props;
    const { classes, cx } = useStyles(undefined, { props });

    return (
        <div className={cx(className, classes.root)}>
            {links.map(link => (
                <GlHeaderLink {...link} />
            ))}
        </div>
    );
});

const useStyles = makeStyles()(() => ({
    "root": {
        "display": "flex",
    },
}));
