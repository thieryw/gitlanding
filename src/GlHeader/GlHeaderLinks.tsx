import { memo } from "react";
import type { GlHeaderLinkProps } from "./GlHeaderLink";
import { GlHeaderLink } from "./GlHeaderLink";
import { tss } from "tss";
import { useDomRect } from "powerhooks/useDomRect";

export type GlHeaderLinksProps =
    | GlHeaderLinksProps.LargeScreen
    | GlHeaderLinksProps.SmallScreen;

namespace GlHeaderLinksProps {
    export type LargeScreen = {
        type: "largeScreen";
        className?: string;
        classes?: Partial<ReturnType<typeof useStyles>["classes"]>;
        links: GlHeaderLinkProps[];
    };

    export type SmallScreen = {
        type: "smallScreen";
        isUnfolded: boolean;
    } & Omit<LargeScreen, "type">;
}

export const GlHeaderLinks = memo((props: GlHeaderLinksProps) => {
    const { links, className, type } = props;
    const {
        ref: contentWrapperRef,
        domRect: { height: contentWrapperHeight },
    } = useDomRect();
    const { classes, cx } = useStyles({
        type,
        contentWrapperHeight,
        "isUnfolded": type === "largeScreen" ? undefined : props.isUnfolded,
        "classesOverrides": props.classes,
    });

    return (
        <div className={cx(className, classes.root)}>
            {type === "smallScreen" && <div className={classes.overline}></div>}
            <div ref={contentWrapperRef} className={classes.contentWrapper}>
                {links.map(link => (
                    <GlHeaderLink
                        {...link}
                        classes={{
                            "root": cx(classes.linkRoot, link.classes?.root),
                            "link": cx(classes.link, link.classes?.link),
                            "underline": link.classes?.underline,
                        }}
                    />
                ))}
            </div>
        </div>
    );
});

const useStyles = tss
    .withName({ GlHeaderLinks })
    .withParams<
        Pick<GlHeaderLinksProps, "type"> & {
            contentWrapperHeight: number;
            isUnfolded: boolean | undefined;
        }
    >()
    .create(({ theme, type, contentWrapperHeight, isUnfolded }) => ({
        "root": {
            ...(() => {
                switch (type) {
                    case "largeScreen":
                        return {};
                    case "smallScreen":
                        return {
                            "overflow": "hidden",
                            "transition": "height 300ms",
                            "height": isUnfolded ? contentWrapperHeight : 0,
                            "backgroundColor":
                                theme.colors.useCases.surfaces.background,
                            "display": "flex",
                            "alignItems": "center",
                            "opacity": "0.94",
                        };
                }
            })(),
        },
        "overline": {
            "position": "absolute",
            "height": 1,
            "top": 0,
            "width": "100%",
            "transition": "background-color 300ms",
            "backgroundColor": isUnfolded
                ? theme.colors.useCases.typography.textSecondary
                : undefined,
        },
        "contentWrapper": {
            "display": "flex",
            "justifyContent": "start",
            ...(() => {
                switch (type) {
                    case "largeScreen":
                        return {
                            "flexDirection": "row",
                        };
                    case "smallScreen":
                        return {
                            "alignItems": "flex-start",
                            "flexDirection": "column",
                            "padding": theme.spacing({
                                "rightLeft": `${theme.paddingRightLeft}px`,
                                "topBottom": `${theme.spacing(3)}px`,
                            }),
                        };
                }
            })(),
        },
        "linkRoot": {
            ...(() => {
                switch (type) {
                    case "largeScreen":
                        return {};
                    case "smallScreen":
                        return {
                            "alignItems": "flex-start",
                            "paddingRight": theme.spacing(3),
                            ...theme.spacing.topBottom(
                                "margin",
                                `${theme.spacing(2)}px`,
                            ),
                        };
                }
            })(),
        },
        "link": {
            ...(() => {
                switch (type) {
                    case "largeScreen":
                        return {};
                    case "smallScreen":
                        return {
                            "paddingLeft": 0,
                        };
                }
            })(),
        },
    }));
