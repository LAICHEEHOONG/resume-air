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



**Register**
client => send email and password to server (Refer: client => users_action.js => registerUser)
server => 1. check email taken or not
          2. if not taken save account
          3. generate token
          4. send back cookie and user information to client
           --or--
          if email takne send back error message
          (Refer: server => user.js => router.route('/register').post)

**Sign in**
client => send email and password to server 
          (Refer: users_action.js => signInUser)
server => 1. find the user
          2. compare password
          3. generate token
          4. send back cookie, and send back user information
          --or--
          if error send back error message
          (Refer: server => users.js => router.route('/signin'))

**Server check token**
server => 1. Request headers
          2. Verify token
          3. User information response to locals
          4. next()
          --or--
          send back error message
          (Refer: server => auth.js => exports.checkToken)
          (Remark: check token in server.js app.use, so always run every single time)

**Client config headers**
client => 1. Load the token from cookies
          2. set the token to headers
          (Refer: client => tools.js => getAuthHeader)
          (Remark: every time request from server, if the information not public, need to run one time)

**Server check logged in**
server => 1. check res.locals user information
          2. res.locals user data = req.user, req.user for other function get the user data
          3. next()
          --or--
          if no user send back error message
          (Refer: server => auth.js => exports.checkLoggedIn)

**Sign out**
client => 1. remove cookie
          2. navigate to '/'
          (Refer: client => tools.js)

**Roles user vs admin**
server => 1. Verify with req.user.role
            --or--
            send error message back

**Client side pages check token**
client => 1. Get token cookie (client)
          2. Get user data from server (server)(Refer: server => users.js '/isauth')
          3. Dispatch user data (client)
          (Refer: client => users_actions.js isAuthUser)
          
