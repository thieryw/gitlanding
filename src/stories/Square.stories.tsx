import { useState, memo } from "react";
import { getThemeApi } from "../theme";
import { designSystem } from "./sectionName";
import { getStoryFactory } from "./getStory";

const { Square } = (() => {
    const getUseClassNames = () => {
        const { createUseClassNames } = getThemeApi();

        const { useClassNames } = createUseClassNames()(theme => ({
            "root": {
                "width": 200,
                "height": 200,
                "backgroundColor": (() => {
                    if (theme.responsive.up("xl")) {
                        return "red";
                    }

                    if (theme.responsive.up("lg")) {
                        return "green";
                    }

                    if (theme.responsive.up("md")) {
                        return "blue";
                    }

                    if (theme.responsive.up("sm")) {
                        return "yellow";
                    }

                    return "pink";
                })(),
            },
        }));

        return { useClassNames };
    };

    const Square = memo(() => {
        const [{ useClassNames }] = useState(() => getUseClassNames());

        const { classNames } = useClassNames({});

        return <div className={classNames.root} />;
    });

    return { Square };
})();

const { getStory, meta } = getStoryFactory({
    "sectionName": designSystem,
    "wrappedComponent": { Square },
});

export default meta;

export const Vue = getStory({});
