import pool from '../../config/db';
import type { AdminData } from '../../types/citizen';

export async function findAndReturnExistingAdmin(email: string): Promise<AdminData> {
    try {
        const query = `
            SELECT c.name, c.pwd_hash, c.gender, c.phone_number, p.name AS programme, c.level,
                h.name AS hall_or_hostel, c.photo_url, a.id AS admin_id FROM citizens AS c
                    INNER JOIN programmes AS p ON c.programme_id = p.id
                    INNER JOIN campus_residences AS h ON c.campus_residency = h.id
                    INNER JOIN admins AS a ON a.member_id = c.id
                    WHERE c.email = $1;`;

        const existingAdmin = await pool.query(query, [email]);

        console.log("Existing Admin: ", existingAdmin.rows);

        return existingAdmin.rows[0];
    } catch (error) {
        console.error("Error finding admin (SQL)", error);
        throw error;
    }
}