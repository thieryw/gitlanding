/* eslint-disable @typescript-eslint/no-namespace */
import { cx } from "tss-react";
import { memo } from "react";
import { getThemeApi } from "../theme";
import { useGuaranteedMemo } from "powerhooks";

export type ImageProps = {
    className?: string;
    url: string;
    alt?: string;
};

const getUseClassNames = () => {
    const { createUseClassNames } = getThemeApi();

    const { useClassNames } = createUseClassNames()(() => ({
        "root": {
            "position": "relative",
            "& > img": {
                "width": "100%",
                "height": "100%",
                "objectFit": "cover",
                "verticalAlign": "middle",
            },
        },
    }));

    return { useClassNames };
};

export const Image = memo((props: ImageProps) => {
    const { className, url, alt } = props;

    const { useClassNames } = useGuaranteedMemo(() => getUseClassNames(), []);

    const { classNames } = useClassNames({});

    return (
        <div className={cx(classNames.root, className)}>
            <img src={url} alt={alt} />
        </div>
    );
});
