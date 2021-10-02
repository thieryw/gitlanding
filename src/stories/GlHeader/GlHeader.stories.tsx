import { GlHeader } from "../../GlHeader/GlHeader";
import type { GlHeaderProps } from "../../GlHeader/GlHeader";
import { getStoryFactory } from "../getStory";
import { sectionName } from "./sectionName";

const { getStory, meta } = getStoryFactory({
    sectionName,
    "wrappedComponent": { GlHeader },
    "defaultWidth": 1400,
});

export default meta;

/* spell-checker: disable */
const props: GlHeaderProps = {
    "title": <h2>Project Logo</h2>,
    "links": [
        {
            "label": "Link 1 label",
            "link": { "href": "#" },
        },
        {
            "label": "Link 2 label",
            "link": { "href": "#" },
        },
        {
            "label": "Link 3 label",
            "link": { "href": "#" },
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
