const http = require("http");
const mongoose = require("mongoose");

const app = require("./app");
const { loadLaunchData } = require("./models/launches.model");
const { LoadPlanetsData } = require("./models/planets.model");

const PORT = process.env.PORT || 8000;

const MONGO_URL =
  "mongodb+srv://nasa-api:WmyhohODBbREpPrx@nasacluster.nnpuvru.mongodb.net/NASA?retryWrites=true&w=majority";

mongoose.set("strictQuery", true);

mongoose.connection.on("connected", () => {
  console.log("Mongoose is connected!");
});

mongoose.connection.on("error", (err) => {
  console.log(err);
});

async function startServer() {
  await mongoose.connect(MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    autoIndex: true,
  });

  await LoadPlanetsData();
  const server = http.createServer(app);
  server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });

  loadLaunchData();
}

startServer();
