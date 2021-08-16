import { GlSectionAside } from "../../GlSection/GlSectionAside";
import { getStoryFactory } from "../getStory";
import { sectionName } from "./sectionName";
import imgExamplePng from "../assets/img/example.png";

const { getStory, meta } = getStoryFactory({
    sectionName,
    "wrappedComponent": { GlSectionAside },
});

export default meta;

export const VueWithImage = getStory({
    "type": "image",
    "url": imgExamplePng,
});

export const VuewithCode = getStory({
    "type": "code",
    "language": "typescript",
    "showLineNumbers": true,
    "text": `
function add(x: number, y: number){
	return x + y;
}
	`,
});
