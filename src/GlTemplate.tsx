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
        const getUseClassNames = () => {
            const { createUseClassNames } = getThemeApi();

            const { useClassNames } = createUseClassNames<{
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

            return { useClassNames };
        };

        const GlTemplateInner = memo((props: GlRootProps) => {
            const { header, children } = props;

            const [{ useClassNames }] = useState(() => getUseClassNames());

            const { referenceWidth } = useZoomProviderReferenceWidth();

            const { classNames } = useClassNames({
                "doUseZoomProvider": referenceWidth !== undefined,
            });

            return (
                <div className={classNames.root}>
                    {header}

                    <div className={classNames.scrollWrapper}>{children}</div>
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
