const { planets } = require("../../models/planets.model");

function getALLPlanets(req, res) {
  return res.status(200).json(planets);
}

module.exports = { getALLPlanets };
