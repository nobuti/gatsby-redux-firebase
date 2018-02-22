import React from 'react';
import PropTypes from 'prop-types';

// Components
import Link from 'gatsby-link';

const Authors = ({ pathContext, data }) => {
  console.log(data.allWordpressPost);

  const { author } = pathContext;
  const { edges, totalCount } = data.allWordpressPost;
  const tagHeader = `${totalCount} post${
    totalCount === 1 ? '' : 's'
  } written by "${author}"`;

  return (
    <div>
      <h1>{tagHeader}</h1>
      <ul>
        {edges.map(({ node }) => {
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

Authors.propTypes = {
  data: PropTypes.shape({
    allWordpressPost: PropTypes.shape({
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

export default Authors;

export const pageQuery = graphql`
  query AuthorPage($author: String) {
    allWordpressPost(
      sort: { fields: [date], order: DESC }
      filter: { author: { slug: { eq: $author } } }
    ) {
      totalCount
      edges {
        node {
          title
          excerpt
          slug
          date
          tags {
            name
          }
        }
      }
    }
  }
`;
