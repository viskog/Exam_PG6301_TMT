import express from "express";
import * as path from "path";
import {LoggedHoursApi} from "./loggedHoursApi.js";
import {ActivitiesApi} from "./activitiesApi.js";
import {MongoClient} from "mongodb";
import dotenv from "dotenv";
import bodyParser from "body-parser";

dotenv.config();

const app = express();

app.use(bodyParser.json());

async function seedUsers(db) {
    const usersCount = await db.collection('users').countDocuments();
    if (usersCount === 0) {
        const predefinedUsers = [
            { username: 'employee1', password: 'test123', role: 'employee' },
            { username: 'employee2', password: 'test123', role: 'employee' },
            { username: 'manager1', password: 'test123', role: 'manager' },
            { username: 'manager2', password: 'test123', role: 'manager' }
        ];

        await db.collection('users').insertMany(predefinedUsers);
        console.log("Seeded predefined users.");
    }
}

const mongoClient = new MongoClient(process.env.MONGODB_URL);
mongoClient.connect().then(async () => {
    console.log("Connected to mongodb");
    const db = mongoClient.db("pg6301-exam-viskog");

    await seedUsers(db);  // Seed users if needed

    app.use("/api/activities", ActivitiesApi(db));
    app.use("/api/loggedHours", LoggedHoursApi(db));

    if (process.env.DEVELOPER_MODE) {
        const sampleActivities = [
            { title: 'Activity 1' },
            { title: 'Activity 2' },
        ];
        await db.collection("activities").insertMany(sampleActivities);
        console.log("Sample activities inserted in developer mode");
    }
});

app.use(express.static("../client/dist/"));

app.use((req, res, next) => {
    if (req.method === "GET" && !req.path.startsWith("/api")) {
        return res.sendFile(path.resolve("../client/dist/index.html"));
    } else {
        next();
    }
});

const server = app.listen(process.env.PORT || 3001, () => {
    console.log(`Started on http://localhost:${server.address().port}`)
});
