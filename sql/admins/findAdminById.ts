import pool from '../../config/db';

export async function findAdminByID(adminID: string) {
    try {
        const query = `SELECT * FROM admin WHERE id = $1;`;

        const existingAdmin = await pool.query(query, [adminID]);

        console.log("Existing Admin: ", existingAdmin.rows);

        if (!existingAdmin.rows.length) {
            console.log("No admin found");
            return null;
        }

        return existingAdmin.rows[0];
    } catch (error) {
        console.error("Error finding admin (SQL)", error);
        throw error;
    }
}