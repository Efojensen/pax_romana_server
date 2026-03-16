import pool from '../../config/db';
import type { UpdateCitizenData } from '../../types/citizen';

export async function updateAdminProfile(adminId: string, updates: UpdateCitizenData): Promise<UpdateCitizenData> {
    try {
        const allowedFields = ['name', 'email', 'gender', 'photo_url', 'phone_number',
            'birth_date', 'programme_id', 'campus_residency', 'level']

        const keys = Object.keys(updates).filter((key) => allowedFields.includes(key))

        if (keys.length === 0) {
            throw new Error('No fields provided for update');
        }

        // Build SET clause dynamically
        const setClause = keys
            .map((key, index) => `${key.toLowerCase()} = $${index + 1}`)
            .join(', ');

        const values = keys.map((key) => (updates as any)[key]);

        const query = `
            UPDATE citizens
            SET ${setClause}
            WHERE id = (SELECT member_id FROM admins WHERE id = $${keys.length + 1})
            RETURNING *;
        `;

        const result = await pool.query(query, [...values, adminId]);

        return result.rows[0];
    } catch (error) {
        throw error;
    }
}