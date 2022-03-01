const express = require("express");
const app = express();
require("dotenv").config();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const finalErrorHandler = require("./middleware/finalErrorHandler");

/*----URLs models--------*/
const {
  urlAuthAPI,
  urlTareasAPI,
  urlUserProfileAPI,
  urlRefreshMyToken,
  currentUrl,
} = require("./models/currentUrl");
/*-----------------CORS and general---------------*/
app.use(
  cors({
    origin: [currentUrl],
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

const port = process.env.PORT || 5000;
/*--------------------------------*/
const connectDB = require("./db/connect");

async function startDBandServer() {
  await connectDB(process.env.MONGODB_URI, connectServer);
}
startDBandServer();

function connectServer() {
  app.listen(port, () => {
    console.log(`Server conectado en http://localhost:${port}`);
  });
}
/*--------------------------ROUTES---------------*/

/*UNPROTECTED------------------------*/
const authAPI = require("./routes/usersAuthAPI");
app.use(urlAuthAPI, authAPI);
const refreshAPI = require("./routes/refreshMyToken");
app.use(urlRefreshMyToken, refreshAPI);

/*--PROTECTED-----------------*/
/* const { verifyToken } = require("./middleware/authJWT");
app.use(verifyToken); */

const tareasAPI = require("./routes/tareasAPI");
app.use(urlTareasAPI, tareasAPI);
const userProfileAPI = require("./routes/userProfile");
app.use(urlUserProfileAPI, userProfileAPI);
/*----------------------------------*/
app.use(finalErrorHandler);
