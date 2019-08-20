import novelaTheme from '@narative/gatsby-theme-novela/src/gatsby-plugin-theme-ui';

const fonts = {
  serif: "'Merriweather', Georgia, Serif",
  sansSerif:
    "'SF Pro Display', '-apple-system', 'BlinkMacSystemFont', 'San Francisco', 'Helvetica Neue', 'Helvetica', 'Ubuntu', 'Roboto', 'Noto', 'Segoe UI', 'Arial', sans-serif",
  monospace: `"Operator Mono", Consolas, Menlo, Monaco, source-code-pro, Courier New, monospace`,
};

export default {
  ...novelaTheme,
  initialColorMode: `light`,
  fonts,
  colors: {
    ...novelaTheme.colors,
    primary: '#000',
    secondary: '#73737D',
    accent: '#6166DC',
    grey: '#73737D',
    background: '#fff',
    articleText: '#000',
    modes: {
      dark: {
        ...novelaTheme.colors.modes.dark,
        primary: '#eeeeef',
        secondary: '#73737D',
        accent: '#6166DC',
        grey: '#73737D',
        background: '#242629',
        articleText: '#000',
      },
    },
  },
};
