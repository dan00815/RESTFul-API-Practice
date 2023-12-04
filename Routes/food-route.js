const express = require("express");
const router = express.Router();
const Food = require("../models/food");

//OK
router.get("/", async (req, res, next) => {
  try {
    let findData = await Food.find({}).exec();
    return res.render("Home", { findData });
  } catch (e) {
    next(e);
  }
});

//OK
router.get("/new", (req, res) => {
  try {
    return res.render("creatFood");
  } catch (e) {
    return res.send(e);
  }
});

//OK
router.get("/:_id", async (req, res, next) => {
  try {
    let { _id } = req.params;
    let ProfileData = await Food.findOne({ _id }).exec();
    return res.render("profile", { ProfileData });
  } catch (e) {
    next(e);
  }
});

//OK
router.get("/:_id/modify", async (req, res, next) => {
  try {
    let { _id } = req.params;
    let foundData = await Food.findOne({ _id }).exec();
    // console.log(foundData);
    res.render("modify-profile", { foundData });
  } catch (e) {
    next(e);
  }
});

router.get("/:_id/delete", async (req, res, next) => {
  try {
    let { _id } = req.params;
    let FoundData = await Food.findOne({ _id }).exec();
    res.render("delete-page", { FoundData });
  } catch (e) {
    next(e);
  }
});

//OK
router.post("/", async (req, res) => {
  try {
    let { name, per, category, cal, water, protein, fat, carb } = req.body;
    let newFood = new Food({
      name,
      per,
      category,
      composition: {
        cal,
        water,
        protein,
        fat,
        carb,
      },
    });
    let saveFood = await newFood.save();
    console.log("資料儲存成功");
    return res.render("creatSuccess", { saveFood });
  } catch (e) {
    return res.render("creatFail", { e });
  }
});

router.patch("/:_id", async (req, res) => {
  try {
    let { _id } = req.params;
    let { name, per, category, cal, water, protein, fat, carb } = req.body;
    let modifyData = await Food.findOneAndUpdate(
      { _id },
      { name, per, category, composition: { cal, water, protein, fat, carb } },
      { runValidators: true, new: true }
    ).exec();
    res.render("modifySuccess", { modifyData });
  } catch (e) {
    let { _id } = req.params;
    return res.render("modifyFail", { e, _id });
  }
});

router.delete("/:_id", async (req, res) => {
  try {
    let { _id } = req.params;
    let deleteMsg = await Food.findOneAndDelete({ _id }).exec();
    console.log(deleteMsg);
    return res.render("delete-success");
  } catch (e) {
    return res.send(e);
  }
});

module.exports = router;
