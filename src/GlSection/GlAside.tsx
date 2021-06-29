import { GlImage } from "../utils/GlImage";
import type { GlImageProps } from "../utils/GlImage";
import { GlCode } from "../utils/GlCode";
import type { GlCodeProps } from "../utils/GlCode";
import { memo } from "react";
import { getThemeApi } from "../theme";
import { useGuaranteedMemo } from "powerhooks";
import { cx } from "tss-react";

export declare namespace GlAsideProps {
    export type Aside = Aside.Code | Aside.Image;

    export namespace Aside {
        type Code = { type: "code" } & GlCodeProps;
        type Image = { type: "image" } & GlImageProps;
    }
}

export type GlAsideProps = GlAsideProps.Aside;

const getUseClassNames = () => {
    const { createUseClassNames } = getThemeApi();

    const { useClassNames } = createUseClassNames()(theme => ({
        "root": {
            "width": 900,
            ...(theme.responsive.down("lg")
                ? {
                      "width": 511,
                  }
                : {}),
            ...(theme.responsive.down("md")
                ? {
                      "width": "100%",
                  }
                : {}),
        },
    }));

    return { useClassNames };
};

export const GlAside = memo((props: GlAsideProps) => {
    const { useClassNames } = useGuaranteedMemo(() => getUseClassNames(), []);
    const { classNames } = useClassNames({});

    return (
        <>
            {props.type === "image" ? (
                <GlImage
                    url={props.url}
                    alt={props.alt}
                    className={cx(classNames.root, props.className)}
                />
            ) : (
                <GlCode
                    text={props.text}
                    language={props.language}
                    showLineNumbers={props.showLineNumbers}
                    className={cx(classNames.root, props.className)}
                />
            )}
        </>
    );
});
