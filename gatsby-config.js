require('dotenv').config();

const siteUrl = `https://www.cristobal-aguirre.com`;

const mdxFeed = require('gatsby-mdx/feed')

module.exports = {
  siteMetadata: {
    title: `Cristobal Aguirre`,
    name: `Cristobal Aguirre`,
    siteUrl: siteUrl,
    description: `Personal site by Cristobal Aguirre.`,
    hero: {
      heading: `The best time to plant a tree was 20 years ago—the second best time is now`,
      maxWidth: 652
    },
    social: [
      {
        name: `twitter`,
        url: `https://twitter.com/jcaguirre89`
      },
      {
        name: `github`,
        url: `https://github.com/jcaguirre89`
      }
    ]
  },
  plugins: [
    {
      resolve: "@narative/gatsby-theme-novela",
      options: {
        contentPosts: "content/posts",
        contentAuthors: "content/authors",
        authorsPage: false,
        basePath: "/",
        sources: {
          contentful: false,
          local: true
        }
      }
    },
    {
      resolve: `gatsby-plugin-mdx`,
      options: {
        extensions: [`.mdx`, `.md`],
        gatsbyRemarkPlugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 10000,
              linkImagesToOriginal: false,
              quality: 80,
              withWebp: true
            }
          },
          { resolve: `gatsby-remark-copy-linked-files` },
          { resolve: `gatsby-remark-numbered-footnotes` },
          { resolve: `gatsby-remark-smartypants` },
          { resolve: `gatsby-remark-responsive-iframe` },
          {
            resolve: "gatsby-remark-external-links",
            options: {
              target: "_blank",
              rel: "noreferrer"
            }
          },
          {
            resolve: `gatsby-remark-katex`,
            options: {
              // Add any KaTeX options from https://github.com/KaTeX/KaTeX/blob/master/docs/options.md here
              strict: `ignore`
            }
          }
        ],
        remarkPlugins: [require(`remark-slug`)]
      }
    },
    {
      resolve: "gatsby-source-contentful",
      options: {
        spaceId: process.env.CONTENTFUL_SPACE_ID,
        accessToken: process.env.CONTENTFUL_ACCESS_TOKEN
      }
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
        icon: `src/assets/favicon.png`
      }
    },
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: `UA-140859234-1`
      }
    },
    {
      resolve: `gatsby-plugin-feed`,
      options: mdxFeed,
    },
    {
      resolve: "gatsby-plugin-robots-txt",
      options: {
        host: siteUrl,
        sitemap: `${siteUrl}/sitemap.xml`,
        policy: [{ userAgent: "*", allow: "/", disallow: "/forbidden" }],
        query: `{
          site {
            siteMetadata {
              siteUrl
            }
          }
        }`
      }
    },
    {
      resolve: `gatsby-plugin-disqus`,
      options: {
        shortname: `cristobal-aguirre`
      }
    }
  ]
};
