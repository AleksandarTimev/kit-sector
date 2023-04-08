--- Project description ---

# Technologies used

The kit sector web app is a component-based web app build with the React.js framework, Bootstrap, HTML5 and CSS3. The react hooks are heavily used throughout the app, most commonly for validation of user authentication state, as I did not do it with context API(left for future development). The project uses firebase as a backend solution. The app utilizes the firestore db, authentication and storage services of firebase. The project has also been deployed to firebase (https://sellyourfootballshirt.web.app/). Google fonts have been implemented as well as the open-source Openstreet map API for the contacts page. I have used the built-in browser alert and prompts for displaying errors instead of creating a separate UI elements and utilizing the react.js state management or contexts(left for future development). Routing is implemented thanks to the react-router-dom JS library.

# Public section

The app has a public and a private section. The public section is accessible for all users regardless of their state of authentication. An unathenticated user can browse through the catalog and check detais for all products in the catalog. They can also check the home page, the contacts page, as well as the register and login pages. If the user tries to access a page they are not authorized for they would be redirected to the app's 404 page.

# Private section

The private section and functionality is only accessible after a user has logged-in or registered to the website via the authentication pages. After registration/log-in the user is redirected to the home page. A logged-in user has access to several more views such as a user profile page, where all uploaded kits by the user appear. A cart view where the user is able to see all kits they have added to their cart. Apart from the details, a logged in user can like and add other users' kits to their cart for purchasing. If the user is the owner of the given kit they have the ability to delete or edit the record. I have used both server(firebase rules) and client-side data validation in order to make sure that non-authorized users can edit records that do not belong to them. 

--------------------------------------------------------------------------
# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
