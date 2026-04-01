import pool from "../../../config/db";
import type { Subgroup } from "../../../types/subgroup";

export async function updateSubgroupRecord(subgroupUpdates: Subgroup, subgroupID: string): Promise<Subgroup> {
    try {
        const allowedFields = ['name', 'motto', 'photo_url', 'short_name', 'description']

        const keys = Object.keys(subgroupUpdates).filter((key) => allowedFields.includes(key))

        if (keys.length === 0) {
            throw new Error('No fields provided for update')
        }

        const setClause = keys.map((key, index) => `${key} = $${index + 1}`).join(', ')

        const values = keys.map((key) => (subgroupUpdates as any)[key])

        const query = `
            UPDATE subgroups
            SET ${setClause}
            WHERE id = $${keys.length + 1}
            RETURNING *;
        `

        const result = await pool.query(query, [...values, subgroupID])

        return result.rows[0]
    } catch (error) {
        throw error
    }
}