const http = require("http");

const app = require("./app");
const { LoadPlanetsData } = require("./models/planets.model");

const PORT = process.env.PORT || 8000;

async function startServer() {
  await LoadPlanetsData();
  const server = http.createServer(app);
  server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}

startServer();
