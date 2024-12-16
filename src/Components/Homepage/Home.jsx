import React, { useState, useEffect } from "react";
import { deleteJob, getJob } from "../../services/index";
import { useNavigate } from "react-router-dom";

const debouncingTime = 1000;
const debounce = (func, wait) => {
    let timeout;
    const debounced = (...args) => {
        clearTimeout(timeout);
        timeout = setTimeout(() => func(...args), wait);
    };
    debounced.cancel = () => clearTimeout(timeout);
    return debounced;
};

function Home() {
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [limit, setLimit] = useState(5);
    const [offset, setOffset] = useState(0);
    const [count, setCount] = useState(0);
    const [search, setSearch] = useState("");

    const navigate = useNavigate();

    const fetchJobs = async () => {
        setLoading(true);
        try {
            const res = await getJob({ limit, offset: offset * limit, name: search });
            if (res.status === 200) {
                const data = await res.json();
                setJobs(data.jobs);
                setCount(data.count);
            } else {
                console.error("Error fetching jobs:", res);
            }
        } catch (error) {
            console.error("Error:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const debounceFetchJob = debounce(fetchJobs, debouncingTime);

        debounceFetchJob();

        return () => debounceFetchJob.cancel();
    }, [limit, offset, search]);

    const handleDeleteJob = async (id) => {
        const res = await deleteJob(id);
        if (res.status === 200) {
            alert("Job deleted successfully");
            fetchJobs();
        } else {
            alert("Error in deleting job");
        }
    };

    return (
        <div>
            <h1>LIST OF JOBS</h1>
            <input
                placeholder="search"
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />
            {loading ? (
                <h1>Loading...</h1>
            ) : (
                <>
                    <div style={{ border: "10px solid black" }}>
                        {jobs.map((job) => (
                            <div key={job._id}>
                                <h2>{job.companyName}</h2>
                                <p>{job.jobPosition}</p>
                                <button onClick={() => navigate(`/editJob/${job._id}`)}>Edit</button>
                                <button onClick={() => handleDeleteJob(job._id)}>Delete</button>
                            </div>
                        ))}
                    </div>
                    <select value={limit} onChange={(e) => setLimit(parseInt(e.target.value, 10))}>
                        <option value="5">5</option>
                        <option value="10">10</option>
                        <option value="15">15</option>
                    </select>
                    <button disabled={offset === 0} onClick={() => setOffset((prev) => prev - 1)}>
                        Prev
                    </button>
                    <button disabled={(offset + 1) * limit >= count} onClick={() => setOffset((prev) => prev + 1)}>
                        Next
                    </button>
                </>
            )}
        </div>
    );
}

export default Home;
