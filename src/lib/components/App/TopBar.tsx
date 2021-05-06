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

export type Props = {
    logo?: {
        LogoSvg: React.FunctionComponent<
            React.SVGProps<SVGSVGElement> & {
                title?: string | undefined;
            }
        >;

        logoFill?: {
            dark: string;
            light: string;
        };
    };

    menu: {
        items: {
            name: string;
            url: string;
        }[];

        smallDeviceBreakPointPx: number;
    };

    githubRepoUrl?: string;
};

const { useClassNames } = createUseClassNames<{
    mobileMenuHeight: number;
    logoFill?: {
        dark: string;
        light: string;
    };

    smallDeviceBreakPointPx: number;
}>()((theme, { mobileMenuHeight, logoFill, smallDeviceBreakPointPx }) => ({
    "root": {
        "display": "flex",
        "justifyContent": "flex-end",
        "flexWrap": "wrap",
        "alignItems": "center",
        "padding": 20,
        "width": 1200,
        "@media (max-width: 1250px)": {
            "width": "100%",
        },
    },
    "logo": {
        "width": 50,
        "height": 50,
        "marginRight": "auto",
        "fill": (() => {
            if (logoFill === undefined) {
                return "unset";
            }

            if (theme.palette.type === "dark") {
                return logoFill.dark;
            }
            return logoFill.light;
        })(),
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
        "@media (max-width:530px)": {
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
    const { menu, logo, githubRepoUrl } = props;

    const { mobileMenuHeight, setMobileMenuHeight } = useNamedState("mobileMenuHeight", 0);

    const { rootRef } = useClickAway(() => setMobileMenuHeight(0));

    const toggleMobileMenu = useConstCallback(() => {
        if (mobileMenuHeight !== 0) {
            setMobileMenuHeight(0);
            return;
        }

        const menuItems = document.getElementsByClassName("menu-item");

        let newHeight = 0;

        for (let i = 0; i < menuItems.length; i++) {
            const style = getComputedStyle(menuItems[i]);
            const marginTop = parseInt(style.marginTop.replace("px", ""));
            const marginBottom = parseInt(style.marginBottom.replace("px", ""));
            newHeight += menuItems[i].clientHeight + marginTop + marginBottom;
        }

        setMobileMenuHeight(newHeight);
    });

    const { classNames } = useClassNames({
        mobileMenuHeight,
        "logoFill": logo?.logoFill,
        "smallDeviceBreakPointPx": menu.smallDeviceBreakPointPx,
    });

    return (
        <List className={classNames.root} component="nav">
            {logo !== undefined && <logo.LogoSvg className={classNames.logo} />}
            <div className={classNames.itemWrapper}>
                {menu.items.map(item => (
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

            <div className={classNames.githubAndDarkModeSwitch}>
                {githubRepoUrl !== undefined && <GithubStarCount repoUrl={githubRepoUrl} size="large" />}
                <DarkModeSwitch />
            </div>
        </List>
    );
};
