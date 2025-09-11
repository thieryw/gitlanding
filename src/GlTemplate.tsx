import { useState } from "react";
import { tss } from "./tss";
import { useStateRef } from "powerhooks/useStateRef";
import type { ReactNode } from "react";
import { useDomRect } from "powerhooks/useDomRect";
import { useEvt } from "evt/hooks/useEvt";
import { Evt } from "evt";
import { GlLinkToTop } from "./shared/GlLinkToTop";
import { disableEmotionWarnings } from "./tools/disableEmotionWarnings";
import { getScrollableParent } from "powerhooks/getScrollableParent";
import { useCurrentBreakpointName } from "./shared/useCurrentBreakpointName";

disableEmotionWarnings();

export type HeaderOptions = HeaderOptions.TopOfPage | HeaderOptions.Sticky;

export namespace HeaderOptions {
    export type TopOfPage = {
        position: "top of page";
        isRetracted?: boolean;
    };

    export type Sticky = {
        position: "sticky";
        isRetracted?: boolean | "smart";
    };
}

export type GlTemplateProps = {
    header?: ReactNode;
    body?: ReactNode;
    footer?: ReactNode;
    headerOptions?: HeaderOptions;
    applyHeaderPadding?: boolean;
    className?: string;
    hasTopOfPageLinkButton?: boolean;
    classes?: Partial<ReturnType<typeof useStyles>["classes"]>;
};

//NOTE: Here we are sure that we are wrapped into a <ThemeProvider />.
//we can use useTheme, useStyles, ect...
export function GlTemplate(props: GlTemplateProps) {
    const {
        header,
        body,
        footer,
        className,
        hasTopOfPageLinkButton,
        applyHeaderPadding,
    } = props;

    const rootRef = useStateRef<HTMLDivElement>(null);

    const headerOptions: Required<HeaderOptions> = (() => {
        const { headerOptions } = props;

        if (headerOptions === undefined) {
            return {
                "position": "top of page",
                "isRetracted": false,
            } as const;
        }

        switch (headerOptions.position) {
            case "top of page":
                return {
                    ...headerOptions,
                    "isRetracted": headerOptions.isRetracted ?? false,
                };
            case "sticky":
                return {
                    ...headerOptions,
                    "isRetracted": headerOptions.isRetracted ?? false,
                };
        }
    })();

    const {
        ref: headerWrapperRef,
        domRect: { height: headerHeight },
    } = useDomRect();
    const {
        ref: bodyAndFooterWrapperRef,
        domRect: { width: childrenWrapperWidth },
    } = useDomRect();

    const [isSmartHeaderVisible, setIsSmartHeaderVisible] = useState(true);

    useEvt(
        ctx => {
            const element = rootRef.current;
            if (!element) {
                return;
            }
            let previousScrollTop = 0;
            const scrollableParent = getScrollableParent({
                element,
                "doReturnElementIfScrollable": true,
            });

            Evt.from(ctx, scrollableParent, "scroll").attach(() => {
                const { scrollTop } = scrollableParent;

                setIsSmartHeaderVisible(
                    scrollTop < previousScrollTop
                        ? true
                        : scrollTop <= headerHeight,
                );

                previousScrollTop = scrollTop;
            });
        },
        [rootRef.current, headerHeight, headerOptions.isRetracted],
    );

    const { classes, cx } = useStyles({
        childrenWrapperWidth,
        headerHeight,
        "isHeaderRetracted":
            headerOptions.isRetracted === "smart"
                ? !isSmartHeaderVisible
                : headerOptions.isRetracted,
        "headerPosition": headerOptions.position,
        "applyHeaderPadding": applyHeaderPadding ?? false,
        "classesOverrides": props.classes,
    });

    const { currentBreakpointName } = useCurrentBreakpointName();

    return (
        <div
            // NOTE: We shouldn't have to do that but some components in GitLanding
            // do not properly re-render on window resize. To patch this, we force re-mount
            // when breakpoint changes.
            key={currentBreakpointName}
            ref={rootRef}
            className={cx(classes.root, className)}
        >
            <div ref={headerWrapperRef} className={classes.headerWrapper}>
                {header}
            </div>
            <div
                className={classes.bodyAndFooterWrapper}
                ref={bodyAndFooterWrapperRef}
            >
                {body}
                {hasTopOfPageLinkButton && <GlLinkToTop />}
                <div className={classes.footerWrapper}>{footer}</div>
            </div>
        </div>
    );
}

const useStyles = tss
    .withName({ GlTemplate })
    .withParams<{
        headerHeight: number;
        childrenWrapperWidth: number;
        isHeaderRetracted: boolean;
        headerPosition: Required<HeaderOptions>["position"];
        applyHeaderPadding: boolean;
    }>()
    .create(
        ({
            theme,
            headerHeight,
            childrenWrapperWidth,
            isHeaderRetracted,
            headerPosition,
            applyHeaderPadding,
        }) => {
            return {
                "root": {},
                "headerWrapper": {
                    "padding": applyHeaderPadding
                        ? theme.spacing({
                              "rightLeft": `${theme.paddingRightLeft}px`,
                              "topBottom": `${theme.spacing(3)}px`,
                          })
                        : undefined,
                    "zIndex": 4000,
                    ...(() => {
                        switch (headerPosition) {
                            case "sticky":
                                return {
                                    "width": childrenWrapperWidth,
                                    "backgroundColor": "transparent",
                                    "top": !isHeaderRetracted
                                        ? 0
                                        : -headerHeight,
                                    "transition": "top 350ms",
                                    "position": "sticky",
                                    "pointerEvents": isHeaderRetracted
                                        ? "none"
                                        : undefined,
                                };
                            case "top of page":
                                return {};
                        }
                    })(),
                },
                "footerWrapper": {
                    "marginTop": "auto",
                },
                "bodyAndFooterWrapper": {
                    "overflowX": "hidden",
                    "display": "flex",
                    "flexDirection": "column",
                    "minHeight": window.innerHeight - headerHeight,
                },
            };
        },
    );
