import express from "express";
import showRequests from "./utils/showRequests.js";
import "./cronjob/index.js";
import routes from "./routes/index.js";
import { connectToDatabase } from "./utils/db/dbConn.js";

const port = process.env.PORT || 4000;
const app = express();

app.use(showRequests);

app.use(express.json());

app.use(routes);

connectToDatabase().then(() => {
  app.listen(port, () => {
    console.log("Server listening on port " + port);
  });
});
