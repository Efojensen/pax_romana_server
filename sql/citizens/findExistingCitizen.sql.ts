import pool from '../../config/db';
import type { CitizenType } from '../../types/citizen';

export async function findExistingCitizen(email: string): Promise<CitizenType> {
    try {
        const query = `
            SELECT id, name, pwd_hash AS pwdHash FROM citizens WHERE email=$1;
        `;

        const existingCitizen= await pool.query(query, [email])

        return existingCitizen.rows[0];
    } catch (error) {
        console.error("Error finding admin (SQL)", error);
        throw error;
    }
}