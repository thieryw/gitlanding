import { create } from "@storybook/theming";
import glLogo from "./static/logo.png";

export const darkTheme = create({
  "base": "dark",
  "appBg": "#2c323f",
  "appContentBg": "#2c323f",
  "barBg": "#2c323f",
  "colorSecondary": "#ff562c",
  "textColor": "#f1f0eb",
	"brandImage": glLogo,
	"brandUrl": "https://gitlanding.dev"
})

export const lightTheme = create({
  "base": "light",
  "appBg": "#f1f0eb",
  "appContentBg": "#f1f0eb",
  "barBg": "#f1f0eb",
  "colorSecondary": "#ff562c",
  "textColor": "#2c323f",
  "textInverseColor": "#f1f0eb",
	"brandImage": glLogo,
	"brandUrl": "https://gitlanding.dev"
})