require("dotenv").config();
const connect = require("./db/connection");
const express = require("express");
const app = express();
const morgan = require("morgan");
const { response } = require("./utils/responseService");
const routes = require("./routes/index.routes");

app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended:true}))



app.use("/api", routes);



app.get("/", (req, res) => {
  return response(res, 200, "Examination-System Demo");
});
app.all("*", (req, res) => {
  return response(res, 404, "Page not found!");
});

connect
  .then(() => {
    app.listen(process.env.PORT, () =>
      console.log(`[Server] listening on ${process.env.PORT}!`)
    );
  })
  .catch((err) => {
    console.log(`[DB] error >>> ${err}`);
  });
