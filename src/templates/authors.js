import React from 'react';
import PropTypes from 'prop-types';

// Components
import Link from 'gatsby-link';

const Authors = ({ pathContext, data }) => {
  console.log(data.allMarkdownRemark);

  const { author } = pathContext;
  const { edges, totalCount } = data.allMarkdownRemark;
  const tagHeader = `${totalCount} post${
    totalCount === 1 ? '' : 's'
  } written by "${author}"`;

  return (
    <div>
      <h1>{tagHeader}</h1>
      <ul>
        {edges.map(({ node }) => {
          const { title } = node.frontmatter;
          const { slug } = node.fields;
          return (
            <li key={slug}>
              <Link to={slug}>{title}</Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

Authors.propTypes = {
  pathContext: PropTypes.shape({
    author: PropTypes.string.isRequired
  }),
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      totalCount: PropTypes.number.isRequired,
      edges: PropTypes.arrayOf(
        PropTypes.shape({
          node: PropTypes.shape({
            frontmatter: PropTypes.shape({
              title: PropTypes.string.isRequired
            })
          })
        }).isRequired
      )
    })
  })
};

export default Authors;

export const pageQuery = graphql`
  query AuthorPage($author: String) {
    allMarkdownRemark(
      limit: 2000
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { fields: { authors: { eq: $author } } }
    ) {
      totalCount
      edges {
        node {
          fields {
            slug
          }
          frontmatter {
            title
            author {
              id
              frontmatter {
                name
              }
            }
          }
        }
      }
    }
  }
`;
