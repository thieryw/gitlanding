import ReactMarkDown from "react-markdown";
import { makeStyles } from "../theme";
import { memo } from "react";
import type { ReactNode } from "react";

const { useStyles } = makeStyles()(theme => ({
    "root": {
        "borderTop": `solid ${theme.colors.useCases.typography.textDisabled} 1px`,
        "marginTop": theme.spacing(3),
        "width": "100%",
        "display": "flex",
        "justifyContent": "center",
        "alignItems": "center",
    },
}));

export type GlFooterBottomDivProps = {
    className?: string;
    contentMd?: string;
    children?: ReactNode;
};

export const GlFooterBottomDiv = memo((props: GlFooterBottomDivProps) => {
    const { contentMd, children, className } = props;

    const { classes, cx } = useStyles();

    return (
        <div className={cx(classes.root, className)}>
            {contentMd !== undefined && (
                <ReactMarkDown>{contentMd}</ReactMarkDown>
            )}

            {children}
        </div>
    );
});
