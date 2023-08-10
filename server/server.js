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


const mongoClient = new MongoClient(process.env.MONGODB_URL);
mongoClient.connect().then(async () => {
    console.log("Connected to mongodb");
    app.use("/api/activities", ActivitiesApi(mongoClient.db("pg6301-exam-viskog")));
    app.use("/api/loggedHours", LoggedHoursApi(mongoClient.db("pg6301-exam-viskog")));
    if (process.env.DEVELOPER_MODE) {
        const sampleActivities = [
            { title: 'Activity 1' },
            { title: 'Activity 2' },
        ];
        await mongoDatabase.collection("activities").insertMany(sampleActivities);
        console.log("Sample activities inserted in developer mode");
    }
})

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
})