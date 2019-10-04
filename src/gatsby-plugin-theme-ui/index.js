import novelaTheme from "@narative/gatsby-theme-novela/src/gatsby-plugin-theme-ui";

const offBlack = "#242629";
const offWhite = "#eeeeef";

const fonts = {
  serif: "'Source Serif Pro:700', 'Merriweather:900', Georgia, Serif",
  sansSerif:
    "'HK Grotesk', 'SF Pro Display', '-apple-system', 'BlinkMacSystemFont', 'San Francisco', 'Helvetica Neue', 'Helvetica', 'Ubuntu', 'Roboto', 'Noto', 'Segoe UI', 'Arial', sans-serif",
  monospace: `"Operator Mono", Consolas, Menlo, Monaco, source-code-pro, Courier New, monospace`
};

export default {
  ...novelaTheme,
  initialColorMode: `light`,
  fonts,
  colors: {
    ...novelaTheme.colors,
    primary: offBlack,
    secondary: offBlack,
    grey: "#73737D",
    background: "#fff",
    accent: "#6166DC",
    articleText: offBlack,
    modes: {
      dark: {
        grey: "#73737D",
        primary: offWhite,
        secondary: offWhite,
        accent: "hsla(9, 80%, 70%, 1)",
        background: offBlack,
        gradient: `linear-gradient(180deg, ${offBlack} 0%, rgba(66, 81, 98, 0.36) 100%)`,
        articleText: offWhite
      }
    }
  }
};
