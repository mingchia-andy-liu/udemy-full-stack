# Udemy-Full-Stack

A single page application that offers users to send massive amount of survey to their customers. Surveys options are tracked and displayed to the users.
You can view the a live demo [here](https://ancient-ocean-31474.herokuapp.com). This is a course from [udemy](https://www.udemy.com/node-with-react-fullstack-web-development)

## Tech Stack
#### Frontend
Frontend used the boilerplate project `Create-React-App` as a starting point.

|    Technology    |         Description         |
|:----------------:|:---------------------------:|
|       React      |      Frontend Framework     |
|       Redux      |   Application state Store   |
| React-Router-Dom |           Routing           |
|    Redux-Form    | React/Redux form management |
|    Redux-Thunk   |     Asynchronous Actions    |
|       Axios      |     HTTP request module     |

#### Backend
Backend is created from scratch.
The MongoDB is managed inside [MLab](https://mlab.com/welcome) which offers Database-as-a-Service.

|        Technology       |          Description          |
|:-----------------------:|:-----------------------------:|
|          NodeJS         |                               |
|        ExpressJS        |                               |
|      Mongo/Mongoose     |          Database/ORM         |
|         Passport        |     Authentication module     |
| Passport-Google-OAuth20 |      Passport's Strategy      |
|          Stripe         | Payment authentication module |
|         SendGrid        |     Email service provider    |

## Deployment
The application is deployed to Heroku. View the application [here](https://ancient-ocean-31474.herokuapp.com)

## Lessons
- [x] Full stack development from 0 to production deployment
- [x] Better understanding of React application
- [x] Authentication through Google OAuth2.0
- [x] Design RESTful API endpoints
- [x] Explore the concept of Webhook

## Configurations

#### Productions
Make sure these environment variables are set
* `NODE_ENV`: set to `production`
* `COOKIE_URI`: A random string for the `Cookie-session` module for cookie management
* `GOOGLE_CLIENT_ID` & `GOOGLE_CLIENT_SECRET`: Google OAuth API keys
* `MONGO_URI`: Wherever your MongoDB location is
* `REDIRECT_DOMAIN`: The Webhook's endpoint domain (probably differs in production and local)
* `SEND_GRID_KEY`: SendGrid's API key
* `STRIPE_PUBLISHABLE_KEY` & `STRIPE_SECRET_KEY`: Strip's API keys

#### Development
If you wish to `fork` this project and continue the on the application, feel free to do so.

However, there are a hidden  development configuration file inside `./config/dev.js` The file exports an object with keys of
* `googleClientID` & `googleClientSecret`: Google OAuth API keys
* `mongoURI`: Wherever your MongoDB location is
* `cookieKey`: A random string for the `Cookie-session` module for cookie management
* `stripePublishableKey` & `stripeSecretKey`: Strip's API keys
* `sendGridKey`: SendGrid's API key
* `redirectDomain`: The Webhook's endpoint domain (differs in production and local )
