import * as React from "react";
import * as ReactDOM from "react-dom";
import { Route, Routes, Link, BrowserRouter } from "react-router-dom";

const testData = {
    maxHours: 40,
    activities: [
        { name: 'Task A', hours: 5 },
        { name: 'Task B', hours: 3 },
        { name: 'Task C', hours: 2 },
    ],
};

function FrontPage() {
    return (
        <div>
            <h1>Time management tool</h1>
            <ul>
                <li><Link to="/Activities">Activities</Link></li>
                <li><Link to="/LogHours">Log Hours</Link></li>
            </ul>
        </div>
    );
}

function Activities({data}) {
    return (
        <div>
            <h1>Activities</h1>
            <ul>
                {data.activities.map((activity, index) => (
                    <li key={index}>{activity.name} - Logged hours: {activity.hours}</li>
                ))}
            </ul>
            <Link to="/">Go back</Link>
        </div>
    );
}

function LogHours({ data, updateActivityHours }) {
    const [hours, setHours] = React.useState(0);
    const [selectedActivity, setSelectedActivity] = React.useState(data.activities[0].name);

    const totalLoggedHours = data.activities.reduce((acc, curr) => acc + curr.hours, 0);

    return (
        <div>
            <h1>Log hours</h1>
            <p>Total logged hours: {totalLoggedHours}</p>
            <p>Maximum hours: {data.maxHours} hours</p>
            <label>
                Activity:
                <select value={selectedActivity} onChange={(e) => setSelectedActivity(e.target.value)}>
                    {data.activities.map((activity, index) => (
                        <option key={index} value={activity.name}>{activity.name}</option>
                    ))}
                </select>
            </label>
            <input
                type="number"
                value={hours}
                onChange={(e) => setHours(parseFloat(e.target.value))}
                placeholder="Hours to log"
            />
            <button
                onClick={() => {
                    if ((totalLoggedHours + hours) <= data.maxHours) {
                        updateActivityHours(selectedActivity, hours);
                    } else {
                        alert("Exceeding max hours!");
                    }
                }}
            >
                Log Hours
            </button>
            <Link to="/">Go back</Link>
        </div>
    );
}

function Application() {
    const [data, setData] = React.useState(testData);

    const updateActivityHours = (activityName, hoursToAdd) => {
        const updatedActivities = data.activities.map(activity => {
            if (activity.name === activityName) {
                return { ...activity, hours: activity.hours + hoursToAdd };
            }
            return activity;
        });

        setData({ ...data, activities: updatedActivities });
    };

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<FrontPage />} />
                <Route path="/Activities" element={<Activities data={data} />} />
                <Route path="/LogHours" element={<LogHours data={data} updateActivityHours={updateActivityHours} />} />
            </Routes>
        </BrowserRouter>
    );
}

ReactDOM.render(<Application />, document.getElementById("app"));