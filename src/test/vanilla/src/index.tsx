import { createRoot } from "react-dom/client";
import React from "react";
import { GlTemplate } from "gitlanding/GlTemplate";
import { GlHero } from "gitlanding/GlHero/GlHero";
import { GlArticle } from "gitlanding/GlArticle";
import { GlFooter } from "gitlanding/GlFooter";
import { GlSectionDivider } from "gitlanding/GlSectionDivider";
import { GlCards } from "gitlanding/GlCards";
import { GlLogoCard } from "gitlanding/GlCards/GlLogoCard";
import { GlMetricCard } from "gitlanding/GlCards/GlMetricCard";
import { GlProjectCard } from "gitlanding/GlCards/GlProjectCard";
import { GlCheckList } from "gitlanding/GlCheckList";
import { GlSlider } from "gitlanding/GlSlider";
import { GlReviewSlide } from "gitlanding/GlReviewSlide";
import { GlHeader } from "gitlanding/GlHeader";
/*import videoSafari from "./assets/videos/vsafari.mp4";
import videoChrome from "./assets/videos/vchrome.webm";*/
import imageSrc from "./assets/test-images/test6.jpeg";
import contribImageSrc from "./assets/illustrations/contribution.png";
import sspcloudMp4 from "./assets/videos/sspcloud.mp4";
import { GlCodeBlock } from "gitlanding/GlCodeBlock";
import { ReactComponent as TileSvg } from "./assets/svg/tile.svg";
import { css } from "tss-react/@emotion/css";

function App() {
    return (
        <GlTemplate
            hasTopOfPageLinkButton={true}
            header={
                <GlHeader
                    title="Title large screen light"
                    links={[
                        {
                            "label": "link1",
                            "href": "https://example.com",
                        },
                        {
                            "label": "link2",
                            "href": "https://example.com",
                        },
                        {
                            "label": "link3",
                            "href": "https://example.com",
                        },
                    ]}
                    enableDarkModeSwitch={true}
                    githubRepoUrl="https://github.com/torvalds/linux"
                    githubButtonSize="large"
                    customItemEnd={{
                        "item": <button>Custom Item Start</button>,
                        "behaviorOnSmallDevice": "hide",
                    }}
                    customItemStart={{
                        "item": <button>Custom Item End</button>,
                        "behaviorOnSmallDevice": "wrap",
                    }}
                />
            }
            headerOptions={{
                "position": "sticky",
                "isRetracted": "smart",
            }}
            body={
                <>
                    <GlHero
                        title="Hero title very very long title indeed"
                        subTitle={
                            "Hero subtitle very very long sub title indeed"
                        }
                        hasLinkToSectionBellow={true}
                        hasAnimation={false}
                        illustration={{
                            "type": "image",
                            "src": imageSrc,
                        }}
                        //illustrationZoomFactor={1.2}
                    />

                    <GlCards title="Title">
                        <GlMetricCard
                            buttonLabel="button label"
                            isNumberAnimated={true}
                            number={44}
                            subHeading="sub heading"
                        />
                        <GlMetricCard
                            buttonLabel="button label"
                            isNumberAnimated={true}
                            number={44}
                            subHeading="sub heading"
                        />
                        <GlMetricCard
                            buttonLabel="button label"
                            isNumberAnimated={true}
                            number={44}
                            subHeading="sub heading"
                        />
                    </GlCards>

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
                            <img
                                src="https://img.shields.io/npm/dw/tss-react"
                                alt=""
                            />
                        }
                        buttonLink={{
                            "href": "https://example.com",
                        }}
                        illustration={{
                            "type": "custom component",
                            "Component": () => (
                                <GlCodeBlock
                                    hasCopyButton={true}
                                    showLineNumbers={true}
                                    language="typescript"
                                    text={`function sum(x: number, y: number): number {
    return x + y;
}`}
                                />
                            ),
                        }}
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
                mi enim semper arcu, ut imperdiet urna libero non metus.
                nisl nec hendrerit rutrum, 
                mi enim semper arcu, ut imperdiet urna libero non metus.
                `}
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
                        illustration={{
                            "type": "video",
                            "hasShadow": false,
                            "sources": [
                                {
                                    "src": sspcloudMp4,
                                    "type": "video/mp4",
                                },
                            ],
                        }}
                        hasAnimation={true}
                    />

                    <GlCards>
                        <>
                            <GlProjectCard
                                title="Project Card Title verry long title xxxxxxxxxxxxxxxx"
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
                        illustration={{
                            "type": "image",
                            "src": contribImageSrc,
                            "hasShadow": false,
                        }}
                        hasAnimation={true}
                    />

                    <GlCheckList
                        heading="Check List Heading"
                        hasAnimation={true}
                        CheckIcon={TileSvg}
                        classes={{
                            "checkIcon": css({
                                "& g": {
                                    //TODO: Refactor so we can access the theme
                                    "fill": "orange",
                                },
                            }),
                        }}
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
                                "description": `(Only description) Lorem ipsum dolor sit amet, consectetur adipiscing elit. In cursus, 
              nisl nec hendrerit rutrum, 
              mi enim semper arcu, ut imperdiet urna libero non metus. 
              Donec imperdiet ac nulla sit amet lacinia.
            `,
                            },
                            {
                                "title": "(Only title) List element title",
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
                </>
            }
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
        />
    );
}

createRoot(document.getElementById("root")!).render(<App />);
