import pool from '../../config/db';
import { CustomError } from '../../types/error';
import type { ReturnedCitizen } from '../../types/citizen';

export async function findAdminByID(adminID: string): Promise<ReturnedCitizen> {
    try {
        const query = `
        SELECT c.name, c.email, c.phone_number, p.name AS programme, c.level FROM citizens AS c
            INNER JOIN admins AS a ON a.member_id = c.id
            INNER JOIN programmes AS p ON c.programme_id = p.id WHERE a.id = $1;`;

        const existingAdmin = await pool.query(query, [adminID]);

        if (!existingAdmin.rows.length) {
            console.error("No admin found");
            throw new CustomError('no admin found', 404)
        }

        return existingAdmin.rows[0];
    } catch (error) {
        console.error("Error finding admin (SQL)", error);
        throw error;
    }
}