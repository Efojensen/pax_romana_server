import pool from "../../../config/db"
import type { Subgroup } from "../../../types/subgroup"

export async function getSubgroups():Promise<Subgroup[]> {
    try {
        const query = `SELECT name, description, photo_url, short_name, motto FROM subgroups;`

        const res = await pool.query(query)

        return res.rows;
    } catch (error) {
        throw error
    }
}