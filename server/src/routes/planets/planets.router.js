const express = require("express");

const { getALLPlanets } = require("./planets.controller");

const planetsRouter = express.Router();

planetsRouter.get("/planets", getALLPlanets);

module.exports = planetsRouter;
