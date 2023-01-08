const axios = require("axios");

const launches = require("./launches.mongo");
const planets = require("./planets.mongo");

let defaultFlightNumber = 100;
const SPACE_X_API_URL = "https://api.spacexdata.com/v4/launches/query";

const Launch = {
  flightNumber: 100,
  mission: "Kepler Exploration X",
  rocket: "Explorer IS1",
  launchDate: new Date("December 27, 2030 13:00:00"),
  customers: ["NASA"],
  target: "Kepler-442 b",
  upcoming: true,
  success: true,
};

saveLaunch(Launch);

async function loadLaunchData() {
  console.log("Loading launch data...");
  const response = await axios.post(SPACE_X_API_URL, {
    query: {},
    options: {
      populate: [
        {
          path: "rocket",
          select: {
            name: 1,
          },
        },
        {
          path: "payloads",
          select: {
            customers: 1,
          },
        },
      ],
    },
  });
}

async function getAllLaunches() {
  return await launches.find(
    {},
    {
      _id: 0,
      __v: 0,
    }
  );
}

async function saveLaunch(launch) {
  const planet = await planets.findOne({
    keplerName: launch.target,
  });

  if (!planet) {
    throw new Error("No matching planet found");
  }

  await launches.findOneAndUpdate(
    {
      flightNumber: launch.flightNumber,
    },
    launch,
    {
      upsert: true,
    }
  );
}

async function getLatestFlightNumber() {
  const latestLaunch = await launches.findOne({}).sort("-flightNumber");

  if (!latestLaunch) {
    return defaultFlightNumber;
  }
  return latestLaunch.flightNumber;
}

async function scheduleNewLaunch(launch) {
  const newFlightNumber = (await getLatestFlightNumber()) + 1;

  const newLaunch = Object.assign(launch, {
    success: true,
    upcoming: true,
    customers: ["NASA", "ISRO"],
    flightNumber: newFlightNumber,
  });

  await saveLaunch(newLaunch);
}

async function existsLaunchWithId(launchId) {
  return await launches.findOne({
    flightNumber: launchId,
  });
}

async function abortLaunchById(launchId) {
  const aborted = await launches.updateOne(
    {
      flightNumber: launchId,
    },
    {
      upcoming: false,
      success: false,
    }
  );

  return aborted.ok === 1 && aborted.nModified === 1;
}

module.exports = {
  loadLaunchData,
  getAllLaunches,
  scheduleNewLaunch,
  existsLaunchWithId,
  abortLaunchById,
};
