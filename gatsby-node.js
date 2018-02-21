const _ = require('lodash');
const Promise = require('bluebird');
const path = require('path');
const { createFilePath } = require('gatsby-source-filesystem');

exports.createPages = ({ graphql, boundActionCreators }) => {
  const { createPage, createNodeField } = boundActionCreators;

  return new Promise((resolve, reject) => {
    const blogPost = path.resolve('./src/templates/blog-post.js');
    const tagTemplate = path.resolve('src/templates/tags.js');
    const authorTemplate = path.resolve('src/templates/authors.js');
    resolve(
      graphql(
        `
          {
            allMarkdownRemark(
              sort: { fields: [frontmatter___date], order: DESC }
              limit: 1000
            ) {
              edges {
                node {
                  fields {
                    slug
                    authors
                  }
                  frontmatter {
                    title
                    tags
                    author {
                      id
                    }
                  }
                }
              }
            }
          }
        `
      ).then(result => {
        if (result.errors) {
          console.log(result.errors);
          reject(result.errors);
        }

        // Create blog posts pages.
        const posts = result.data.allMarkdownRemark.edges;

        _.each(posts, (post, index) => {
          const previous =
            index === posts.length - 1 ? false : posts[index + 1].node;
          const next = index === 0 ? false : posts[index - 1].node;

          createPage({
            path: post.node.fields.slug,
            component: blogPost,
            context: {
              slug: post.node.fields.slug,
              previous,
              next
            }
          });
        });

        // Author pages:
        let authors = [];
        // Iterate through each post, putting all found author into `authors`
        _.each(posts, edge => {
          const postAuthor = edge.node.fields.authors;
          if (postAuthor) {
            authors = authors.concat(postAuthor);
          }
        });

        // Eliminate duplicate authors
        authors = _.uniq(authors);

        // Make author pages
        authors.forEach(author => {
          createPage({
            path: `/authors/${_.kebabCase(author)}/`,
            component: authorTemplate,
            context: {
              author
            }
          });
        });

        // Tag pages:
        let tags = [];
        // Iterate through each post, putting all found tags into `tags`
        _.each(posts, edge => {
          if (_.get(edge, 'node.frontmatter.tags')) {
            tags = tags.concat(edge.node.frontmatter.tags);
          }
        });
        // Eliminate duplicate tags
        tags = _.uniq(tags);

        // Make tag pages
        tags.forEach(tag => {
          createPage({
            path: `/tags/${_.kebabCase(tag)}/`,
            component: tagTemplate,
            context: {
              tag
            }
          });
        });
      })
    );
  });
};

exports.onCreateNode = ({ node, boundActionCreators, getNode }) => {
  const { createNodeField } = boundActionCreators;

  if (node.internal.type === `MarkdownRemark`) {
    const value = createFilePath({ node, getNode });
    const author = _.map(node.frontmatter.author, author => author.trim());

    createNodeField({
      name: `authors`,
      node,
      value: author
    });

    createNodeField({
      name: `slug`,
      node,
      value
    });
  }
};
