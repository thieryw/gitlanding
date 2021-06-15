/* eslint-disable @typescript-eslint/no-namespace */
/* eslint-disable @typescript-eslint/no-explicit-any */
import List from "@material-ui/core/List";
import Link from "@material-ui/core/Link";
import { useNamedState } from "powerhooks/useNamedState";
import { useConstCallback } from "powerhooks/useConstCallback";
import { cx } from "tss-react";
import { useClickAway } from "powerhooks/useClickAway";
import { useRef } from "react";
import { Logo } from "./Logo";
import ReactMarkDown from "react-markdown";
import { Typography } from "onyxia-ui/Typography";
import { Icon } from "../theme";
import { getThemeApi } from "../theme";
import { useGuaranteedMemo } from "powerhooks";

/*function getSmallDeviceBreakPoint(params: {
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
}*/

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

const getUseClassNames = () => {
    const { createUseClassNames } = getThemeApi();

    const { useClassNames } = createUseClassNames<{
        mobileMenuHeight: number;
    }>()((theme, { mobileMenuHeight }) => ({
        "root": {
            "display": "flex",
            "justifyContent": "flex-end",
            "flexWrap": "wrap",
            "alignItems": "center",
            "width": "100%",
            "padding": [4.5, 12.5, 4.5, 12.5].map(spacing => `${theme.spacing(spacing)}px`).join(" "),
            [theme.breakpoints.down(1440)]: {
                "padding": [2, 8, 2, 8].map(spacing => `${theme.spacing(spacing)}px`).join(" "),
            },
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
            [theme.breakpoints.down("md")]: {
                "transition": "height 400ms",
                "order": 3,
                "flex": "1 0 100%",
                "textAlign": "left",
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
            [theme.breakpoints.down(1440)]: {
                "marginLeft": theme.spacing(3),
            },
        },

        "unfold": {
            "order": 2,
            "marginLeft": 10,
            "display": "none",
            "cursor": "pointer",
            [theme.breakpoints.down("md")]: {
                "display": "flex",
                "alignItems": "center",
            },
        },
    }));

    return { useClassNames };
};

export function TopBar(props: Props) {
    const { menuItems, title, className } = props;

    const { mobileMenuHeight, setMobileMenuHeight } = useNamedState("mobileMenuHeight", 0);

    const { rootRef } = useClickAway(() => setMobileMenuHeight(0));

    const titleRef = useRef<HTMLDivElement>(null);
    const menuRef = useRef<HTMLDivElement>(null);

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

    const { useClassNames } = useGuaranteedMemo(() => getUseClassNames(), []);

    const { classNames } = useClassNames({
        mobileMenuHeight,
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
                <Icon id="dehaze" onClick={toggleMobileMenu} />
            </div>
        </List>
    );
}
