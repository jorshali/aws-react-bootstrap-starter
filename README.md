# aws-react-bootstrap-starter

A React Bootstrap starter project that provides seemless integration with AWS.  When used with [aws-sam-rest-api-starter](https://github.com/jorshali/aws-sam-rest-api-starter) you can have an AWS-backed React Bootstrap project up in less than 20 minutes.

This project includes built-in support for:

- Login
- Error-handling
- Environment configuration
- Navigation
- Page template
- Loading indicator
- AWS REST API usage

The project seemlessly brings together the following libraries:

- [React](https://reactjs.org)
- [React Bootstrap](https://react-bootstrap.github.io)
- [MobX](https://mobx.js.org/README.html)
- [React Scripts](https://www.npmjs.com/package/react-scripts)
- [AWS](https://aws.amazon.com)

## Installation

1.  Simply clone the project and remove the `.git` directory to get started:

```
$ git clone git@github.com:jorshali/react-bootstrap-starter.git
$ cd react-bootstrap-starter
$ rm -rf .git
```

2.  Now you can configure the project to point to your AWS backend.  If you used the [aws-sam-rest-api-starter](https://github.com/jorshali/aws-sam-rest-api-starter) project, simply plug in the values it provided when the deployment completed in `src/config/config.json`.  If you already have your own Cognito and REST API setup, you can configure those values as well:

```
{
  "localhost": {
    "awsUserPoolId": "<local-cognito-user-pool-id>",
    "awsClientId": "<local-cognito-client-id>",
    "awsBaseServiceUrl": "http://localhost:3000/post-service"
  },
  "www.my-host.com": {
    "awsUserPoolId": "<prod-cognito-user-pool-id>",
    "awsClientId": "<prod-cognito-client-id>",
    "awsBaseServiceUrl": "<prod-base-service-url>"
  }
}
```

Locally, you'll use the `localhost` configuration.  For production, you can replace `www.my-host.com` with your production hostname and configuration.

3.  Now when you run the project, you'll be presented with a login page tied to your Cognito configuration:

```
npm start
```

## Customize the Project

You can customize the project to your needs.  The important parts of the project structure can be found in the `src` directory:

```
src/
 - components/
   - common/
   - login/
 - config/
 - hooks/
 - models/
 - stores/
 - utility/
 App.tsx
```

Here are some details:
- components:  the components directory contains all React components.  This is where you'll add your own components or customize the provided components.
- config: the configuration for your project by environment.  You can add your own configuration here and access that configuration using the static `EnvConfig` class.
- hooks:  all React hooks will be added here.  The provided hooks will be useful within your project.  Some useful hook are the `useStores` hook which provides access to all MobX stores and the `useAxios` hook which provides access to an [Axios](https://www.npmjs.com/package/axios) instance that can invoke your REST APIs using the built-in authentication.
- models:  all of your models belong here.  These are the classes that hold the data and related behavior for your application.  They may use [MobX](https://mobx.js.org/README.html) observables if they need to reflect UI state.
- stores:  these are [MobX stores](https://mobx.js.org/README.html) that hold the state for your application.  You can read more about stores in the MobX documentation.
- utility:  any generic utilities for application use.
- App.tsx:  the entry point for your application.  All route definitions are found here as well as the basic template for your application.
