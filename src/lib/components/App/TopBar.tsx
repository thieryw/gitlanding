/* eslint-disable @typescript-eslint/no-explicit-any */
import List from "@material-ui/core/List";
import Link from "@material-ui/core/Link";
import { createUseClassNames } from "../../theme/useClassesNames";
import { DarkModeSwitch } from "../design-system/DarkModeSwitch";
import { GithubStarCount } from "../design-system/GithubStarCount";
import UnfoldIcon from "@material-ui/icons/Dehaze";
import { useNamedState } from "powerhooks/useNamedState";
import { useConstCallback } from "powerhooks/useConstCallback";
import { cx } from "tss-react";
import { useClickAway } from "powerhooks/useClickAway";
import { useRef, useEffect, useMemo, useState } from "react";
import { Logo } from "../design-system/Logo";

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
    logoUrl?: string;
    extraMenuItems?: {
        items: {
            name: string;
            url: string;
        }[];
    };

    documentationUrl?: string;
    githubRepoUrl?: string;
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
        "padding": 20,
        "width": 1200,
        "@media (max-width: 1200px)": {
            "width": "100%",
        },
    },
    "logo": {
        "height": 50,
        "marginRight": "auto",
    },
    "logoSvg": {
        "marginRight": "auto",
        "& svg": {
            "fill": theme.palette.type === "dark" ? "white" : "black",
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
        "color": theme.palette.type === "dark" ? "white" : "black",
        "textTransform": "uppercase",
        "margin": "0 15px 0 15px",
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

export const TopBar = (props: Props) => {
    const { extraMenuItems, logoUrl, githubRepoUrl, documentationUrl } = props;

    const { mobileMenuHeight, setMobileMenuHeight } = useNamedState("mobileMenuHeight", 0);

    const { rootRef } = useClickAway(() => setMobileMenuHeight(0));

    const menuRef = useRef<HTMLDivElement>(null);

    const darkModSwitchAndGithubRef = useRef<HTMLDivElement>(null);

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
        <List className={classNames.root} component="nav">
            {logoUrl !== undefined && (
                <Logo
                    logoUrl={logoUrl}
                    classNameImg={classNames.logo}
                    classNameSvg={classNames.logoSvg}
                />
            )}
            <div ref={menuRef} className={classNames.itemWrapper}>
                {extraMenuItems !== undefined &&
                    extraMenuItems.items.map(item => (
                        <Link
                            className={cx(classNames.link, "menu-item")}
                            href={item.url}
                            key={JSON.stringify(item.name + item.url)}
                        >
                            {item.name}
                        </Link>
                    ))}

                {githubRepoUrl !== undefined && (
                    <Link className={cx(classNames.link, "menu-item")} href={githubRepoUrl}>
                        github
                    </Link>
                )}

                {documentationUrl !== undefined && (
                    <Link className={cx(classNames.link, "menu-item")} href={documentationUrl}>
                        documentation
                    </Link>
                )}
            </div>

            <div ref={rootRef} className={classNames.unfold}>
                <UnfoldIcon onClick={toggleMobileMenu} />
            </div>

            <div ref={darkModSwitchAndGithubRef} className={classNames.githubAndDarkModeSwitch}>
                {githubRepoUrl !== undefined && <GithubStarCount repoUrl={githubRepoUrl} size="large" />}
                <DarkModeSwitch />
            </div>
        </List>
    );
};
