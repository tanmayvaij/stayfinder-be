import express from "express";
import cors from "cors";
import { config } from "dotenv";

import { rootRouter } from "./routes";

config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use("/", rootRouter)

app.listen(port, () => {
  console.log(`StayFind server started on port ${port}`);
});
