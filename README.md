# CS:GOrner

## Development

Project consists of React frontend and AWS Amplify Api -backend (graphql).
Only two branches, dev and master, are in use for now (Amplify creates backends per branch).

### Workflow
1. Checkout dev branch `git checkout dev`. (Amplify adjusts API environment based on this.)
2. Run locally `npm start` and view on localhost:3000
3. For backend changes (schema.graphql) you can test locally without publishing with `amplify mock api`.
Command also gives url to access GraphiQL explorer on local port. For viewing api and app in AWS console
you can use `amplify console`.
4. To publish changes to backend, run `amplify push`. This publishes for branch you are working on
(should always be dev).
5. Run and fix tests `npm test`
6. When satisfied, merge dev to prod: `git checkout master && git merge --no-ff development`.
7. To deploy to prod, run `amplify publish`.


### Project structure:
- amplify/: AWS Amplify stuff
  - You should only ever touch `/backend/api/csgorner/schema.graphql`, everything else is automated!
- node_modules/: Installed libraries (duh)
- public/: index.html and assets (most assets should be in S3 bucket)
- src/: Source code
  - components/: All React components
  - context/: App "state"
  - graphql/: Backend API stuff. Don't touch auto generated files.
  - util/: Helper classes

### npm scripts
#### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

#### `npm test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

#### `npm run build`

Not needed to run manually. Use `amplify publish` to deploy (after checking out master branch). 

#### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If possible, avoid this!

## Authentication/Security
To update auth settings run `amplify update auth`  
This will lead you through update process..

There is multi-auth setup in this project.
API_KEY is used as default and COGNITO_USER_POOLS for authenticated users.

### GraphQL API

#### Updating API access policies
Access policies can be updated in `graphql.schema`.  
Basic syntax to allow/restrict access is:
```
    @auth(
        rules: [
            { allow: public, provider: apiKey, operations: [read]},
            { allow: groups, provider: userPools, groups: ["Editors"]}
        ]
    )
```
##### Public access
Default AppSync auth method is API_KEY, this is used for public access on resources. API key is bundled with frontend
automatically.  

(There should be line `"aws_appsync_authenticationType": "API_KEY"` in `aws-exports.js`.)
 
Public access include only READ access on: Maps, Posts, Comments etc.  

##### Editor access
Editor access is given for authenticated users in "Editors" group.

These include READ/WRITE/UPDATE/DELETE on Posts. Editors can log in at `/admin` endpoint with their own AWS user.


