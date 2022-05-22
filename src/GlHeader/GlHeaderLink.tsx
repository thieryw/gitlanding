import { memo, useState } from "react";
import { Link } from "@mui/material";
import { makeStyles } from "../theme";
import { symToStr } from "tsafe/symToStr";
import { useCallbackFactory } from "powerhooks/useCallbackFactory";
import { useDomRect } from "powerhooks/useDomRect";

export type GlHeaderLinkProps = {
    className?: string;
    classes?: Partial<ReturnType<typeof useStyles>["classes"]>;
    label: string;
    href: string;
    onClick?: () => void;
};

export const GlHeaderLink = memo((props: GlHeaderLinkProps) => {
    const { href, label, className, onClick } = props;
    const [isUnderlined, setIsUnderlined] = useState(false);

    const handleHoverFactory = useCallbackFactory(
        ([state]: ["enter" | "leave"]) => {
            switch (state) {
                case "enter":
                    setIsUnderlined(true);
                    return;
                case "leave":
                    setIsUnderlined(false);
            }
        },
    );

    const {
        ref,
        domRect: { width },
    } = useDomRect();

    const { classes, cx } = useStyles({ isUnderlined, width }, { props });

    return (
        <div ref={ref} className={cx(classes.root, className)}>
            <Link
                onMouseLeave={handleHoverFactory("leave")}
                onMouseEnter={handleHoverFactory("enter")}
                className={classes.link}
                href={href}
                onClick={onClick}
            >
                {label}
            </Link>
            <div className={classes.underline}></div>
        </div>
    );
});

const useStyles = makeStyles<{ isUnderlined: boolean; width: number }>({
    "name": `${symToStr({ GlHeaderLink })}`,
})((theme, { isUnderlined, width }) => {
    return {
        "root": {
            "display": "flex",
            "flexDirection": "column",
            "alignItems": "center",
        },
        "link": {
            "color": theme.colors.useCases.typography.textPrimary,
            "textDecoration": "none",
            ...theme.spacing.rightLeft("padding", `${theme.spacing(3)}px`),
        },
        "underline": {
            "width": isUnderlined ? width - theme.spacing(3) : 0,
            "marginTop": theme.spacing(1),
            "height": 1,
            "backgroundColor": theme.colors.useCases.typography.textPrimary,
            "transition": "width 200ms, background-color 100ms",
        },
    };
});
