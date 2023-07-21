const db = require("../data/db-config");

function find() {
  return db("schemes as sc")
    .leftJoin("steps as st", "sc.scheme_id", "st.scheme_id")
    .select("sc.*")
    .count("st.step_id as number_of_steps")
    .groupBy("sc.scheme_id")
    .orderBy("sc.scheme_id", "asc");
}

function findById(scheme_id) {
  return db("schemes as sc")
    .leftJoin("steps as st", "sc.scheme_id", "st.scheme_id")
    .select("sc.scheme_name", "st.*")
    .where("sc.scheme_id", scheme_id)
    .orderBy("st.step_number", "asc")
    .then((steps) => {
      if (steps.length === 0) {
        return null;
      }

      const scheme = {
        scheme_id: steps[0].scheme_id,
        scheme_name: steps[0].scheme_name,
        steps: steps.map((step) => ({
          step_id: step.step_id,
          step_number: step.step_number,
          instructions: step.instructions,
        })),
      };

      return scheme;
    });
}

function findSteps(scheme_id) {
  return db("steps as st")
    .leftJoin("schemes as sc", "st.scheme_id", "sc.scheme_id")
    .select("st.step_id", "st.step_number", "st.instructions", "sc.scheme_name")
    .where("sc.scheme_id", scheme_id)
    .orderBy("st.step_number", "asc");
}

function add(scheme) {
  return db("schemes")
    .insert(scheme)
    .then(([scheme_id]) => {
      return findById(scheme_id);
    });
}

function addStep(scheme_id, step) {
  return db("steps")
    .insert({ ...step, scheme_id })
    .then(() => {
      return findSteps(scheme_id);
    });
}

module.exports = {
  find,
  findById,
  findSteps,
  add,
  addStep,
};
