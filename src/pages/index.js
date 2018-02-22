import React, { Component } from 'react';
import Link from 'gatsby-link';
import get from 'lodash/get';
import Helmet from 'react-helmet';

import withAuthorization from '../components/Auth/withAuthorization';

class BlogIndex extends Component {
  render() {
    const siteTitle = get(this, 'props.data.site.siteMetadata.title');
    const posts = get(this, 'props.data.allWordpressPost.edges');

    return (
      <div>
        <Helmet title={siteTitle} />

        {posts.map(({ node }) => {
          const title = node.title;
          return (
            <div key={node.slug}>
              <h3>
                <Link
                  to={node.slug}
                  dangerouslySetInnerHTML={{ __html: node.title }}
                />
              </h3>
              <small>{node.date}</small>
              <div>
                by{' '}
                <a href={`/authors/${node.author.slug}`}>{node.author.name}</a>
              </div>
              <div>
                {node.tags &&
                  node.tags.map(tag => (
                    <a key={tag} href={`/tags/${tag}`}>
                      {tag}
                    </a>
                  ))}
              </div>
              <p dangerouslySetInnerHTML={{ __html: node.excerpt }} />
            </div>
          );
        })}
      </div>
    );
  }
}

export default withAuthorization(BlogIndex);

export const pageQuery = graphql`
  query IndexQuery {
    site {
      siteMetadata {
        title
      }
    }
    allWordpressPost(sort: { fields: [date] }) {
      edges {
        node {
          title
          excerpt
          slug
          date(formatString: "DD MMMM, YYYY")
          content
          author {
            name
            slug
          }
        }
      }
    }
  }
`;
