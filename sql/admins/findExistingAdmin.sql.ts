import pool from '../../config/db';
import type { AdminData } from '../../types/citizen';

export async function findAndReturnExistingAdmin(email: string): Promise<AdminData> {
    try {
        const query = `
            SELECT c.name, c.pwd_hash, a.id AS admin_id FROM citizens AS c
                INNER JOIN admins AS a ON a.citizen_id = c.id
                WHERE c.email = $1;`;

        const existingAdmin = await pool.query(query, [email]);

        return existingAdmin.rows[0];
    } catch (error) {
        console.error("Error finding admin (SQL)", error);
        throw error;
    }
}