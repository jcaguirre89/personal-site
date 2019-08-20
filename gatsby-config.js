require("dotenv").config();

module.exports = {
  siteMetadata: {
    title: `Cristobal Aguirre`,
    name: `Cristobal Aguirre`,
    siteUrl: `https://www.cristobal-aguirre.com`,
    description: `I learn by explaining things online. Chilean based in Vancouver, BC.`,
    hero: {
      heading: `I learn by explaining things online. Chilean based in Vancouver, BC.`,
      maxWidth: 652,
    },
    social: [
      {
        name: `twitter`,
        url: `https://twitter.com/jcaguirre89`,
      },
      {
        name: `github`,
        url: `https://github.com/jcaguirre89`,
      },
    ],
  },
  plugins: [
    {
      resolve: 'gatsby-source-contentful',
      options: {
        spaceId: process.env.CONTENTFUL_SPACE_ID,
        accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
      },
    },
    {
      resolve: '@narative/gatsby-theme-novela',
      options: {
        contentPosts: 'content/posts',
        contentAuthors: 'content/authors',
        authorsPage: false,
        basePath: '/',
        sources: {
          contentful: false,
          local: true,
        },
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Cristobal Aguirre`,
        short_name: `CristobalAguirre`,
        start_url: `/`,
        background_color: `#fff`,
        theme_color: `#fff`,
        display: `standalone`,
        icon: `src/assets/favicon.png`,
      },
    },
  ],
};
