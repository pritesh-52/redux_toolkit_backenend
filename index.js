const expres = require("express");
const cors = require("cors");
const morgan=require("morgan");

const app = expres();
app.use(morgan('dev'));
app.use(expres.json());
app.use(cors());
app.use("/student", require("./src/router/router"));
require("dotenv").config();
const PORT = process.env.PORT;
app.get("/", (req, res) => {
  res.send("HELLO ");
});

app.listen(PORT, () => {
  console.log("Start Server");
});
