const { Classes } = require("../../models");
const { body }  = require("express-validator");
const moment = require("moment");

const service = async (req, res) => {
  try {
    const payload = req.body;
    // Check if class name already exists
    const requestDB = await Classes.create(payload);
    return res.json({
      msg: "Class created successfully",
      data: requestDB,
    });
  } catch (error) {
    return res.status(500).json({
      msg: error.toString(),
    });
  }
};
const validation = [
  body("name")
  .notEmpty()
  .withMessage("Name is required")
  .custom(async (value) => {
    // Check if class name already exists
    const requestDB = await Classes.findOne({ where: { name: value } });
    if (requestDB) {
      throw new Error("Class name already exists");
    }
  }),

  body("description").notEmpty().withMessage("Description is required"),
  body("dateFrom")
  .notEmpty()
  .withMessage("Date from is required")
  .custom((value) => {
    // Check if dateFrom is valid
    value = moment(value);
    if (value.isAfter(moment())) {
      return true;
    } else {
      throw new Error("Date from is should be after today");
    }
  }),
  body("dateTo").notEmpty().withMessage("Date to is required"),
];

module.exports = { service, validation };