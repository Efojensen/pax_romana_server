import pool from "../../../config/db";
import type { Subgroup } from "../../../types/subgroup";

export async function createSubgroupRecord(subgroup: Subgroup, adminID: string): Promise<Subgroup> {
    const client = await pool.connect()
    try {
        await client.query('BEGIN')

        const query = `
            INSERT INTO subgroups
                (name, description, photo_url, short_name, motto, created_by)
                VALUES($1, $2, $3, $4, $5, $6)
                RETURNING id;
            `

        const insertRes = await client.query(query, [
            subgroup.name, subgroup.description, subgroup.photo_url, subgroup.short_name,
            subgroup.motto, adminID])

        const nextQuery = `
            SELECT s.name, s.description, s.photo_url, s.short_name, s.motto,
            c.name AS created_by FROM subgroups AS s
                INNER JOIN admins AS a ON s.created_by = a.id
                INNER JOIN citizens AS c ON a.citizen_id = c.id
                WHERE s.id = $1;
        `

        const createdSubgroup = await client.query(nextQuery, [insertRes.rows[0].id])

        await client.query('COMMIT')

        return createdSubgroup.rows[0]
    } catch (error) {
        await client.query('ROLLBACK')
        throw error
    } finally {
        client.release()
    }
}