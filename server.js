const express = require("express");
const cors = require('cors')
const bodyParser = require('body-parser')
const app = express();

const port = process.env.PORT || 5000;

const router = require("./src/routes");

require('./src/utils/MongoConnect');
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use("/api/v1/", router);


app.listen(port, () => {
  console.log(`Server started on port ${port}`)
});