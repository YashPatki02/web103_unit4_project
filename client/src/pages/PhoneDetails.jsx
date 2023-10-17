import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import PhonesAPI from "../services/phones.js";
import "../css/Pages.css";

const PhoneDetails = () => {
    const { id } = useParams();
    const [phone, setPhone] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await PhonesAPI.getPhoneById(id);
                setPhone(data);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, [id]);

    const handleDelete = async () => {
        try {
            window.location.href = "/customphones";
            await PhonesAPI.deletePhone(id);
        } catch (error) {
            console.error("Error deleting item:", error);
        }
    };

    return (
        <div className="container">
            {phone ? (
                <article
                    className="card"
                    style={{
                        border: "1px solid black",
                        padding: "0.75rem 1.25rem",
                    }}
                >
                    <div className="card-header">
                        <h2>📱 {phone.title}</h2>
                        <div>
                            <p className="text">📱 {phone.phone_version}</p>
                            <p className="text">💵 ${phone.total_price}</p>
                        </div>
                    </div>

                    <h3>Details</h3>
                    <div className="details">
                        <p className="text">🎨 Color: {phone.color}</p>
                        <p className="text">💾 Storage: {phone.storage}</p>
                    </div>
                    <h3>Add-ons</h3>
                    <div className="details">
                        <p className="text">Phone Case: {phone.case_addon}</p>
                        <p className="text">Charger: {phone.charger_addon}</p>
                        <p className="text">Safety: {phone.safety_addon}</p>
                    </div>
                    <div className="buttons">
                        <Link
                            className="details-button"
                            to={`/customphone/edit/${phone.id}`}
                        >
                            <button>Edit</button>
                        </Link>
                        <button
                            className="details-button"
                            onClick={handleDelete}
                        >
                            Delete
                        </button>
                    </div>
                </article>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
};

export default PhoneDetails;
