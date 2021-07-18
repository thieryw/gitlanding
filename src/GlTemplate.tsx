import { useGuaranteedMemo } from "powerhooks/useGuaranteedMemo";
import { useState, memo } from "react";
import { getThemeApi } from "./theme";
import { useZoomProviderReferenceWidth } from "powerhooks/ZoomProvider";
import type { ReactNode } from "react";

export type GlRootProps = {
    header?: ReactNode;
    children?: ReactNode;
};

export const { GlTemplate } = (() => {
    const { GlTemplateInner } = (() => {
        const getUseStyles = () => {
            const { makeStyles } = getThemeApi();

            const { useStyles } = makeStyles<{
                doUseZoomProvider: boolean;
            }>()((...[, { doUseZoomProvider }]) => ({
                "root": {
                    "height": doUseZoomProvider ? "100%" : "100vh",
                    "display": "flex",
                    "flexDirection": "column",
                    "overflow": "hidden",
                },
                "scrollWrapper": {
                    "flex": 1,
                    "overflow": "auto",
                    "scrollBehavior": "smooth",
                },
            }));

            return { useStyles };
        };

        const GlTemplateInner = memo((props: GlRootProps) => {
            const { header, children } = props;

            const [{ useStyles }] = useState(() => getUseStyles());

            const { referenceWidth } = useZoomProviderReferenceWidth();

            const { classes } = useStyles({
                "doUseZoomProvider": referenceWidth !== undefined,
            });

            return (
                <div className={classes.root}>
                    {header}

                    <div className={classes.scrollWrapper}>{children}</div>
                </div>
            );
        });

        return { GlTemplateInner };
    })();

    const GlTemplate = memo((props: GlRootProps) => {
        const { ThemeProviderOrId } = useGuaranteedMemo(
            () => getThemeApi(),
            [],
        );

        return (
            <ThemeProviderOrId>
                <GlTemplateInner {...props} />
            </ThemeProviderOrId>
        );
    });

    return { GlTemplate };
})();
