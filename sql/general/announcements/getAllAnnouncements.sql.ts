import pool from "../../../config/db"
import type { Announcement } from "../../../types/announcement"

export async function getAllAnnouncementsQuery():Promise<Announcement[]> {
    try {
        const query = `
            SELECT a.title, a.body, json_agg(s.name) AS subgroups FROM announcements AS a
                LEFT JOIN announcement_subgroups AS x ON a.id = x.announcement_id
                LEFT JOIN subgroups AS s ON x.subgroup_id = s.id GROUP BY a.id;
            `

        const res = await pool.query(query);

        return res.rows;
    } catch (error) {
        throw error;
    }
}