const express = require("express");
const bodyParser = require("body-parser");
const routerApi = require("./routes/index.js");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const path = require("path");
const helmet = require("helmet");
const { xss } = require("express-xss-sanitizer");
const config = require("./config/config.js");

const app = express();
const port = config.env.PORT;

const allowedOrigin = config.env.CORS;

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) return callback(null, true);
      if (allowedOrigin.indexOf(origin) == -1) {
        var msg =
          "The Cors policy for this site does not" +
          "allow access from the specifiend Origin.";
        return callback(msg, false);
      }
      return callback(null, true);
    },
  })
);

// middleware
app.use(helmet());
app.disable("x-powered-by");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use(bodyParser.json({ extended: true, limit: "5mb" }));
app.use(bodyParser.urlencoded({ extended: true, limit: "5mb" }));
app.use(xss());

app.use("/api", routerApi);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
