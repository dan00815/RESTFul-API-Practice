const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const methodOverride = require("method-override");
const dotenv = require("dotenv");
dotenv.config();
const foodRoutes = require("./Routes").food;

mongoose
  .connect(process.env.MONGODB_CONNECT)
  .then(() => {
    console.log("成功連結至mongoDB");
  })
  .catch((e) => {
    console.log(e);
  });

app.use(express.static("public"));
app.set("view engine", "ejs");
app.use(cors());
app.use(methodOverride("_method"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/food", foodRoutes);

app.use((err, req, res, next) => {
  if (err) {
    return res.status(404).render("error", { err });
  }
});

app.listen(3000, () => {
  console.log("伺服器聆聽Port3000中");
});
