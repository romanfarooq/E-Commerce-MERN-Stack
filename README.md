# E-Commerce-MERN-Stack (uncomplete)

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Description

I will later complete it. I am busy with university these days.

## clone or download
```terminal
$ git clone https://github.com/romanfarooq/E-Commerce-MERN-Stack.git
$ npm install
```

## project structure
```terminal
.gitignore
server/
   package.json
   .env (create .env file, check [Configuration and Setup session])
client/
   package.json
   .env (create .env file, check [Configuration and Setup session])
...
```

## Installation

### Client
```terminal
$ cd client          // go to client folder
$ npm install        // npm install packages
$ npm run start      // run it locally

// deployment for client app
$ npm run build      // this will compile the react code using webpack and generate a folder called docs in the root level
```

### Server
```terminal
$ cd server         // go to server folder
$ npm install       // npm install packages
$ npm run dev       // run it locally
```

## Configuration and Setup
- Open the project in your prefered code editor.
- Go to terminal -> New terminal (If you are using VS code)
- Split your terminal into two (run the client on one terminal and the server on the other terminal)

In the first terminal
- cd client and create a .env file in the root of your client directory.
- Supply the following credentials

```
REACT_APP_SERVER_URL = http://localhost:5000
```

In the second terminal
- cd server and create a .env file in the root of your server directory.
- Supply the following credentials

```
PORT = 5000
MONGO_URL =
JWT_SECRET_KEY =
JWT_EXPIRE_TIME =
COOKIE_EXPIRE_TIME =
SMPT_SERVICE =
SMPT_MAIL =
SMPT_PASSWORD =
CLOUD_NAME =
CLOUDINARY_API_KEY =
CLOUDINARY_API_SECRET =
```

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.


## Acknowledgements
- [React](https://reactjs.org/)
- [Redux](https://redux.js.org/)
- [Redux Toolkit](https://redux-toolkit.js.org/)
- [React Router](https://reactrouter.com/)
- [axios](https://axios-http.com/)
- [React Icons](https://react-icons.github.io/react-icons/)
- [Material UI](https://material-ui.com/)
- [Node.js](https://nodejs.org/en/)
- [EXPRESS](https://expressjs.com/)
- [Mongoose](https://mongoosejs.com/)
- [MongoDB](https://www.mongodb.com/)
- [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken)
- [bcryptjs](https://www.npmjs.com/package/bcryptjs)
- [nodemailer](https://nodemailer.com/about/)
- [dotenv](https://www.npmjs.com/package/dotenv)
- [nodemon](https://www.npmjs.com/package/nodemon)
- [cloudinary](https://cloudinary.com/)
