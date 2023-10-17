import { pool } from "../config/database.js";

const getPhones = async (req, res) => {
    try {
        const results = await pool.query(
            "SELECT * FROM phones ORDER BY id ASC"
        );
        res.status(200).json(results.rows);
    } catch (error) {
        res.status(409).json({ error: error.message });
    }
};

const getPhone = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const results = await pool.query("SELECT * FROM phones WHERE id = $1", [
            id,
        ]);
        res.status(201).json(results.rows[0]);
    } catch (error) {
        res.status(409).json({ error: error.message });
        console.log("Unable to get phone.");
        console.log("Error:", err.message);
    }
};

const createPhone = async (req, res) => {
    try {
        const {
            title,
            phone_version,
            color,
            storage,
            case_addon,
            charger_addon,
            safety_addon,
            total_price,
        } = req.body;

        const results = await pool.query(
            `INSERT INTO phones (title, phone_version, color, storage, case_addon, charger_addon, safety_addon, total_price) 
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8) 
            RETURNING *`,
            [
                title,
                phone_version,
                color,
                storage,
                case_addon,
                charger_addon,
                safety_addon,
                total_price,
            ]
        );
        res.status(201).json(results.rows[0]);
    } catch (error) {
        res.status(409).json({ error: err.message });
    }
};

const updatePhone = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const {
            title,
            phone_version,
            color,
            storage,
            case_addon,
            charger_addon,
            safety_addon,
            total_price,
        } = req.body;

        const results = await pool.query(
            `UPDATE phones 
            SET title = $1, phone_version = $2, color = $3, 
            storage = $4, case_addon = $5, charger_addon = $6, 
            safety_addon = $7, total_price = $8 
            WHERE id = $9`,
            [
                title,
                phone_version,
                color,
                storage,
                case_addon,
                charger_addon,
                safety_addon,
                total_price,
                id,
            ]
        );
        res.status(201).json(results.rows);
    } catch (error) {
        res.status(409).json({ error: err.message });
    }
};

const deletePhone = async (req, res) => {
    try {
        const id = parseInt(req.params.id);

        const results = await pool.query("DELETE FROM phones WHERE id = $1", [
            id,
        ]);
        res.status(201).json(results.rows);
    } catch (error) {
        res.status(409).json({ error: err.message });
    }
};

export default { getPhones, getPhone, createPhone, updatePhone, deletePhone };
