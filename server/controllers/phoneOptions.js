import { pool } from "../config/database.js";

const getPhoneOptions = async (req, res) => {
    try {
        const result = await pool.query("SELECT * FROM phoneOptions");
        res.status(201).json(result.rows);
    } catch (error) {
        console.error("Error fetching component options:", error);
        res.status(409).json({ error: error.message });
    }
};

export default { getPhoneOptions };
