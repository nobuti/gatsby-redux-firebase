import React from 'react';
import PropTypes from 'prop-types';

// Components
import Link from 'gatsby-link';

const Tags = ({ pathContext, data }) => {
  const { tag } = pathContext;
  const { edges } = data.allWordpressPost;

  // Filtering on the frontend: https://github.com/gatsbyjs/gatsby/issues/3401#issuecomment-366359968
  const posts = edges.filter(({ node }) => {
    return node.tags ? node.tags.map(tag => tag.slug).indexOf(tag) > -1 : false;
  });

  const totalCount = posts.length;
  const tagHeader = `${totalCount} post${
    totalCount === 1 ? '' : 's'
  } tagged with "${tag}"`;

  return (
    <div>
      <h1>{tagHeader}</h1>
      <ul>
        {posts.map(({ node }) => {
          const { title, slug } = node;
          return (
            <li key={slug}>
              <Link
                to={`/${slug}`}
                dangerouslySetInnerHTML={{ __html: node.title }}
              />
            </li>
          );
        })}
      </ul>
    </div>
  );
};

Tags.propTypes = {
  pathContext: PropTypes.shape({
    tag: PropTypes.string.isRequired
  }),
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      totalCount: PropTypes.number.isRequired,
      edges: PropTypes.arrayOf(
        PropTypes.shape({
          node: PropTypes.shape({
            title: PropTypes.string.isRequired
          })
        }).isRequired
      )
    })
  })
};

export default Tags;

export const pageQuery = graphql`
  query TagPage {
    allWordpressPost(sort: { fields: [date], order: DESC }) {
      totalCount
      edges {
        node {
          title
          excerpt
          slug
          date
          tags {
            name
            slug
          }
          author {
            name
            slug
          }
        }
      }
    }
  }
`;
