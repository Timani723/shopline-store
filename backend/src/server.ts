
import express from "express";
import cors from "cors";
import { clerkMiddleware } from "@clerk/express";
import { clerkWebhookHandler } from "./webhooks/clerk";
import { getEnv } from "./lib/env";
import "dotenv/config";


const rawJson = express.raw({ type: "application/json", limit: "1mb" });

const app = express();
const env = getEnv();

app.use(cors());
app.use(clerkMiddleware());

app.post("/webhooks/clerk", rawJson, (req, res) => {
  void clerkWebhookHandler(req, res);
});

app.listen(env.PORT, () => console.log("listening on port:", env.PORT))