![EasyCall](https://socialify.git.ci/apoorvdwi/EasyCall/image?description=1&descriptionEditable=Meet%2C%20chat%2C%20call%20and%20collaborate%20in%20just%20one%20place.&language=1&name=1&owner=1&theme=Light)

<p align="center">
<img src="https://img.shields.io/github/license/apoorvdwi/EasyCall" />
<img src="https://img.shields.io/badge/Author-apoorvdwi-yellow" />
<img src="https://img.shields.io/badge/code%20style-airbnb-blue" />
</p>

## 💥 Introduction

EasyCall is a web app for meetings, chats and collaborate at one place. It is built using React for frontend, Express , Sockets server and Twilio for handling APIs and communication, and Firestore for database.

The meetings have an inbuilt support for a full fledged excalidraw whiteboard for collaboration.

## 💡 Why did I build this?

In the ongoing pandemic, the need for software that allows communication and collaboration in form of screen sharing or live whiteboard has become a necessity. Since the problem was quite widespread and technologically interesting so I decided to make this project.

## 🛠️ Local development

That's pretty easy. To ensure that you are able to install everything properly, we would recommend you to have <b>Git</b>, <b>NPM</b> and <b>Node.js</b> installed.

We will first start with setting up the Local Project Environment:

```sh
git clone https://github.com/apoorvdwi/EasyCall.git
cd EasyCall
npm run dev:install
```
Now we will add the environment variables in the client/ and server/

 - Create a .env file in both client and server folder according to .example.env given in both the folders respectively.

 - For creating and adding GOOGLE_CONFIG_BASE64 in server, checkout this [link](https://newbedev.com/deploying-firebase-app-with-service-account-to-heroku-environment-variables-with-dotenv)

Once you run the Commands and get environment variables and everything fine, we are all set to run the app ✔️

On the root level run the following command:

```sh
npm run dev
```

To lint the code files, run the following command on root level:

```sh
npm run lint
```

## 🥁 Features

- EasyCall provides social login through Google and Github.
- User can create and join meetings.
- The project is easily scalable to 10 participants but for now the participant limit has been capped at 2 to prevent misuse and keep api costs in limit.
- Within the meeting, there are several functionalities provided like screen sharing, chat window for participants and whiteboard.
- The whiteboard is powered by excalidraw, which provides a lot of functionalities for collaboration.

## 📜 LICENSE

[AGPL 3.0 License](https://github.com/apoorvdwi/EasyCall/blob/main/LICENSE)