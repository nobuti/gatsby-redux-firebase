const _ = require('lodash');
const Promise = require('bluebird');
const path = require('path');
const slash = require(`slash`);
// const { createFilePath } = require('gatsby-source-filesystem');

exports.createPages = ({ graphql, boundActionCreators }) => {
  const { createPage, createNodeField } = boundActionCreators;

  return new Promise((resolve, reject) => {
    const postTemplate = path.resolve('./src/templates/post.js');
    const tagTemplate = path.resolve('src/templates/tags.js');
    const authorTemplate = path.resolve('src/templates/authors.js');

    resolve(
      graphql(
        `
          {
            allWordpressPost {
              edges {
                node {
                  id
                  slug
                  status
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
        `
      ).then(result => {
        if (result.errors) {
          console.log(result.errors);
          reject(result.errors);
        }

        const posts = result.data.allWordpressPost.edges;
        _.each(posts, edge => {
          createPage({
            path: `/${edge.node.slug}/`,
            component: slash(postTemplate),
            context: {
              id: edge.node.id
            }
          });
        });

        // Author pages:
        let authors = [];
        // Iterate through each post, putting all found author into `authors`
        _.each(posts, edge => {
          const postAuthor = edge.node.author.name;
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
          if (edge.node.tags) {
            tags = tags.concat(edge.node.tags.map(tag => tag.slug));
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

        resolve();
      })
    );
  });
};

// exports.onCreateNode = ({ node, boundActionCreators, getNode }) => {
//   const { createNodeField } = boundActionCreators;

//   if (node.internal.type === `wordpress__POST`) {
//     createNodeField({
//       name: `tags`,
//       node,
//       value: node.tags___NODE
//     });
//   }
// };
