# Sample Application for "Build a NodeJS App with TypeScript"

This is the source code for the post [Build a NodeJS App with TypeScript](https://developer.okta.com/blog/2019/09/19/nodejs-typescript). This application uses NestJS to create an API, and [Okta](https://developer.okta.com/) to secure the API.

## Application set up and configuration

* Download and install [Node.js](https://nodejs.org)
* Clone or download this repository
* In a terminal/command window, run the following from within the project folder

```sh
npm install
```

* Create a file named `.env` for application settings
* [Sign up](https://developer.okta.com/signup/) for a free Okta developer account
* Create a new **Service** application from the Okta developer dashboard
* Copy the **Client ID**, **Client Secret**, and **App Token** to the `.env` file
* Click on **Dashboard**, find your **Org URL** at the top of the dashboard page, and copy this to the `.env` file

```dotenv
OKTA_CLIENT_ID={yourClientId}
OKTA_CLIENT_SECRET={yourClientSecret}
OKTA_APP_TOKEN={yourAppToken}
OKTA_DOMAIN={yourOrgUrl}
```

## Run the application

```sh
npm start
```
