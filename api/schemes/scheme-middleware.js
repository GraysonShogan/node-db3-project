const db = require("../data/db-config");

/*
  If `scheme_id` does not exist in the database:

  status 404
  {
    "message": "scheme with scheme_id <actual id> not found"
  }
*/
const checkSchemeId = async (req, res, next) => {
  const { scheme_id } = req.params;

  try {
    const scheme = await db("schemes").where({ id: scheme_id }).first();

    if (!scheme) {
      return res.status(404).json({
        message: `scheme with scheme_id ${scheme_id} not found`,
      });
    }

    next();
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error checking scheme_id in the database." });
  }
};

/*
  If `scheme_name` is missing, empty string or not a string:

  status 400
  {
    "message": "invalid scheme_name"
  }
*/
const validateScheme = (req, res, next) => {
  const { scheme_name } = req.body;

  if (!scheme_name || typeof scheme_name !== "string") {
    return res.status(400).json({
      message: "invalid scheme_name",
    });
  }

  next();
};

/*
  If `instructions` is missing, empty string or not a string, or
  if `step_number` is not a number or is smaller than one:

  status 400
  {
    "message": "invalid step"
  }
*/
const validateStep = (req, res, next) => {
  const { instructions, step_number } = req.body;

  if (
    !instructions ||
    typeof instructions !== "string" ||
    !step_number ||
    isNaN(step_number) ||
    step_number < 1
  ) {
    return res.status(400).json({
      message: "invalid step",
    });
  }

  next();
};

module.exports = {
  checkSchemeId,
  validateScheme,
  validateStep,
};
