import React, { useState, useEffect } from "react";
import PhonesAPI from "../services/phones.js";
import PhoneOptionsAPI from "../services/phoneOptions.js";
import '../css/Pages.css'

const CreatePhone = () => {
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
        const fetchComponentOptions = async () => {
            try {
                const options = await PhoneOptionsAPI.getPhoneOptions();
                setFormOptionsData(options);

                setColorOptions(
                    options.filter((option) => option.option_type === "Color")
                );
                setStorageOptions(
                    options.filter((option) => option.option_type === "Storage")
                );
                setCaseOptions(
                    options.filter(
                        (option) => option.option_type === "Case Add-on"
                    )
                );
                setChargerOptions(
                    options.filter(
                        (option) => option.option_type === "Charger Add-on"
                    )
                );
                setSafetyOptions(
                    options.filter(
                        (option) => option.option_type === "Safety Add-on"
                    )
                );

                setLoading(false);
            } catch (error) {
                console.error("Error fetching phone component options:", error);
                setError(error.message);
            }
        };

        fetchComponentOptions();
    }, []);

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
            const newCustomPhone = await PhonesAPI.createPhone({
                ...formData,
                total_price: newTotalPrice,
            });
            console.log("Custom phone created:", newCustomPhone);
            window.location.href = "/customphones";
        } catch (error) {
            console.error("Error creating custom phone:", error);
        }
    };

    return (
        <div style={{ padding: "20px" }}>
            {loading ? (
                <p>Loading...</p>
            ) : error ? (
                <p>Error: {error}</p>
            ) : (
                <article>
                    <div className="card-header">
                        <h2>Create a Custom Phone</h2>
                        <h2>💵 ${totalPrice}</h2>
                    </div>
                    <form onSubmit={handleSubmit}>
                        <input
                            type="text"
                            name="title"
                            placeholder="Title"
                            value={formData.title || ""}
                            onChange={handleChange}
                        />
                        <select
                            name="phone_version"
                            value={formData.phone_version}
                            onChange={handleChange}
                        >
                            <option value="" disabled>
                                Select a Phone Version
                            </option>
                            {formOptionsData
                                .filter(
                                    (option) =>
                                        option.option_type === "Phone Version"
                                )
                                .map((option) => (
                                    <option
                                        key={option.id}
                                        value={option.option_name}
                                    >
                                        {option.option_name}💵 $
                                        {option.option_price}
                                    </option>
                                ))}
                        </select>
                        <select
                            name="color"
                            value={formData.color}
                            onChange={handleChange}
                        >
                            <option value="" disabled>
                                Select Color
                            </option>
                            {colorOptions.map((option) => (
                                <option
                                    key={option.id}
                                    value={option.option_name}
                                >
                                    {option.option_name}💵 $
                                    {option.option_price}
                                </option>
                            ))}
                        </select>
                        <select
                            name="storage"
                            value={formData.storage}
                            onChange={handleChange}
                        >
                            <option value="" disabled>
                                Select Storage
                            </option>
                            {storageOptions.map((option) => (
                                <option
                                    key={option.id}
                                    value={option.option_name}
                                >
                                    {option.option_name}💵 $
                                    {option.option_price}
                                </option>
                            ))}
                        </select>
                        <select
                            name="case_addon"
                            value={formData.case_addon}
                            onChange={handleChange}
                        >
                            <option value="" disabled>
                                Select a Case Add-on
                            </option>
                            {caseOptions.map((option) => (
                                <option
                                    key={option.id}
                                    value={option.option_name}
                                >
                                    {option.option_name}💵 $
                                    {option.option_price}
                                </option>
                            ))}
                        </select>
                        <select
                            name="charger_addon"
                            value={formData.charger_addon}
                            onChange={handleChange}
                        >
                            <option value="" disabled>
                                Select a Charger Add-on
                            </option>
                            {chargerOptions.map((option) => (
                                <option
                                    key={option.id}
                                    value={option.option_name}
                                >
                                    {option.option_name}💵 $
                                    {option.option_price}
                                </option>
                            ))}
                        </select>
                        <select
                            name="safety_addon"
                            value={formData.safety_addon}
                            onChange={handleChange}
                        >
                            <option value="" disabled>
                                Select a Safety Add-on
                            </option>
                            {safetyOptions.map((option) => (
                                <option
                                    key={option.id}
                                    value={option.option_name}
                                >
                                    {option.option_name}💵 $
                                    {option.option_price}
                                </option>
                            ))}
                        </select>

                        <p style={{ color: "red" }}>{errorMessages}</p>
                        <button
                            type="submit"
                            disabled={errorMessages !== ""}
                            style={{ padding: "10px 20px" }}
                        >
                            Create
                        </button>
                    </form>
                </article>
            )}
        </div>
    );
};

export default CreatePhone;
