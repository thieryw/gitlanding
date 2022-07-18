import { GlHeader } from "GlHeader";
import type { GlHeaderProps } from "GlHeader";
import { getStoryFactory } from "../../getStory";
import { sectionName } from "./sectionName";
import githubLogoPng from "../../assets/img/github.png";
import { GlLogo } from "utils/GlLogo";

const { getStory, meta } = getStoryFactory({
    sectionName,
    "wrappedComponent": { GlHeader },
});

export default meta;

/* spell-checker: disable */
const props: GlHeaderProps = {
    "title": <GlLogo logoUrl={githubLogoPng} />,
    "links": [
        {
            "label": "Link 1 label",
            "href": "",
        },
        {
            "label": "Link 2 label",
            "href": "",
        },
        {
            "label": "Link 3 label",
            "href": "",
        },
    ],
    "enableDarkModeSwitch": true,
    "githubButtonSize": "large",
    "githubRepoUrl": "",
};
/* spell-checker: enabled */

export const Vue = getStory({
    ...props,
});
