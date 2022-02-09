import { render } from "react-dom";
import { GlTemplate } from "gitlanding/GlTemplate";
//import { GlHeader } from "gitlanding/GlHeader";
import { GlHero } from "gitlanding/GlHero";
import { GlArticle } from "gitlanding/GlArticle";
import { GlIllustration } from "gitlanding/GlIllustration";
import { GlFooter } from "gitlanding/GlFooter";
import { GlSectionDivider } from "gitlanding/GlSectionDivider";
import { GlCards } from "gitlanding/GlCards";
import { GlLogoCard } from "gitlanding/GlCards/GlLogoCard";
import { GlProjectCard } from "gitlanding/GlCards/GlProjectCard";
import { GlCheckList } from "gitlanding/GlCheckList";
import { GlSlider } from "gitlanding/GlSlider";
import { GlReviewSlide } from "gitlanding/GlReviewSlide";
import heroImage2 from "./assets/test-images/test2.png";
import { Header } from "gitlanding/GlHeader2";

function App() {
    return (
        <GlTemplate
            header={
                <Header
                    title="Title"
                    links={[
                        {
                            "label": "link 1",
                            "href": "https://example.com",
                        },
                        {
                            "label": "link 2",
                            "href": "https://example.com",
                        },
                        {
                            "label": "link 3",
                            "href": "https://example.com",
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
            footer={
                <GlFooter
                    bottomDivContent="Licence M I T"
                    email="email@email.com"
                    phoneNumber="+33545345676"
                    links={[
                        {
                            "href": "https://example.com",
                            "label": "link 1",
                        },
                        {
                            "href": "https://example.com",
                            "label": "link 2",
                        },
                        {
                            "href": "https://www.npmjs.com/package/tss-react",
                            "label": (
                                <img
                                    src="https://img.shields.io/npm/dw/tss-react"
                                    alt=""
                                />
                            ),
                        },
                    ]}
                />
            }
        >
            <GlHero
                title="Hero title"
                subTitle={"Hero subtitle"}
                imageSrc={heroImage2}
                linkToSectionBelowId="firstSection"
                hasImageShadow={false}
            />

            <GlArticle
                id="firstSection"
                title="Article title"
                body={`Lorem ipsum dolor sit amet, consectetur adipiscing elit. In cursus, 
        nisl nec hendrerit rutrum, 
        mi enim semper arcu, ut imperdiet urna libero non metus. 
        Donec imperdiet ac nulla sit amet lacinia. 
        Suspendisse volutpat lectus vitae libero luctus, a egestas magna egestas. 
        Suspendisse potenti. In semper erat scelerisque sapien convallis porttitor.`}
                buttonLabel={
                    <img src="https://img.shields.io/npm/dw/tss-react" alt="" />
                }
                buttonLink={{
                    "href": "https://example.com",
                }}
                illustration={
                    <GlIllustration
                        type="code"
                        hasDecorativeVsCodeButtons={true}
                        isCopyBlock={true}
                        copiedToClipboardMessage="copied!"
                        language="typescript"
                        text={`function sum(x: number, y: number): number{
    return x + y;
}`}
                    />
                }
                hasAnimation={true}
                illustrationPosition="left"
            />

            <GlCards>
                {
                    <>
                        <GlLogoCard
                            title="Card title"
                            paragraph={`Lorem ipsum dolor sit amet, consectetur adipiscing elit. In cursus, 
                nisl nec hendrerit rutrum, 
                mi enim semper arcu, ut imperdiet urna libero non metus.`}
                            buttonLabel="Button Label"
                            iconUrls={[
                                "https://user-images.githubusercontent.com/39378411/135731999-a2d8f901-3d7d-40a9-b59f-102ee1facc45.png",
                                "https://user-images.githubusercontent.com/39378411/135731995-136d4baf-58a6-4cb3-a72c-b8ddce835b3c.png",
                            ]}
                        />
                        <GlLogoCard
                            title="Card title"
                            paragraph={`Lorem ipsum dolor sit amet, consectetur adipiscing elit. In cursus, 
                nisl nec hendrerit rutrum, 
                mi enim semper arcu, ut imperdiet urna libero non metus.`}
                            buttonLabel="Button Label"
                            iconUrls={[
                                "https://user-images.githubusercontent.com/39378411/135731998-e01a7970-a7c4-4041-b07c-341e075207d2.png",
                            ]}
                        />

                        <GlLogoCard
                            title="Card title"
                            paragraph={`Lorem ipsum dolor sit amet, consectetur adipiscing elit. In cursus, 
                nisl nec hendrerit rutrum, 
                mi enim semper arcu, ut imperdiet urna libero non metus.`}
                            buttonLabel="Button Label"
                            iconUrls={[
                                "https://user-images.githubusercontent.com/39378411/135731991-3da13e97-c2f7-42b2-88ab-055aff0d6ae9.png",
                                "https://user-images.githubusercontent.com/39378411/135731994-29a3c46a-0d92-4ec8-954e-39bfeeb06534.png",
                                "https://user-images.githubusercontent.com/39378411/135731998-e01a7970-a7c4-4041-b07c-341e075207d2.png",
                                "https://user-images.githubusercontent.com/39378411/135731990-8f64ce8e-d655-4ded-9561-3d7f6893d06e.png",
                            ]}
                            overlapIcons={true}
                        />
                    </>
                }
            </GlCards>

            <GlSectionDivider />

            <GlArticle
                title="Article title"
                body={`Lorem ipsum dolor sit amet, consectetur adipiscing elit. In cursus, 
        nisl nec hendrerit rutrum, 
        mi enim semper arcu, ut imperdiet urna libero non metus. 
        Donec imperdiet ac nulla sit amet lacinia. 
        Suspendisse volutpat lectus vitae libero luctus, a egestas magna egestas. 
        Suspendisse potenti. In semper erat scelerisque sapien convallis porttitor.`}
                buttonLabel="Article Button label"
                buttonLink={{
                    "href": "https://example.com",
                }}
                illustration={
                    <GlIllustration
                        type="image"
                        url="https://user-images.githubusercontent.com/39378411/135731816-5ba39459-d95e-413d-b515-92a7b0dc5acf.png"
                        hasShadow={false}
                    />
                }
                hasAnimation={true}
            />

            <GlCards>
                <>
                    <GlProjectCard
                        title="Project Card Title"
                        subtitle="Project Card Subtitle"
                        projectImageUrl="https://user-images.githubusercontent.com/39378411/135731821-0f1c7165-fada-418f-896a-c36a0e55171b.png"
                    />
                    <GlProjectCard
                        title="Project Card Title"
                        subtitle="Project Card Subtitle"
                        projectImageUrl="https://user-images.githubusercontent.com/39378411/135731810-93193eba-ada5-460a-96ad-948215278850.png"
                    />
                    <GlProjectCard
                        title="Project Card Title"
                        subtitle="Project Card Subtitle"
                        projectImageUrl="https://user-images.githubusercontent.com/39378411/135731819-1cf18697-e946-449f-ad6e-be414e341c40.png"
                    />
                    <GlProjectCard
                        title="Project Card Title"
                        subtitle="Project Card Subtitle"
                        projectImageUrl="https://user-images.githubusercontent.com/39378411/135731914-0265b77e-3338-4747-b014-e845f16332a7.png"
                    />
                </>
            </GlCards>

            <GlSectionDivider />

            <GlCheckList
                heading="Check List Heading"
                hasAnimation={true}
                elements={[
                    {
                        "title": "List element title",
                        "description": `Lorem ipsum dolor sit amet, consectetur adipiscing elit. In cursus, 
              nisl nec hendrerit rutrum, 
              mi enim semper arcu, ut imperdiet urna libero non metus. 
              Donec imperdiet ac nulla sit amet lacinia.
            `,
                    },
                    {
                        "title": "List element title",
                        "description": `Lorem ipsum dolor sit amet, consectetur adipiscing elit. In cursus, 
              nisl nec hendrerit rutrum, 
              mi enim semper arcu, ut imperdiet urna libero non metus. 
              Donec imperdiet ac nulla sit amet lacinia.
            `,
                    },
                    {
                        "title": "List element title",
                        "description": `Lorem ipsum dolor sit amet, consectetur adipiscing elit. In cursus, 
              nisl nec hendrerit rutrum, 
              mi enim semper arcu, ut imperdiet urna libero non metus. 
              Donec imperdiet ac nulla sit amet lacinia.
            `,
                    },
                    {
                        "title": "List element title",
                        "description": `Lorem ipsum dolor sit amet, consectetur adipiscing elit. In cursus, 
              nisl nec hendrerit rutrum, 
              mi enim semper arcu, ut imperdiet urna libero non metus. 
              Donec imperdiet ac nulla sit amet lacinia.
            `,
                    },
                    {
                        "title": "List element title",
                        "description": `Lorem ipsum dolor sit amet, consectetur adipiscing elit. In cursus, 
              nisl nec hendrerit rutrum, 
              mi enim semper arcu, ut imperdiet urna libero non metus. 
              Donec imperdiet ac nulla sit amet lacinia.
            `,
                    },
                    {
                        "title": "List element title",
                        "description": `Lorem ipsum dolor sit amet, consectetur adipiscing elit. In cursus, 
              nisl nec hendrerit rutrum, 
              mi enim semper arcu, ut imperdiet urna libero non metus. 
              Donec imperdiet ac nulla sit amet lacinia.
            `,
                    },
                ]}
            />

            <GlSectionDivider />

            <GlSlider
                title="Review slider title"
                autoPlayTimeInterval={4}
                slides={[
                    <GlReviewSlide
                        descriptionMd={`Lorem ipsum dolor sit amet, consectetur adipiscing elit. In cursus, 
        nisl nec hendrerit rutrum, 
        mi enim semper arcu, ut imperdiet urna libero non metus. 
        Donec imperdiet ac nulla sit amet lacinia. 
        Suspendisse volutpat lectus vitae libero luctus, a egestas magna egestas. 
        Suspendisse potenti. In semper erat scelerisque sapien convallis porttitor.
            `}
                        signature="Signature montpe qsdfmlkj zepoi qsdmlkj ezoir dsfj aezoiru qsdlfkj aezroiu qmldskjf ozeoioidfjgh qsdf lkjhz eroiu kj"
                    />,
                    <GlReviewSlide
                        logoUrl="https://user-images.githubusercontent.com/39378411/135731995-136d4baf-58a6-4cb3-a72c-b8ddce835b3c.png"
                        descriptionMd={`Lorem ipsum dolor sit amet, consectetur adipiscing elit. In cursus, 
        nisl nec hendrerit rutrum, 
        mi enim semper arcu, ut imperdiet urna libero non metus. 
        Donec imperdiet ac nulla sit amet lacinia. 
        Suspendisse volutpat lectus vitae libero luctus, a egestas magna egestas. 
        Suspendisse potenti. In semper erat scelerisque sapien convallis porttitor.
            `}
                        signature="Signature"
                    />,
                    <GlReviewSlide
                        logoUrl="https://user-images.githubusercontent.com/39378411/135731999-a2d8f901-3d7d-40a9-b59f-102ee1facc45.png"
                        descriptionMd={`Lorem ipsum dolor sit amet, consectetur adipiscing elit. In cursus, 
        nisl nec hendrerit rutrum, 
        mi enim semper arcu, ut imperdiet urna libero non metus. 
        Donec imperdiet ac nulla sit amet lacinia. 
        Suspendisse volutpat lectus vitae libero luctus, a egestas magna egestas. 
        Suspendisse potenti. In semper erat scelerisque sapien convallis porttitor.
            `}
                        signature="Signature"
                    />,
                ]}
            />
        </GlTemplate>
    );
}

render(<App />, document.getElementById("root"));
