const mongoose = require("mongoose");
const { Schema } = mongoose;

const foodSchema = new Schema({
  name: { type: String, required: [true, "食物名字必填"], minlength: 1 },
  per: { type: String, default: "1個" },
  category: {
    type: String,
    enum: ["五穀根莖", "蛋白質", "脂肪", "蔬菜", "其他"],
  },
  composition: {
    cal: { type: Number, required: [true, "熱量必填"] },
    water: Number,
    protein: { type: Number, required: [true, "蛋白質必填"] },
    fat: Number,
    carb: Number,
  },
});

const Food = mongoose.model("Food", foodSchema);
module.exports = Food;
