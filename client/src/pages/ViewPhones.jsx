import React, { useState, useEffect } from "react";
import PhonesAPI from "../services/phones.js";
import { Link } from "react-router-dom";
import "../css/Pages.css";

const ViewPhones = () => {
    const [phones, setPhones] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await PhonesAPI.getAllPhones();
                setPhones(data);
            } catch (error) {
                console.error("Error fetching phone data:", error);
            }
        };

        fetchData();
    }, []);

    return (
        <div className="container">
            {phones.map((phone) => (
                <article
                    key={phone.id}
                    id="article"
                    style={{
                        border: "1px solid black",
                        padding: "10px",
                        margin: "10px",
                    }}
                >
                    <div className="card-header">
                        <h2>📱{phone.title}</h2>
                        <div>
                            <p className="text">📱 {phone.phone_version}</p>
                            <p className="text">💵 ${phone.total_price}</p>
                        </div>
                    </div>

                    <div style={{ padding: "0.75rem 1.25rem" }}>
                        <h3>Details</h3>
                        <div className="details">
                            <p className="text">🎨 Color: {phone.color}</p>
                            <p className="text">💾 Storage: {phone.storage}</p>
                        </div>
                        <h3>Add-ons</h3>
                        <div className="details">
                            <p className="text">
                                Phone Case: {phone.case_addon}
                            </p>
                            <p className="text">
                                Charger: {phone.charger_addon}
                            </p>
                            <p className="text">
                                Safety: {phone.safety_addon}
                            </p>
                        </div>
                    </div>

                    <Link
                        className="details-button"
                        to={`/customphone/${phone.id}`}
                    >
                        <button>View Details</button>
                    </Link>
                </article>
            ))}
        </div>
    );
};

export default ViewPhones;
