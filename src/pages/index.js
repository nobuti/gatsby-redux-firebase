import React, { Component } from 'react';
import Link from 'gatsby-link';
import get from 'lodash/get';
import Helmet from 'react-helmet';

import withAuthorization from '../components/Auth/withAuthorization';

class BlogIndex extends Component {
  render() {
    const siteTitle = get(this, 'props.data.site.siteMetadata.title');
    const posts = get(this, 'props.data.allMarkdownRemark.edges');

    return (
      <div>
        <Helmet title={siteTitle} />

        {posts.map(({ node }) => {
          const title = get(node, 'frontmatter.title') || node.fields.slug;
          return (
            <div key={node.fields.slug}>
              <h3>
                <Link to={node.fields.slug}>{title}</Link>
              </h3>
              <small>{node.frontmatter.date}</small>
              <div>
                {node.frontmatter.author &&
                  [<span key="by">By</span>].concat(
                    node.frontmatter.author.map(author => {
                      return (
                        <a
                          key={author.frontmatter.name}
                          href={`/authors/${node.fields.authors}`}
                        >
                          {author.frontmatter.name}
                        </a>
                      );
                    })
                  )}
              </div>
              <div>
                {node.frontmatter.tags &&
                  node.frontmatter.tags.map(tag => (
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
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      edges {
        node {
          excerpt
          fields {
            slug
            authors
          }
          frontmatter {
            date(formatString: "DD MMMM, YYYY")
            title
            author {
              frontmatter {
                name
                url
              }
            }
            tags
          }
        }
      }
    }
  }
`;
