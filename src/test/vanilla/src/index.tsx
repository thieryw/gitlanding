import { render } from "react-dom";
import { GlTemplate } from "gitlanding/GlTemplate";
import { GlHeader } from "gitlanding/GlHeader";
import { GlHero } from "gitlanding/GlHero";
import { GlCards } from "gitlanding/GlCards";
import { GlMetricCard } from "gitlanding/GlCards/GlMetricCard";
import { GlArticle } from "gitlanding/GlArticle";
import { GlIllustration } from "gitlanding/GlIllustration";
import { GlLogoCard } from "gitlanding/GlCards/GlLogoCard";
import { GlProjectCard } from "gitlanding/GlCards/GlProjectCard";
import { GlSectionDivider } from "gitlanding/GlSectionDivider";
import heroHeaderPngUrl from "./assets/illustrations/heroHeader.png";
import catalogIconUrl from "./assets/svg/Catalog.svg";
import trainingIconUrl from "./assets/svg/Trainings2.svg";
import datalabPngUrl from "./assets/illustrations/datalab.png";
import gitlabPngUrl from "./assets/collaborative_tools/gitlab.png";
import githubPngUrl from "./assets/collaborative_tools/github.png";
import tchapPngUrl from "./assets/collaborative_tools/tchap.png";
import rocketPngUrl from "./assets/collaborative_tools/rocket-chat.png";
import drawioPngUrl from "./assets/collaborative_tools/drawio.png";
import ballonPngUrl from "./assets/collaborative_tools/balloon.png";
import plusPngUrl from "./assets/collaborative_tools/+.png";
import dataVisuPngUrl from "./assets/illustrations/datavisualisation.png";
import pokemonPngUrl from "./assets/illustrations/pokemon.png";
import kubernetesPngUrl from "./assets/illustrations/kubernetes.png";
import webinairePngUrl from "./assets/illustrations/webinaire.png";

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
                />
            }
            headerOptions={{
                "position": "fixed",
                "isRetracted": "smart",
            }}
        >
            <GlHero
                title="Hero Title"
                subTitle={"Hero subtitle"}
                imageSrc={heroHeaderPngUrl}
                linkToSectionBelowId="firstSection"
            />

            <GlCards id="firstSection">
                <GlMetricCard
                    number={129}
                    subHeading="Metric card subHeading"
                    iconUrl={catalogIconUrl}
                    buttonLabel="Button label"
                    link={{ "href": "https://example.com" }}
                    isNumberAnimated={true}
                    timeIntervalBetweenNumbersMs={4}
                />
                <GlMetricCard
                    number={19}
                    subHeading="Metric card subHeading"
                    iconUrl={trainingIconUrl}
                    buttonLabel="Button label"
                    link={{ "href": "https://example.com" }}
                    isNumberAnimated={true}
                />
                <GlMetricCard
                    number={200}
                    subHeading="Metric card subHeading"
                    iconUrl={trainingIconUrl}
                    buttonLabel="Button label"
                    link={{ "href": "https://example.com" }}
                    isNumberAnimated={true}
                    timeIntervalBetweenNumbersMs={4}
                />
            </GlCards>

            <GlArticle
                title="Article title"
                body="Article body"
                buttonLabel="Article Button label"
                buttonLink={{
                    "href": "https://example.com",
                }}
                illustration={
                    <GlIllustration type="image" url={datalabPngUrl} />
                }
                hasAnimation={true}
            />
            <GlSectionDivider />

            <GlCards title="Cards title">
                <GlLogoCard
                    title="Logo card title"
                    paragraph="Logo card paragraph"
                    iconUrls={[gitlabPngUrl, githubPngUrl]}
                    buttonLabel="Button label"
                    link={{
                        "href": "https://explorer.com",
                    }}
                />
                <GlLogoCard
                    title="Logo card title"
                    paragraph="Logo card paragraph"
                    iconUrls={[tchapPngUrl]}
                    buttonLabel="Button label"
                    link={{
                        "href": "https://explorer.com",
                    }}
                />
                <GlLogoCard
                    title="Logo card title"
                    paragraph="Logo card paragraph"
                    iconUrls={[
                        rocketPngUrl,
                        drawioPngUrl,
                        ballonPngUrl,
                        plusPngUrl,
                    ]}
                    buttonLabel="Button label"
                    overlapIcons={true}
                    link={{
                        "href": "https://explorer.com",
                    }}
                />
            </GlCards>

            <GlArticle
                title="Article title"
                body="Article body"
                buttonLabel="Button label"
                buttonLink={{
                    "href": "https://explorer.com",
                }}
                illustration={
                    <GlIllustration
                        type="code"
                        language="typescript"
                        hasDecorativeVsCodeButtons={true}
                        text={[
                            "function sum(x: number, y: number){\n",
                            "   return x + y;\n",
                            "}\n",
                            "console.log(sum(12, 14));",
                        ].join("")}
                    />
                }
                illustrationPosition="left"
                hasAnimation={true}
            />

            <GlCards title="Cards title">
                <GlProjectCard
                    projectImageUrl={dataVisuPngUrl}
                    title="Project card title"
                    subtitle="Project card subtitle"
                    date="01/04/2021"
                    link={{
                        "href": "https://example.com",
                    }}
                    badgeLabel="badge label"
                />
                <GlProjectCard
                    projectImageUrl={pokemonPngUrl}
                    title="Project card title"
                    subtitle="Project card subtitle"
                    date="15/01/2021"
                    link={{
                        "href": "https://example.com",
                    }}
                    badgeLabel="badge label"
                />
                <GlProjectCard
                    projectImageUrl={kubernetesPngUrl}
                    title="Project card title"
                    subtitle="Project card subtitle"
                    date="25/03/2021"
                    link={{
                        "href": "https://example.com",
                    }}
                    badgeLabel="badge label"
                />
                <GlProjectCard
                    projectImageUrl={webinairePngUrl}
                    title="Project card title"
                    subtitle="Project card subtitle"
                    date="15/11/2020"
                    link={{
                        "href": "https://example.com",
                    }}
                    badgeLabel="badge label"
                />
            </GlCards>
        </GlTemplate>
    );
}

render(<App />, document.getElementById("root"));
