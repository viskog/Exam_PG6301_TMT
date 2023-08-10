import {Router} from "express";

export function LoggedHoursApi(mongoDatabase) {
    const router = new Router();

    router.post("/", async (req, res) => {
        const {activity, hours} = req.body;
        // Add validation here for activity and hours
        await mongoDatabase.collection("loggedHours").insertOne({activity, hours});
        res.json({message: "Hours logged successfully"});
    })

    router.get("/", async (req, res) => {
        try {
            const aggregatedHours = await mongoDatabase.collection("loggedHours")
                .aggregate([
                    {
                        $group: {
                            _id: "$activity",
                            totalHours: { $sum: "$hours" }
                        }
                    }
                ])
                .toArray();

            res.json(aggregatedHours);
        } catch (error) {
            console.error("Failed to fetch aggregated hours:", error);
            res.status(500).json({ message: "Internal server error" });
        }
    });



    return router;
}