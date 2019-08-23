import React from 'react'
import Article from '@narative/gatsby-theme-novela/src/templates/article.template';
import {Disqus} from 'gatsby-plugin-disqus';
import {useStaticQuery, graphql} from 'gatsby';

import 'katex/dist/katex.min.css';
import '../../../styles/katex-extra.css';

export default props => {
  const data = useStaticQuery(graphql`
    query ArticleQuery {
      site {
        siteMetadata {
          siteUrl
        }
      }
    }
  `);
  const {pageContext, location} = props;
  const {article} = pageContext;
  const disqusConfig = {
    url: data.site.siteMetadata.siteUrl,
    identifier: article.id,
    title: article.title,
  };
  return (
    <React.Fragment>
      <Article {...props} />
      <Disqus config={disqusConfig} />
    </React.Fragment>
  );
};
