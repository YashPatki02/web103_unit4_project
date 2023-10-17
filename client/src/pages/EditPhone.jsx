import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import PhonesAPI from "../services/phones.js";
import PhoneOptionsAPI from "../services/phoneOptions.js";
import "../css/Pages.css";

const EditPhone = () => {
    const { id } = useParams();

    const [formData, setFormData] = useState({
        title: "",
        phone_version: "",
        color: "",
        storage: "",
        case_addon: "",
        charger_addon: "",
        safety_addon: "",
    });
    const [formOptionsData, setFormOptionsData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [totalPrice, setTotalPrice] = useState(0);
    const [errorMessages, setErrorMessages] = useState("");

    const [colorOptions, setColorOptions] = useState([]);
    const [storageOptions, setStorageOptions] = useState([]);
    const [caseOptions, setCaseOptions] = useState([]);
    const [chargerOptions, setChargerOptions] = useState([]);
    const [safetyOptions, setSafetyOptions] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [phoneData, phoneOptionsData] = await Promise.all([
                    PhonesAPI.getPhoneById(id),
                    PhoneOptionsAPI.getPhoneOptions(),
                ]);
                setFormData({
                    ...phoneData,
                    title: phoneData.title,
                    phone_version: phoneData.phone_version,
                });
                setTotalPrice(phoneData.total_price);
                setFormOptionsData(phoneOptionsData);

                setColorOptions(
                    phoneOptionsData.filter(
                        (option) => option.option_type === "Color"
                    )
                );
                setStorageOptions(
                    phoneOptionsData.filter(
                        (option) => option.option_type === "Storage"
                    )
                );
                setCaseOptions(
                    phoneOptionsData.filter(
                        (option) => option.option_type === "Case Add-on"
                    )
                );
                setChargerOptions(
                    phoneOptionsData.filter(
                        (option) => option.option_type === "Charger Add-on"
                    )
                );
                setSafetyOptions(
                    phoneOptionsData.filter(
                        (option) => option.option_type === "Safety Add-on"
                    )
                );
            } catch (error) {
                console.error("Error fetching data:", error);
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        setLoading(true);
        fetchData();
    }, [id]);

    const getPrice = (name) => {
        const option = formOptionsData.find(
            (option) => option.option_name === name
        );
        return option ? parseFloat(option.option_price) : 0;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;

        const updatedFormData = { ...formData };
        updatedFormData[name] = value;

        if (
            (updatedFormData.phone_version.includes("iPhone 14") ||
                updatedFormData.phone_version.includes("iPhone 13")) &&
            name === "charger_addon" &&
            value === "20W USB-C Power Adapter"
        ) {
            setErrorMessages("This charger is not compatible with this phone");
            return;
        } else {
            setErrorMessages("");
        }

        const newTotalPrice = [
            "phone_version",
            "color",
            "storage",
            "case_addon",
            "charger_addon",
            "safety_addon",
        ].reduce((sum, field) => {
            return sum + getPrice(updatedFormData[field]);
        }, 0);

        setFormData(updatedFormData);
        setTotalPrice(newTotalPrice);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newTotalPrice = [
            "phone_version",
            "color",
            "storage",
            "case_addon",
            "charger_addon",
            "safety_addon",
        ].reduce((sum, field) => {
            return sum + getPrice(formData[field]);
        }, 0);
        try {
            const updatedPhone = await PhonesAPI.updatePhone(id, {
                ...formData,
                total_price: newTotalPrice,
            });
            console.log("Phone updated:", updatedPhone);
            window.location.href = `/customphone/${id}`;
        } catch (error) {
            console.error("Error updating phone:", error);
        }
    };

    return (
        <div className="container">
            {loading || !formData || !formOptionsData ? (
                <p>Loading...</p>
            ) : error ? (
                <p>Error: {error}</p>
            ) : (
                <article>
                    <div className="card-header">
                        <h2>📱 {formData.title}</h2>
                        <div className="text">
                            <h5>📱 {formData.phone_version}</h5>
                            <h5>💵 ${totalPrice}</h5>
                        </div>
                    </div>
                    <form onSubmit={handleSubmit}>
                        {[
                            "color",
                            "storage",
                            "case_addon",
                            "charger_addon",
                            "safety_addon",
                        ].map((field) => (
                            <div key={field} style={{ marginBottom: "10px" }}>
                                <label
                                    className="text"
                                    style={{ marginRight: "10px" }}
                                >
                                    {field.charAt(0).toUpperCase() +
                                        field
                                            .slice(1)
                                            .replace("_a", " A")
                                            .replace("ddon", "dd-On")}
                                    :
                                </label>
                                <select
                                    name={field}
                                    value={formData[field]}
                                    onChange={handleChange}
                                >
                                    {field === "color"
                                        ? colorOptions.map((option) => (
                                              <option
                                                  key={option.id}
                                                  value={option.option_name}
                                              >
                                                  {option.option_name} 💵 $
                                                  {option.option_price}
                                              </option>
                                          ))
                                        : field === "storage"
                                        ? storageOptions.map((option) => (
                                              <option
                                                  key={option.id}
                                                  value={option.option_name}
                                              >
                                                  {option.option_name} 💵 $
                                                  {option.option_price}
                                              </option>
                                          ))
                                        : field === "case_addon"
                                        ? caseOptions.map((option) => (
                                              <option
                                                  key={option.id}
                                                  value={option.option_name}
                                              >
                                                  {option.option_name} 💵 $
                                                  {option.option_price}
                                              </option>
                                          ))
                                        : field === "charger_addon"
                                        ? chargerOptions.map((option) => (
                                              <option
                                                  key={option.id}
                                                  value={option.option_name}
                                              >
                                                  {option.option_name} 💵 $
                                                  {option.option_price}
                                              </option>
                                          ))
                                        : safetyOptions.map((option) => (
                                              <option
                                                  key={option.id}
                                                  value={option.option_name}
                                              >
                                                  {option.option_name} 💵 $
                                                  {option.option_price}
                                              </option>
                                          ))}
                                </select>
                            </div>
                        ))}
                        <p style={{ color: "red" }}>{errorMessages}</p>

                        <div className="details-button">
                            <button
                                type="submit"
                                disabled={errorMessages !== ""}
                                style={{ padding: "10px 20px" }}
                            >
                                Update
                            </button>
                        </div>
                    </form>
                </article>
            )}
        </div>
    );
};

export default EditPhone;
