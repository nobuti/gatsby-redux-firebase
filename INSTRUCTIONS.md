1. Install this starter (assuming Gatsby is installed) by running from your CLI:

```
gatsby new my-gatsby-blog https://github.com/noahg/gatsby-starter-blog-no-styles
```

Then I cleaned up all the styles. Apply this workaround for the error related to `gatsby-cli/lib/reporter`: https://github.com/gatsbyjs/gatsby/issues/4131#issuecomment-366766479

2. Install firebase as dependency

```
npm install firebase --save
```

3. Init git in the project folder and pushit to Github. We need it to add github authorization in firebase.

4. Create the app in firebase. Choose the github authentication, and copy the callback for oauth. Open another tab and register new app in github: https://github.com/settings/applications/new. For the callback field, fill the url copied from firebase. Then copy the client_id and token to firebase to complete the github setup.

5. Create the config file with the firebase configuration info.

6. Install redux and react-redux:

```
npm install redux react-redux --save
```

7. Config gatsby to use redux: https://github.com/gatsbyjs/gatsby/tree/master/examples/using-redux
   Avoid ssr for now.

8. Initialize firebase when created the router.

9. Create withAuthentication wrapper to handle if a component should be rendered based on authentication.

10. Implement login with github using firebase.
