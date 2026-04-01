import pool from '../../config/db';
import type { CitizenData } from '../../types/citizen';

export async function updateAdminProfile(citizenID: string, updates: CitizenData): Promise<CitizenData> {
    try {
        const allowedFields = ['name', 'email', 'gender', 'photo_url', 'phone_number',
            'birth_date', 'programme_id', 'campus_residency', 'level']

        const keys = Object.keys(updates).filter((key) => allowedFields.includes(key))

        if (keys.length === 0) {
            throw new Error('No fields provided for update');
        }

        const setClause = keys
            .map((key, index) => `${key.toLowerCase()} = $${index + 1}`)
            .join(', ');

        const values = keys.map((key) => (updates as any)[key]);

        const query = `
            UPDATE citizens
            SET ${setClause}
            WHERE id = (SELECT citizen_id FROM admins WHERE id = $${keys.length + 1})
            RETURNING *;
        `;

        const result = await pool.query(query, [...values, citizenID]);

        return result.rows[0];
    } catch (error) {
        throw error;
    }
}