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
    "menuItems": [
        {
            "name": "Gloria",
            "link": { "href": "#" },
        },
        {
            "name": "In Excelsis",
            "link": { "href": "#" },
        },
        {
            "name": "Deo",
            "link": { "href": "#" },
        },
    ],
    "enableDarkModeSwitch": true,
    "githubRepoUrl": "",
};
/* spell-checker: enabled */

export const Vue = getStory({
    ...props,
});
