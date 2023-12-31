import * as React from "react";
import * as ReactDOM from "react-dom";
import { Route, Routes, Link, BrowserRouter } from "react-router-dom";
import {useEffect, useState} from "react";

function FrontPage() {
    return (
        <div>
            <h1>Time management tool</h1>
            <ul>
                <li><Link to="/Activities">Activities</Link></li>
                <li><Link to="/LogHours">Log Hours</Link></li>
                <li><Link to="/DisplayLoggedHours">Display Logged Hours</Link></li>
            </ul>
        </div>
    );
}


function useLoading(loadingFunction){
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState();
    const [data, setData] = useState();

    async function load() {
        try {
            setLoading(true);
            setData(await loadingFunction());
        } catch (error) {
            setError(error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        load();
    }, []);

    return { loading, error, data };
}

async function fetchJSON(url) {
    const res = await fetch(url)
    if (!res.ok) {
        throw new Error(`Failed to load ${res.status}: ${res.statusText}`);
    }
    return await res.json();
}

function Activities() {
    const { loading, error, data, setData } = useLoading(async () => fetchJSON("/api/activities"));

    const [editingActivity, setEditingActivity] = useState(null);
    const [editedTitle, setEditedTitle] = useState("");

    const deleteActivity = (title) => {
        fetch(`/api/activities/${title}`, { method: 'DELETE' })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(() => {
                const updatedActivities = data.filter(activity => activity.title !== title);
                setData(updatedActivities);
            })
            .catch(console.error);
    };

    const startEditing = (title) => {
        setEditingActivity(title);
        setEditedTitle(title);
    };

    const saveEditedActivity = (originalTitle) => {
        fetch(`/api/activities/${originalTitle}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ title: editedTitle }),
        })
            .then(() => {
                const updatedActivities = data.map(activity => activity.title === originalTitle ? { title: editedTitle } : activity);
                setData(updatedActivities);
                setEditingActivity(null);
                setEditedTitle("");
            })
            .catch(console.error);
    };

    if (loading) {
        return <div>Loading...</div>
    }
    if (error) {
        return (
            <div>
                <h1>Error</h1>
                <div>{error.toString()}</div>
            </div>
        );
    }

    return (
        <div>
            <h1>Activities</h1>
            {data.map((activity) => (
                <div key={activity.title}>
                    {editingActivity === activity.title ? (
                        <>
                            <input
                                type="text"
                                value={editedTitle}
                                onChange={(e) => setEditedTitle(e.target.value)}
                            />
                            <button onClick={() => saveEditedActivity(activity.title)}>Save</button>
                        </>
                    ) : (
                        <>
                            {activity.title}
                            <button onClick={() => startEditing(activity.title)}>Edit</button>
                            <button onClick={() => deleteActivity(activity.title)}>Delete</button>
                        </>
                    )}
                </div>
            ))}
            <Link to="/">Go back</Link>
        </div>
    );
}



function LogHours() {
    const [activities, setActivities] = useState([]);
    const [selectedActivity, setSelectedActivity] = useState(null);
    const [hours, setHours] = useState(0);

    useEffect(() => {
        fetch("/api/activities")
            .then(res => res.json())
            .then(data => setActivities(data))
            .catch(err => console.error("Failed to load activities:", err));
    }, []);

    const logHoursForActivity = () => {
        fetch("/api/loggedHours", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                activity: selectedActivity,
                hours
            }),
        })
            .then(response => response.json())
            .then(data => {
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    };

    return (
        <div>
            <h1>Log hours</h1>
            <select value={selectedActivity} onChange={e => setSelectedActivity(e.target.value)}>
                <option>Select an activity</option>
                {activities.map(activity => (
                    <option key={activity.title} value={activity.title}>{activity.title}</option>
                ))}
            </select>
            <input type="number" value={hours} onChange={e => setHours(parseFloat(e.target.value))} placeholder="Hours" />
            <button onClick={logHoursForActivity}>Log Hours</button>
            <Link to="/">Go back</Link>
        </div>
    );
}

function DisplayLoggedHours() {
    const { loading, error, data } = useLoading(async () => fetchJSON("/api/loggedHours"));

    if (loading) {
        return <div>Loading...</div>
    }
    if (error) {
        return (
            <div>
                <h1>Error</h1>
                <div>{error.toString()}</div>
            </div>
        );
    }
    return (
        <div>
            <h1>Logged Hours</h1>
            <ul>
                {data.map(entry => (
                    <li key={entry._id}>
                        Activity: {entry._id} - Total Hours: {entry.totalHours}
                    </li>
                ))}
            </ul>
            <Link to="/">Go back</Link>
        </div>
    );
}



function Application() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<FrontPage />} />
                <Route path="/Activities" element={<Activities />} />
                <Route path="/LogHours" element={<LogHours />} />
                <Route path="/DisplayLoggedHours" element={<DisplayLoggedHours />} />
            </Routes>
        </BrowserRouter>
    );
}


ReactDOM.render(<Application />, document.getElementById("app"));