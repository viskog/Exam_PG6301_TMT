const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = 5000;

let data = {
    // your testData structure
};

app.use(bodyParser.json());

// GET request
app.get('/api/data', (req, res) => {
    res.json(data);
});

// POST request to add an activity
app.post('/api/activity', (req, res) => {
    data.activities.push(req.body);
    res.json({ message: 'Activity added' });
});

// PUT request to update hours for an activity
app.put('/api/activity/:name', (req, res) => {
    data.activities = data.activities.map(activity =>
        activity.name === req.params.name ? { ...activity, hours: activity.hours + req.body.hours } : activity
    );
    res.json({ message: 'Hours updated' });
});

// DELETE request to delete an activity
app.delete('/api/activity/:name', (req, res) => {
    data.activities = data.activities.filter(activity => activity.name !== req.params.name);
    res.json({ message: 'Activity deleted' });
});

app.listen(PORT, () => {
    console.log(`Server is running on PORT ${PORT}`);
});
