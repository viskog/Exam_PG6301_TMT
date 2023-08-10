import {Router} from "express";

export function ActivitiesApi(mongoDatabase) {
    const router = new Router();

    router.get("/", async (req, res) => {
        try {
            const activities = await mongoDatabase.collection("activities").find().toArray();
            const loggedHoursList = await mongoDatabase.collection("loggedHours").find().toArray();

            const activitiesWithLoggedHours = activities.map(activity => {
                const loggedHoursItem = loggedHoursList.find(item => item.title === activity.title) || {};
                return {
                    title: activity.title,
                    hoursLogged: loggedHoursItem.hours || 0,
                };
            });

            res.json(activitiesWithLoggedHours);
        } catch(err) {
            res.status(500).send({ error: 'Failed to fetch activities with logged hours.' });
        }
    });


    router.post("/new", (req, res) => {
        res.sendStatus(500);
    });

    router.post("/logHours", async (req, res) => {
        const { activityTitle, hours } = req.body;
        const existingActivity = await mongoDatabase.collection("loggedHours").findOne({ title: activityTitle });

        if (existingActivity) {
            await mongoDatabase.collection("loggedHours").updateOne({ title: activityTitle }, { $inc: { hours: hours } });
        } else {
            await mongoDatabase.collection("loggedHours").insertOne({ title: activityTitle, hours });
        }

        res.sendStatus(200);
    });

    router.get("/totalLoggedHours", async (req, res) => {
        const loggedHoursList = await mongoDatabase.collection("loggedHours").find().toArray();
        const totalHours = loggedHoursList.reduce((acc, item) => acc + item.hours, 0);
        res.json(totalHours);
    });

    return router;
}