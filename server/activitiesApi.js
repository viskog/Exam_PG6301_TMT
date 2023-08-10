import {Router} from "express";

const activities = [
    {
        title: "Task A",
    },
    {
        title: "Task b",
    },
];

export function ActivitiesApi(mongoDatabase) {
    const router = new Router();

    router.get("/", async (req, res) => {
        const activities = await mongoDatabase.collection("activities")
            .find()
            .toArray();
        res.json(activities)
    })

    router.post("/new", (req, res) => {
        res.sendStatus(500);
    });

    return router;
}