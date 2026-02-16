import pool from '../../config/db';
import type { adminType, UpdateAdminInput } from '../../types/admin';

export async function updateAdminProfile(adminId: string, updates: UpdateAdminInput): Promise<adminType> {
    try {
        const allowedFields = ['email' , 'lastName', 'username', 'password', 'firstName' ,'photo_url']

        const keys = Object.keys(updates).filter((key) => {
            allowedFields.includes(key)
        });

        if (keys.length === 0) {
            throw new Error('No fields provided for update');
        }

        // Build SET clause dynamically
        const setClause = keys
            .map((key, index) => `${key.toLowerCase()} = $${index + 1}`)
            .join(', ');

        const values = keys.map((key) => (updates as any)[key]);

        const query = `
            UPDATE admin
            SET ${setClause}
            WHERE id = $${keys.length + 1}
            RETURNING *;
        `;

        const result = await pool.query(query, [...values, adminId]);

        return result.rows[0];
    } catch (error) {
        throw error;
    }
}