import {Router} from "express";

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

    router.post("/", async (req, res) => {
        const { title } = req.body;
        if (!title) {
            return res.status(400).send("Title is required");
        }
        await mongoDatabase.collection("activities").insertOne({ title });
        res.json({ message: "Activity added successfully" });
    });

    router.put("/:title", async (req, res) => {
        try {
            const originalTitle = req.params.title;
            const { title: newTitle } = req.body;

            await mongoDatabase.collection("activities").updateOne(
                { title: originalTitle },
                { $set: { title: newTitle } }
            );

            res.json({ message: `Activity "${originalTitle}" updated to "${newTitle}"` });
        } catch (error) {
            console.error("Failed to update activity:", error);
            res.status(500).json({ message: "Internal server error" });
        }
    });


    router.delete("/:title", async (req, res) => {
        try {
            const { title } = req.params;
            await mongoDatabase.collection("activities").deleteOne({ title });
            res.json({ message: `Activity "${title}" deleted successfully` });
        } catch (error) {
            console.error("Failed to delete activity:", error);
            res.status(500).json({ message: "Internal server error" });
        }
    });

    return router;
}