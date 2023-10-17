import { pool } from "./database.js";

const createPhoneTable = async () => {
    const createTableQuery = `
            DROP TABLE IF EXISTS phones, phoneOptions;

            CREATE TABLE phones (
                id SERIAL PRIMARY KEY,
                title VARCHAR(255),
                phone_version VARCHAR(255),  
                color VARCHAR(255),           
                storage VARCHAR(255),
                case_addon VARCHAR(255),      
                charger_addon VARCHAR(255),   
                safety_addon VARCHAR(255),    
                total_price DECIMAL(10, 2)
            );

            CREATE TABLE phoneOptions (
                id SERIAL PRIMARY KEY,
                option_type VARCHAR(255),
                option_name VARCHAR(255),
                option_price DECIMAL(10, 2)
            );

            INSERT INTO phoneOptions (option_type, option_name, option_price)
            VALUES
            ('Phone Version', 'iPhone SE', 429.00),
            ('Phone Version', 'iPhone 13 Pro', 629.00),
            ('Phone Version', 'iPhone 13', 599.00),
            ('Phone Version', 'iPhone 14', 729.00),
            ('Phone Version', 'iPhone 14 Pro', 999.00),
            ('Phone Version', 'iPhone 14 Plus', 899.00),
            ('Phone Version', 'iPhone 15 Pro Max', 1199.00),
            ('Phone Version', 'iPhone 15 Plus', 929.00),
            ('Phone Version', 'iPhone 15', 999.00),
            ('Color', 'Deep Purple', 30.00),
            ('Color', 'Silver', 20.00),
            ('Color', 'Gold', 50.00),
            ('Color', 'Midnight Blue', 20.00),
            ('Color', 'Sierra Blue', 20.00),
            ('Color', 'Space Black', 30.00),
            ('Color', 'Graphite', 20.00),
            ('Color', 'Pink', 20.00),
            ('Color', 'Red', 20.00),
            ('Color', 'Alpine Green', 30.00),
            ('Storage', '64GB', 0.00),
            ('Storage', '128GB', 50.00),
            ('Storage', '256GB', 100.00),
            ('Storage', '512GB', 200.00),
            ('Storage', '1TB', 300.00),
            ('Case Add-on', 'No Case', 00.00),
            ('Case Add-on', 'Leather Case', 50.00),
            ('Case Add-on', 'Silicone Case', 40.00),
            ('Case Add-on', 'Clear Case', 20.00),
            ('Case Add-on', 'Heavy-Duty Case', 60.00),
            ('Case Add-on', 'Wallet Case', 70.00),
            ('Charger Add-on', 'No Add-on', 00.00),
            ('Charger Add-on', 'MagSafe Charger', 30.00),
            ('Charger Add-on', '20W USB-C Power Adapter', 20.00),
            ('Charger Add-on', 'Wireless Charger Pad', 50.00),
            ('Charger Add-on', 'Car Charger Adapter', 15.00),
            ('Safety Add-on', 'No Add-on', 00.00),
            ('Safety Add-on', 'Screen Protector', 10.00),
            ('Safety Add-on', 'Extended Warranty', 50.00),
            ('Safety Add-on', 'Accidental Damage Coverage', 40.00);


            INSERT INTO phones (title, phone_version, color, storage, case_addon, charger_addon, safety_addon, total_price)
            VALUES
            ('Custom iPhone SE', 'iPhone SE', 'Graphite', '256GB', 'Leather Case', 'MagSafe Charger', 'Screen Protector', 799.00),
            ('Custom iPhone 13 Pro', 'iPhone 13 Pro', 'Pink', '256GB', 'Leather Case', 'MagSafe Charger', 'Screen Protector', 1289.00),
            ('Custom iPhone 14', 'iPhone 14', 'Silver', '512GB', 'Silicone Case', '20W USB-C Power Adapter', 'Screen Protector', 1089.00),
            ('Custom iPhone 15 Pro', 'iPhone 15 Pro', 'Gold', '1TB', 'Leather Case', '20W USB-C Power Adapter', 'Extended Warranty', 1299.00);
        `;

    try {
        const result = await pool.query(createTableQuery);
        console.log("Tables created on the detabase.");
    } catch (error) {
        console.log(`Error creating table: ${error}`);
    }
};

createPhoneTable();
