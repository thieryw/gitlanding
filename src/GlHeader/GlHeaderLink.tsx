import { memo, useState } from "react";
import { tss } from "../theme";
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
    const [isActive, setIsActive] = useState(false);

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

    const handleClickFactory = useCallbackFactory(
        ([state]: ["down" | "up"]) => {
            switch (state) {
                case "down":
                    setIsActive(true);
                    return;
                case "up":
                    setIsActive(false);
            }
        },
    );

    const {
        ref,
        domRect: { width },
    } = useDomRect();

    const { classes, cx } = useStyles({
        isUnderlined,
        width,
        isActive,
        "classesOverrides": props.classes,
    });

    return (
        <div ref={ref} className={cx(classes.root, className)}>
            <a
                onMouseLeave={handleHoverFactory("leave")}
                onMouseEnter={handleHoverFactory("enter")}
                onMouseDown={handleClickFactory("down")}
                onMouseUp={handleClickFactory("up")}
                className={classes.link}
                href={href}
                onClick={onClick}
            >
                {label}
            </a>
            <div className={classes.underline}></div>
        </div>
    );
});

const useStyles = tss
    .withName(`${symToStr({ GlHeaderLink })}`)
    .withParams<{
        isUnderlined: boolean;
        isActive: boolean;
        width: number;
    }>()
    .create(({ theme, isUnderlined, isActive, width }) => ({
        "root": {
            "display": "flex",
            "flexDirection": "column",
            "alignItems": "center",
        },
        "link": {
            "transition": "color 200ms",
            "color": isActive
                ? theme.colors.useCases.buttons.actionActive
                : theme.colors.useCases.typography.textPrimary,
            "textDecoration": "none",
            ...theme.spacing.rightLeft("padding", `${theme.spacing(3)}px`),
            "whiteSpace": "nowrap",
        },
        "underline": {
            "width": isUnderlined ? width - theme.spacing(3) : 0,
            "marginTop": theme.spacing(1),
            "height": 1,
            "backgroundColor": isActive
                ? theme.colors.useCases.buttons.actionActive
                : theme.colors.useCases.typography.textPrimary,
            "transition": "width 200ms, background-color 200ms",
        },
    }));
