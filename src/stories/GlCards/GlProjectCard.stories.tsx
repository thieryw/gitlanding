import { GlProjectCard } from "../../GlCards/GlProjectCard";
import { sectionName } from "./sectionName";
import { getStoryFactory } from "../getStory";
import ExampleImgUrl from "../assets/img/example.png";

const { getStory, meta } = getStoryFactory({
    sectionName,
    "wrappedComponent": {
        GlProjectCard,
    },
});

export default meta;

export const Vue = getStory({
    "badgeLabel": "Lorem Ipsum",
    "title": "gloria in excelsis deo",
    "subtitle": "et in terra pax homínibus bonae voluntátis",
    "projectImageUrl": ExampleImgUrl,
    "date": "22/10/1334",
});
