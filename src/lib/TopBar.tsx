/* eslint-disable @typescript-eslint/no-explicit-any */
import List from "@material-ui/core/List";
import Link from "@material-ui/core/Link";
import { createUseClassNames } from "./theme";
import UnfoldIcon from "@material-ui/icons/Dehaze";
import { useNamedState } from "powerhooks/useNamedState";
import { useConstCallback } from "powerhooks/useConstCallback";
import { cx } from "tss-react";
import { useClickAway } from "powerhooks/useClickAway";
import { useRef, useEffect, useMemo, useState } from "react";
import { Logo } from "./components/Logo";
import ReactMarkDown from "react-markdown";

function getSmallDeviceBreakPoint(params: {
    menuRef: React.RefObject<HTMLDivElement>;
    darkModSwitchAndGithubRef: React.RefObject<HTMLDivElement>;
}) {
    const { darkModSwitchAndGithubRef, menuRef } = params;
    const [x, setX] = useState(0);

    useEffect(() => {
        setX(1);
    }, []);

    const out = useMemo(() => {
        const menuWidth = !menuRef.current ? 0 : menuRef.current.getBoundingClientRect().width;

        const darkModSwitchAndGithubWidth = !darkModSwitchAndGithubRef.current
            ? 0
            : darkModSwitchAndGithubRef.current.getBoundingClientRect().width;

        return menuWidth + darkModSwitchAndGithubWidth + 100 + 50;
    }, [x]);

    return out;
}

export type Props = {
    /**
     * If you use an svg image that does not have a fill,
     * the fill will be set to the current font color,
     * depending on the dark mode being active.
     */
    title?: {
        type: "logo" | "markdown";
        logoUrl?: string;
        markdown?: string;
    };
    menuItems?: {
        name: string;
        url: string;
    }[];
    className?: string;
};

export const topBarDefaultProps: Props = {
    "title": {
        "type": "markdown",
        "markdown": `Espace documentaire du **SSP Cloud**`,
    },
    "menuItems": [
        {
            "name": "Documentation",
            "url": "",
        },
        {
            "name": "Le datalab",
            "url": "",
        },
        {
            "name": "Contribuer",
            "url": "",
        },
        {
            "name": "Actualités et projets",
            "url": "",
        },
    ],
};

const { useClassNames } = createUseClassNames<{
    mobileMenuHeight: number;
    smallDeviceBreakPointPx: number;
}>()((theme, { mobileMenuHeight, smallDeviceBreakPointPx }) => ({
    "root": {
        "display": "flex",
        "justifyContent": "flex-end",
        "flexWrap": "wrap",
        "alignItems": "center",
        "width": "100%",
        "padding": "0px 100px 0px 100px",
    },
    "logo": {
        "display": "flex",
        "alignItems": "center",
        "marginRight": "auto",
        "& p": {
            "fontSize": "28px",
            "lineHeight": "32px",
        },
        "& svg": {
            "fill": theme.isDarkModeEnabled ? "white" : "black",
            "height": 50,
            "width": 50,
        },
    },
    "itemWrapper": {
        [`@media (max-width: ${smallDeviceBreakPointPx}px)`]: {
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
        [`@media (max-width: ${smallDeviceBreakPointPx}px)`]: {
            "margin": "5px 0 5px 0",
        },
    },

    "githubAndDarkModeSwitch": {
        "display": "flex",
        "alignItems": "center",
        "marginLeft": 20,
        "& button": {
            "marginLeft": 20,
        },
    },
    "unfold": {
        "order": 2,
        "marginLeft": 10,
        "display": "none",
        "cursor": "pointer",
        [`@media (max-width: ${smallDeviceBreakPointPx}px)`]: {
            "display": "flex",
            "alignItems": "center",
        },
    },
}));

export function TopBar(props: Props) {
    const { menuItems, title, className } = props;

    const { mobileMenuHeight, setMobileMenuHeight } = useNamedState("mobileMenuHeight", 0);

    const { rootRef } = useClickAway(() => setMobileMenuHeight(0));

    const menuRef = useRef<HTMLDivElement>(null);

    const darkModSwitchAndGithubRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const script = document.createElement("script");

        script.src = "https://buttons.github.io/buttons.js";
        script.async = true;

        document.body.appendChild(script);

        return () => {
            document.body.removeChild(script);
        };
    }, []);

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

    const smallDeviceBreakPointPx = getSmallDeviceBreakPoint({
        menuRef,
        darkModSwitchAndGithubRef,
    });

    const { classNames } = useClassNames({
        mobileMenuHeight,
        smallDeviceBreakPointPx,
    });

    return (
        <List className={cx(classNames.root, className)} component="nav">
            {(() => {
                if (title === undefined) {
                    return;
                }

                if (title.type === "logo") {
                    return (
                        title.logoUrl !== undefined && (
                            <Logo logoUrl={title.logoUrl} className={classNames.logo} />
                        )
                    );
                }

                return (
                    title.markdown !== undefined && (
                        <ReactMarkDown className={classNames.logo}>{title.markdown}</ReactMarkDown>
                    )
                );
            })()}
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
