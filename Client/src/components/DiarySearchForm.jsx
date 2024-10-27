import React, { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Import Toastify CSS
import "./DiarySearchForm.css"; // Your CSS file

const DiarySearchForm = () => {
    const [name, setName] = useState("");
    const [caseNo, setCaseNo] = useState("");
    const [entries, setEntries] = useState([]);
    const [error, setError] = useState(null);
    const [judgment, setJudgment] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);

        try {
            const response = await axios.get(
                `http://localhost:8000/api/diary/search?name=${name}&caseNo=${caseNo}`
            );
            setEntries(response.data);
            toast.success("Entries fetched successfully!"); // Success toast
        } catch (error) {
            const errorMessage =
                error.response?.data?.message || "Error fetching diary entries";
            setError(errorMessage);
            toast.error(errorMessage); // Error toast
        }
    };

    const handleJudgmentChange = (e) => {
        setJudgment(e.target.value);
    };

    return (
        <div className="diary-search-form">
            <h1>Search Diary Entries</h1>
            <form onSubmit={handleSubmit} className="form">
                <label className="form-label">
                    <h2>Name:</h2>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        className="input"
                    />
                </label>
                <label className="form-label">
                    <h2>Case No:</h2>
                    <input
                        type="text"
                        value={caseNo}
                        onChange={(e) => setCaseNo(e.target.value)}
                        className="input"
                    />
                </label>
                <button type="submit" className="submit-button">
                    Search
                </button>
            </form>

            {/* Display results */}
            {error && <p className="error-message">{error}</p>}
            {entries.length > 0 && (
                <div className="results">
                    <h2>
                        Diary Entries for "{name}" with Case No "{caseNo}":
                    </h2>
                    <ul className="entries-list">
                        {entries.map((entry) => (
                            <li key={entry._id} className="entry-item">
                                <p>
                                    <strong>Case No:</strong> {entry.caseNo}
                                </p>
                                <p>
                                    <strong>Date:</strong>{" "}
                                    {new Date(entry.date).toLocaleDateString()}
                                </p>
                                <p>
                                    <strong>Description:</strong>{" "}
                                    {entry.description}
                                </p>

                                {entry.image && (
                                    <div className="entry-image">
                                        <p>
                                            <strong>Uploaded Image:</strong>
                                        </p>
                                        <img
                                            src={`http://localhost:8000/${entry.image}`}
                                            alt="Uploaded document"
                                            className="uploaded-image"
                                        />
                                    </div>
                                )}
                            </li>
                        ))}
                    </ul>

                    {/* Final Judgment Section */}
                    <h1>Final Judgment:</h1>
                    <div className="judgment">
                        <label className="judgment-label">
                            <input
                                type="radio"
                                value="Guilty"
                                checked={judgment === "Guilty"}
                                onChange={handleJudgmentChange}
                            />
                            <h3>Guilty</h3>
                        </label>
                        <label className="judgment-label">
                            <input
                                type="radio"
                                value="Not Guilty"
                                checked={judgment === "Not Guilty"}
                                onChange={handleJudgmentChange}
                            />
                            <h3>Not Guilty</h3>
                        </label>
                    </div>
                    <textarea
                        className="judgment-textarea"
                        value={judgment ? `${judgment}` : ""}
                        readOnly
                    />
                </div>
            )}

            {/* Toastify Container */}
            <ToastContainer />
        </div>
    );
};

export default DiarySearchForm;
