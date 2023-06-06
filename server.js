// Import modules
require("dotenv").config();
const path = require("path");
const express = require("express");
const session = require("express-session");
const exphbs = require("express-handlebars");
const SequelizeStore = require("connect-session-sequelize")(session.Store);
const mime = require("mime");

// Import objects/instances
const routes = require("./controllers");
const sequelize = require("./config/connection");
const helpers = require("./utils/helpers");

// Create express server app
const app = express();
const PORT = process.env.PORT || 3001;

// Create a session object and link it with sequelize
const sess = {
  secret: process.env.SESSION_SECRET,
  cookie: {
    //maxAge: 1800000  // Session expires after 30 minutes
  },
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize,
  }),
};

app.use(session(sess));

// Set handlebars engine settings
const hbs = exphbs.create({ helpers });

app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");

// Express server middleware required
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use("/assets", express.static(path.join(__dirname, "/public/assets")));
app.use(express.static(path.join(__dirname, "public"), {
  setHeaders: (res, filePath) => {
    res.setHeader('Content-Type', mime.getType(filePath));
  },
}));
app.use("/bootsrta", express.static(__dirname+"/node_modules/bootstrap/dist"));

// Express server routes
app.use(routes);

// Sync sequelize models and run server
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => {
    console.log(
      `App listening, launch app in browser: http://localhost:${PORT}`
    );
  });
});