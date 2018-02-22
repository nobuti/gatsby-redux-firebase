module.exports = {
  siteMetadata: {
    title: 'Product Blog',
    author: 'Kyle Mathews',
    description: 'A starter blog demonstrating what Gatsby can do.',
    siteUrl: 'https://gatsbyjs.github.io/gatsby-starter-blog/'
  },
  plugins: [
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        //trackingId: `ADD YOUR TRACKING ID HERE`,
      }
    },
    `gatsby-plugin-feed`,
    `gatsby-plugin-offline`,
    `gatsby-plugin-react-helmet`,
    {
      resolve: 'gatsby-source-wordpress',
      options: {
        /*
        * The base URL of the Wordpress site without the trailingslash and the protocol. This is required.
        * Example : 'gatsbyjsexamplewordpress.wordpress.com' or 'www.example-site.com'
        */
        baseUrl: 'cartogatsby.wordpress.com',
        protocol: 'http',
        hostingWPCOM: true,
        useACF: false,
        auth: {
          // If hostingWPCOM is true then you will need to communicate with wordpress.com API
          // in order to do that you need to create an app (of type Web) at https://developer.wordpress.com/apps/
          // then add your clientId, clientSecret, username, and password here
          wpcom_app_clientSecret:
            'n4Y5QISYg2CYdE9vPLJzrQvqWpqk2GsTdwBpoBqvml2iUmbyc4LrLtS5hpMQLoUe',
          wpcom_app_clientId: '57258',
          wpcom_user: 'buti@cartodb.com',
          wpcom_pass: 'golondrina'
        },
        verboseOutput: false
      }
    }
  ]
};
