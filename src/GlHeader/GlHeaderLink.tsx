import { memo, useState, ReactNode } from "react";
import { tss } from "../tss";
import { symToStr } from "tsafe/symToStr";
import { useCallbackFactory } from "powerhooks/useCallbackFactory";
import { useDomRect } from "powerhooks/useDomRect";

export type GlHeaderLinkProps = {
    className?: string;
    classes?: Partial<ReturnType<typeof useStyles>["classes"]>;
    label: ReactNode;
    href: string;
    onClick?: () => void;
    isActive?: boolean;
};

export const GlHeaderLink = memo((props: GlHeaderLinkProps) => {
    const { href, label, className, onClick, isActive = false } = props;
    const [isHover, setIsHover] = useState(false);
    const [isPressed, setIsPressed] = useState(false);

    const handleHoverFactory = useCallbackFactory(
        ([state]: ["enter" | "leave"]) => {
            switch (state) {
                case "enter":
                    setIsHover(true);
                    return;
                case "leave":
                    setIsHover(false);
            }
        },
    );

    const handleClickFactory = useCallbackFactory(
        ([state]: ["down" | "up"]) => {
            switch (state) {
                case "down":
                    setIsPressed(true);
                    return;
                case "up":
                    setIsPressed(false);
            }
        },
    );

    const {
        ref,
        domRect: { width },
    } = useDomRect();

    const { classes, cx } = useStyles({
        isUnderlined: isHover || isActive,
        width,
        isAccentColor: isPressed || isActive,
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
        isAccentColor: boolean;
        width: number;
    }>()
    .create(({ theme, isUnderlined, isAccentColor, width }) => ({
        "root": {
            "display": "flex",
            "flexDirection": "column",
            "alignItems": "center",
        },
        "link": {
            "transition": "color 200ms",
            "color": isAccentColor
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
            "backgroundColor": isAccentColor
                ? theme.colors.useCases.buttons.actionActive
                : theme.colors.useCases.typography.textPrimary,
            "transition": "width 200ms, background-color 200ms",
        },
    }));
