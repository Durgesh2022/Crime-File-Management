import React, { useState } from "react";
import "./form.css"; // Optional: CSS for styling
import axios from "axios"; // Axios for making HTTP requests
import { ToastContainer, toast } from "react-toastify"; // Import Toastify
import "react-toastify/dist/ReactToastify.css"; // Import Toastify CSS

const DiaryForm = () => {
    const [formData, setFormData] = useState({
        caseNo: "",
        date: "",
        name: "",
        description: "",
    });
    const [image, setImage] = useState(null); // State to hold the uploaded image file

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleImageChange = (e) => {
        setImage(e.target.files[0]); // Store the uploaded image file
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Create FormData object for sending both text data and image
        const data = new FormData();
        data.append("caseNo", formData.caseNo);
        data.append("date", formData.date);
        data.append("name", formData.name);
        data.append("description", formData.description);
        if (image) {
            data.append("image", image); // Attach image if available
        }

        try {
            const response = await axios.post(
                "http://localhost:8000/api/diary",
                data,
                {
                    headers: {
                        "Content-Type": "multipart/form-data", // Required for file uploads
                    },
                }
            );
            toast.success("Form submitted successfully!"); // Success notification
            console.log("Form submitted successfully:", response.data);
        } catch (error) {
            toast.error("Error submitting the form."); // Error notification
            console.error("Error submitting the form:", error);
        }

        // Reset form after submission
        setFormData({
            caseNo: "",
            date: "",
            name: "",
            description: "",
        });
        setImage(null); // Clear the image upload
    };

    return (
        <div className="form-container">
            <h1>Diary Entry</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    <h2>Case No:</h2>
                    <input
                        type="text"
                        name="caseNo"
                        value={formData.caseNo}
                        onChange={handleChange}
                        required
                    />
                </label>
                <label>
                    <h2>Date:</h2>
                    <input
                        type="date"
                        name="date"
                        value={formData.date}
                        onChange={handleChange}
                        required
                    />
                </label>
                <label>
                    <h2>Name:</h2>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />
                </label>
                <label>
                    <h2>Description:</h2>
                    <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        required
                    />
                </label>
                <label>
                    <h2>Upload Image:</h2>
                    <input
                        type="file"
                        name="image"
                        accept="image/*"
                        onChange={handleImageChange}
                    />
                </label>
                <button type="submit">Submit</button>
            </form>
            <ToastContainer /> {/* Toastify container for notifications */}
        </div>
    );
};

export default DiaryForm;
