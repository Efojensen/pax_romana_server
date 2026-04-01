import pool from "../../../config/db"
import type { Subgroup } from "../../../types/subgroup"

export async function getSubgroupByIdQuery(subgroupID: string): Promise<Subgroup> {
    try {
        const query = `SELECT name, description, photo_url, short_name, motto FROM subgroups WHERE id = $1;`

        const res = await pool.query(query, [subgroupID])

        return res.rows[0];
    } catch (error) {
        throw error
    }
}