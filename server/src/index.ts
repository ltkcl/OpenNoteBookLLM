import express from "express";
import dotenv from "dotenv";
import { auth } from "./lib/auth.js";
import { toNodeHandler } from "better-auth/node";
import cors from "cors";
import { registerRoutes } from "./routes/index.js";
import { errorHandler } from "./middleware/error-handler-middleware.js";
import { inngest  } from "./ingest/client.js";
import {serve} from "inngest/express"
import { functions } from "./ingest/index.js";
dotenv.config({path :".env"});
const app = express();

const PORT = process.env.PORT || 8081;
const clientUrl = process.env.CLIENT_URL ?? "http://localhost:3000";
app.use(cors({
    origin: clientUrl,
    credentials: true,
    exposedHeaders: ["X-Conversation-Id"],
}))

app.all('/api/auth/{*any}', toNodeHandler(auth));

app.use(express.json());
app.use("/api/ingest", serve({ client: inngest, functions }));

app.get("/",(req,res)=>{
    res.send("Hello World")
})

registerRoutes(app);

app.use(errorHandler);

app.listen(PORT,()=>{
    console.log("Server is running on port 8081")
})
