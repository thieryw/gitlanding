import { render } from "react-dom";
import { GlTemplate } from "gitlanding/GlTemplate";
import { GlHeader } from "gitlanding/GlHeader";
import { GlHero } from "gitlanding/GlHero";
import { GlArticle } from "gitlanding/GlArticle";
import { GlIllustration } from "gitlanding/GlIllustration";
import { GlFooter } from "gitlanding/GlFooter";
import { GlSectionDivider } from "gitlanding/GlSectionDivider";

function App() {
    return (
        <GlTemplate
            header={
                <GlHeader
                    title="Header title"
                    links={[
                        {
                            "label": "link 1",
                            "link": { "href": "https://example.com" },
                        },
                        {
                            "label": "link 2",
                            "link": { "href": "https://example.com" },
                        },
                        {
                            "label": "link 3",
                            "link": { "href": "https://example.com" },
                        },
                    ]}
                    enableDarkModeSwitch={true}
                    githubRepoUrl="https://github.com/torvalds/linux"
                    githubButtonSize="large"
                    showGithubStarCount
                />
            }
            headerOptions={{
                "position": "fixed",
                "isRetracted": "smart",
            }}
            footer={
                <GlFooter
                    bottomDivContent="Licence M I T"
                    email="email@email.com"
                    phoneNumber="+33545345676"
                    links={[
                        {
                            "href": "https://example.com",
                            "title": "link 1",
                        },
                        {
                            "href": "https://example.com",
                            "title": "link 2",
                        },
                        {
                            "href": "https://example.com",
                            "title": "link 3",
                        },
                    ]}
                />
            }
        >
            <GlHero
                title="Hero title"
                subTitle={"Hero subtitle"}
                imageSrc="https://user-images.githubusercontent.com/39378411/135731749-4a723d4e-52ea-49b7-83c1-7da4db8f3f59.png"
                linkToSectionBelowId="firstSection"
            />

            <GlArticle
                id="firstSection"
                title="Article title"
                body="Article body"
                buttonLabel="Article Button label"
                buttonLink={{
                    "href": "https://example.com",
                }}
                illustration={
                    <GlIllustration
                        type="image"
                        url="https://user-images.githubusercontent.com/39378411/135731808-6cf3e4dd-1047-4a0a-95be-65fdd6947315.png"
                    />
                }
                animationVariant="primary"
                illustrationPosition="left"
            />

            <GlSectionDivider />

            <GlArticle
                title="Article title"
                body="Article body"
                buttonLabel="Article Button label"
                buttonLink={{
                    "href": "https://example.com",
                }}
                illustration={
                    <GlIllustration
                        type="image"
                        url="https://user-images.githubusercontent.com/39378411/135731816-5ba39459-d95e-413d-b515-92a7b0dc5acf.png"
                    />
                }
                animationVariant="secondary"
            />
        </GlTemplate>
    );
}

render(<App />, document.getElementById("root"));
