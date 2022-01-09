# EasyCall

Deployed website can be accessed [here](https://easycall.vercel.app/).

## Features

- EasyCall provides social login through Google and Github.
- One can create and join meetings
- The project is easily scalable to 10 participants but for now the participant limit has been capped at 2 to prevent misuse and keep api costs in limit.
- Within the meeting, there are several functionalities provided like screen sharing, chat window for participants, whiteboard, record and save meeting ( under development ).
- The whiteboard is powered by excalidraw, which provides a lot of functionalities for collaboration.

**Note: Before running the app, make sure to replace the environment variables in the respective repositories according to example.env provided in client and server**

For creating and adding GOOGLE_CONFIG_BASE64 in server, checkout this [link](https://newbedev.com/deploying-firebase-app-with-service-account-to-heroku-environment-variables-with-dotenv)

## Local Setup

In the project directory, you can run:

### `npm run dev:install`

This command will install all the npm packages necessary in root, client and server respectively.

### `npm run lint`

Runs the linting commands in client and server directories respectively.

### `npm run dev`

Runs the server app and client app in development mode for running locally. Client will run on port 3000 and server will run on 5000 by default.


**Note: The project is still under development, if you find any breaking UI, please open an issue**