import React, { Component } from 'react';
import Helmet from 'react-helmet';
import Link from 'gatsby-link';
import get from 'lodash/get';
import withAuthorization from '../components/Auth/withAuthorization';

class BlogPostTemplate extends Component {
  render() {
    const post = this.props.data.wordpressPost;
    const siteTitle = get(this.props, 'data.site.siteMetadata.title');

    const tags = tags => {
      if (tags.length > 0) {
        return tags.map(tag => {
          return (
            <li key={tag.slug}>
              <a href={`/tags/${tag.slug}`}>{tag.name}</a>
            </li>
          );
        });
      }

      return null;
    };

    return (
      <div>
        <Helmet title={`${post.title} | ${siteTitle}`} />
        <h1 dangerouslySetInnerHTML={{ __html: post.title }} />
        <p>{post.date}</p>

        {post.tags && post.tags.length > 0 && <ul>{tags(post.tags)}</ul>}
        <div>
          by <a href={`/authors/${post.author.slug}`}>{post.author.name}</a>
        </div>

        <div dangerouslySetInnerHTML={{ __html: post.content }} />
      </div>
    );
  }
}

export default withAuthorization(BlogPostTemplate);

export const pageQuery = graphql`
  query currentPostQuery($id: String!) {
    wordpressPost(id: { eq: $id }) {
      title
      date(formatString: "DD MMMM, YYYY")
      content
      tags {
        name
        slug
      }
      author {
        slug
        name
      }
    }
    site {
      siteMetadata {
        title
      }
    }
  }
`;
