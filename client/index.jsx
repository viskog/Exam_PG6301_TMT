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
    const { loading, error, data } = useLoading(async () =>
        fetchJSON("/api/activities")
    );

    if (loading) {
        return <div>Loading...</div>
    }
    if (error){
        return (
            <div>
                <h1>Error</h1>
                <div>{error.toString()}</div>
            </div>);
    }
    return (
        <div>
            <h1>Activities</h1>
            {data.map((activity) => (
                <div key={activity.title}>
                    <strong>{activity.title}</strong>: {activity.hoursLogged} hours logged
                </div>
            ))}
            <Link to="/">Go back</Link>
        </div>
    );
}


function LogHours() {
    const [selectedActivity, setSelectedActivity] = useState(""); // store the selected activity
    const [hours, setHours] = useState(0); // store logged hours
    const { data: activities, loading, error } = useLoading(async () =>
        fetchJSON("/api/activities")
    );

    const handleSubmit = async () => {
        try {
            await fetch("/api/activities/logHours", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ activityTitle: selectedActivity, hours }),
            });
            alert("Hours logged successfully!");
        } catch (error) {
            alert("Error logging hours: " + error.message);
        }
    }

    return (
        <div>
            <h1>Log hours</h1>

            {loading && <p>Loading activities...</p>}
            {error && <p>Error loading activities: {error.toString()}</p>}

            {!loading && !error && (
                <>
                    <select value={selectedActivity} onChange={(e) => setSelectedActivity(e.target.value)}>
                        <option value="">Select an activity</option>
                        {activities.map(activity => (
                            <option key={activity.title} value={activity.title}>
                                {activity.title}
                            </option>
                        ))}
                    </select>

                    <input
                        type="number"
                        value={hours}
                        onChange={(e) => setHours(e.target.value)}
                        placeholder="Hours"
                    />

                    <button onClick={handleSubmit}>Log Hours</button>
                </>
            )}

            <Link to="/">Go back</Link>
        </div>
    );

}


function Application() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<FrontPage />} />
                <Route path="/Activities" element={<Activities  />} />
                <Route path="/LogHours" element={<LogHours />} />
            </Routes>
        </BrowserRouter>
    );
}

ReactDOM.render(<Application />, document.getElementById("app"));