const express = require("express");
const port = 8000;
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

const app = express();

const expressLayouts = require("express-ejs-layouts");

const db = require("./config/mongoose");

const session = require("express-session");
const passport = require("passport");
const passportLocal = require("./config/passport-local-strategy");

const MongoStore = require("connect-mongo");

app.use(bodyParser.urlencoded({ extended: false }));

app.use(cookieParser());

app.use(express.static("./assets"));

app.use(expressLayouts);
app.set("layout extractStyles", true);
app.set("layout extractScripts", true);

app.set("view engine", "ejs");
app.set("views", "./views");

app.use(
  session({
    name: "ToDoList",
    // TODO change the secret before deployment in production mode
    secret: "blahsomething",
    saveUninitialized: false, //when user is not logged in the identity is not establish
    resave: false,
    cookie: {
      maxAge: 1000 * 60 * 100,
    },
    store: MongoStore.create(
      {
        mongoUrl:
          "mongodb+srv://rohittyagi022:ULnNlrAWZ1m6nVRd@cluster0.sjphfez.mongodb.net/?retryWrites=true&w=majority",
        autoRemove: "disabled",
      },
      function (err) {
        console.log(err || "connect-mongo setup ok");
      }
    ),
  })
);

app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser);

app.use("/", require("./routes/index"));

app.listen(port, function (err) {
  if (err) {
    console.log(`Error in running the server :: ${err}`);
  }
  console.log(`Server is running on port : ${port}`);
});
