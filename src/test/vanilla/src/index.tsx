import { render } from "react-dom";
import { GlTemplate } from "gitlanding/GlTemplate";
import { GlHeader } from "gitlanding/GlHeader";
import { GlHero } from "gitlanding/GlHero";
import { GlArticle } from "gitlanding/GlArticle";
import { GlIllustration } from "gitlanding/GlIllustration";
import { GlFooter } from "gitlanding/GlFooter";
import { GlSectionDivider } from "gitlanding/GlSectionDivider";
import { GlCards } from "gitlanding/GlCards";
import { GlProjectCard } from "gitlanding/GlCards/GlProjectCard";
import dataVisuPng from "./assets/illustrations/datavisualisation.png";
import pokemon from "./assets/illustrations/pokemon.png";
import webinaire from "./assets/illustrations/webinaire.png";
import kubernetes from "./assets/illustrations/kubernetes.png";
import { GlCheckList } from "gitlanding/GlCheckList";
import webpHeroImage from "./assets/illustrations/heroHeader.webp";
import pngHeroImage from "./assets/illustrations/heroHeader.png";

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
                imageSrc={pngHeroImage}
                imageSources={[
                    {
                        "srcSet": webpHeroImage,
                        "type": "image/webp",
                    },
                    {
                        "srcSet": pngHeroImage,
                        "type": "image/png",
                    },
                ]}
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
                illustrationPosition="left"
                hasAnimation={false}
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
                hasAnimation={true}
            />
            <GlSectionDivider />
            <GlCards>
                <GlProjectCard
                    projectImageUrl={dataVisuPng}
                    title="title"
                    subtitle="subtitle"
                    badgeLabel="badge label"
                />
                <GlProjectCard
                    projectImageUrl={kubernetes}
                    title="title"
                    subtitle="subtitle sdf qsmdlkfj qsdlkj qsdflkjqsmdl qsdflkjqsdml sfslkjsdflkj sdfmlqkj"
                    badgeLabel="badge label"
                />
                <GlProjectCard
                    projectImageUrl={pokemon}
                    title="title"
                    subtitle="subtitle"
                    badgeLabel="badge label"
                />
                <GlProjectCard
                    projectImageUrl={webinaire}
                    title="title"
                    subtitle="subtitle"
                    badgeLabel="badge label"
                />
            </GlCards>
            <GlCheckList
                heading="Check list heading"
                subHeading="check list subheading"
                elements={[
                    {
                        "title": "Item 1",
                        "description":
                            "description of Item 1 sdlkj sdlfkj sdlfkj sdlfk lsdf slkj sldjf lsldkjf lsdflskj ",
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
                ]}
            />
        </GlTemplate>
    );
}

render(<App />, document.getElementById("root"));
