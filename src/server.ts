import express from "express";
import { getPayloadClient } from "./get-payload";
import { nextApp, nextHandler } from "./app/next-utils";
import settingsRoutes from './routes/settings.routes'; // Import the settings routes

const app = express();
const PORT = Number(process.env.PORT) || 3000;

app.use(express.json()); // Add this line to parse JSON request bodies

const start = async () => {
    const payload = await getPayloadClient({
        initOptions: {
            express: app,
            onInit: async (cms) => {
                cms.logger.info(`Admin URL ${cms.getAdminURL()}`);
            },
        },
    });

    app.use(settingsRoutes); // Use the settings routes

    app.use((req, res) => nextHandler(req, res));

    nextApp.prepare().then(() => {
        payload.logger.info("Next.js started");

        app.listen(PORT, async () => {
            payload.logger.info(`Next.js App URL: ${process.env.NEXT_PUBLIC_SERVER_URL}`);
        });
    });
};

start();

// server.ts

import express from "express";
import routes from "./routes"; // Import the routes

const app = express();
const PORT = Number(process.env.PORT) || 3000;

// Middleware for parsing JSON requests
app.use(express.json());

// Use the defined routes
app.use(routes);

const start = async () => {
    // Your existing initialization logic
    // ...
};

start();
