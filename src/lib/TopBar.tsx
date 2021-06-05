/* eslint-disable @typescript-eslint/no-namespace */
/* eslint-disable @typescript-eslint/no-explicit-any */
import List from "@material-ui/core/List";
import Link from "@material-ui/core/Link";
import { createUseClassNames } from "./theme";
import UnfoldIcon from "@material-ui/icons/Dehaze";
import { useNamedState } from "powerhooks/useNamedState";
import { useConstCallback } from "powerhooks/useConstCallback";
import { cx } from "tss-react";
import { useClickAway } from "powerhooks/useClickAway";
import { useRef, useEffect } from "react";
import { Logo } from "./components/Logo";
import ReactMarkDown from "react-markdown";
import { Typography } from "onyxia-ui/Typography";
import { Evt } from "evt";
import { useEvt } from "evt/hooks";

function getSmallDeviceBreakPoint(params: {
    menuRef: React.RefObject<HTMLDivElement>;
    titleRef: React.RefObject<HTMLDivElement>;
}) {
    const { menuRef, titleRef } = params;

    const out = () => {
        const menuWidth = !menuRef.current ? 0 : menuRef.current.clientWidth;

        const titleWidth = !titleRef.current ? 0 : titleRef.current.clientWidth;

        return menuWidth + titleWidth + 200;
    };

    return out();
}

declare namespace Title {
    export type Logo = {
        type: "logo";
        logoUrl: string;
    };

    export type Markdown = {
        type: "markdown";
        markdown: string;
    };
}

export type Props = {
    /**
     * If you use an svg image that does not have a fill,
     * the fill will be set to the current font color,
     * depending on the dark mode being active.
     */
    title?: Title.Logo | Title.Markdown;
    menuItems?: {
        name: string;
        url: string;
    }[];
    className?: string;
};

const { useClassNames } = createUseClassNames<{
    mobileMenuHeight: number;
    smallDeviceBreakPoint: number;
}>()((theme, { mobileMenuHeight, smallDeviceBreakPoint }) => ({
    "root": {
        "display": "flex",
        "justifyContent": "flex-end",
        "flexWrap": "wrap",
        "alignItems": "center",
        "width": "100%",
        "padding": "36px 100px 36px 100px",
    },
    "title": {
        "display": "flex",
        "alignItems": "center",
        "marginRight": "auto",
        "& svg": {
            "height": 50,
            "width": 50,
        },
    },
    "itemWrapper": {
        [`@media (max-width: ${smallDeviceBreakPoint}px)`]: {
            "transition": "height 400ms",
            "order": 3,
            "flex": "1 0 100%",
            "textAlign": "left",
            "marginTop": 20,
            "height": mobileMenuHeight,
            "overflow": "hidden",
            "display": "flex",
            "flexDirection": "column",
        },
    },
    "link": {
        "color": theme.isDarkModeEnabled ? "white" : "black",
        "fontSize": "22px",
        "lineHeight": "32px",
        "marginLeft": theme.spacing(8),
        [`@media (max-width: ${smallDeviceBreakPoint}px)`]: {
            "margin": "5px 0 5px 0",
        },
    },

    "unfold": {
        "order": 2,
        "marginLeft": 10,
        "display": "none",
        "cursor": "pointer",
        [`@media (max-width: ${smallDeviceBreakPoint}px)`]: {
            "display": "flex",
            "alignItems": "center",
        },
    },
}));

export function TopBar(props: Props) {
    const { menuItems, title, className } = props;

    const { mobileMenuHeight, setMobileMenuHeight } = useNamedState("mobileMenuHeight", 0);

    const { rootRef } = useClickAway(() => setMobileMenuHeight(0));

    const titleRef = useRef<HTMLDivElement>(null);
    const menuRef = useRef<HTMLDivElement>(null);

    const { setSmallDeviceBreakPoint, smallDeviceBreakPoint } = useNamedState(
        "smallDeviceBreakPoint",
        getSmallDeviceBreakPoint({ titleRef, menuRef }),
    );

    const toggleMobileMenu = useConstCallback(() => {
        if (mobileMenuHeight !== 0) {
            setMobileMenuHeight(0);
            return;
        }

        const menuItems = document.getElementsByClassName("menu-item");

        const newHeight =
            (parseInt(getComputedStyle(menuItems[0]).marginTop.replace("px", "")) +
                parseInt(getComputedStyle(menuItems[0]).marginBottom.replace("px", "")) +
                menuItems[0].clientHeight) *
            menuItems.length;

        setMobileMenuHeight(newHeight);
    });

    useEvt(
        ctx =>
            Evt.from(ctx, window, "resize").attach(() =>
                setSmallDeviceBreakPoint(getSmallDeviceBreakPoint({ menuRef, titleRef })),
            ),
        [],
    );

    useEffect(() => {
        setSmallDeviceBreakPoint(getSmallDeviceBreakPoint({ menuRef, titleRef }));
    }, []);

    const { classNames } = useClassNames({
        mobileMenuHeight,
        smallDeviceBreakPoint,
    });

    return (
        <List className={cx(classNames.root, className)} component="nav">
            <div ref={titleRef} className={classNames.title}>
                {(() => {
                    if (title === undefined) {
                        return;
                    }

                    if (title.type === "logo") {
                        return <Logo logoUrl={title.logoUrl} />;
                    }
                    return (
                        <Typography variant="h3">
                            <ReactMarkDown>{title.markdown}</ReactMarkDown>
                        </Typography>
                    );
                })()}
            </div>
            <div ref={menuRef} className={classNames.itemWrapper}>
                {menuItems !== undefined &&
                    menuItems.map(item => (
                        <Link
                            className={cx(classNames.link, "menu-item")}
                            href={item.url}
                            key={JSON.stringify(item.name + item.url)}
                        >
                            {item.name}
                        </Link>
                    ))}
            </div>

            <div ref={rootRef} className={classNames.unfold}>
                <UnfoldIcon onClick={toggleMobileMenu} />
            </div>
        </List>
    );
}
