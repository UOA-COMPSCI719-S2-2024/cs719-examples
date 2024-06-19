/**
 * This program shows how we can use Express Routers to break up our route handlers into multiple, well-organized files.
 */

// Configure environment variables
import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import morgan from "morgan";
import cookieParser from "cookie-parser";

// Set's our port to the PORT environment variable, or 3000 by default if the env is not configured.
const PORT = process.env.PORT ?? 3000;

// Creates the express server
const app = express();

// Configure middleware (logging, CORS support, JSON parsing support, static files support)
app.use(morgan("combined"));

// For CORS, since we're using cookies with fetch(), we have to allow credentials and give an explicit list of allowed origins.
app.use(
  cors({
    origin: ["http://localhost:3000", "http://localhost:5173"],
    credentials: true
  })
);
app.use(express.json());
app.use(express.static("public"));

// NEW middleware: Cookie parser
app.use(cookieParser());

// Import and use our application routes.
import routes from "./routes/routes.js";
app.use("/", routes);

// Start the server running.
app.listen(PORT, () => {
  console.log(`Express server listening on port ${PORT}`);
});
