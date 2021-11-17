import { getStoryFactory } from "./getStory";
import { sectionName } from "./sectionName";
import { GlCheckList } from "../GlCheckList";

const { getStory, meta } = getStoryFactory({
    sectionName,
    "wrappedComponent": { GlCheckList },
    "defaultWidth": 1200,
});

export default meta;

export const Vue = getStory({
    "heading": "Check List Heading",
    "subHeading": "Check List Sub Heading",
    "elements": [
        {
            "title": "Item 1",
            "description": "description of Item 1",
        },
        {
            "title": "Item 2",
            "description": "description of Item 2",
        },
        {
            "title": "Item 3",
            "description": "description of Item 3",
        },
        {
            "title": "Item 4",
            "description": "description of Item 4",
        },
        {
            "title": "Item 5",
            "description": "description of Item 5",
        },
        {
            "title": "Item 6",
            "description": "description of Item 6",
        },
    ],
});
