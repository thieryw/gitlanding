import { GlHeader } from "../../GlHeader/GlHeader";
import type { GlHeaderProps } from "../../GlHeader/GlHeader";
import { getStoryFactory } from "../getStory";
import { sectionName } from "./sectionName";

const { getStory, meta } = getStoryFactory({
    sectionName,
    "wrappedComponent": { GlHeader },
});

export default meta;

/* spell-checker: disable */
const props: GlHeaderProps = {
    "title": "Lorem Ipsum",
    "links": [
        {
            "label": "Gloria",
            "link": { "href": "#" },
        },
        {
            "label": "In Excelsis",
            "link": { "href": "#" },
        },
        {
            "label": "Deo",
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
