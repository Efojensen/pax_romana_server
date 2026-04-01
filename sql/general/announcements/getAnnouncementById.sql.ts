import pool from "../../../config/db"
import type { Announcement } from "../../../types/announcement"

export async function getAnnouncementByIdQuery(announcementID: string):Promise<Announcement> {
    try {
        const query = `
            SELECT acc.title, acc.body, json_agg(s.name) AS subgroups FROM announcements AS acc
                LEFT JOIN announcement_subgroups AS x ON acc.id = x.announcement_id
                LEFT JOIN subgroups AS s ON x.subgroup_id = s.id
                WHERE acc.id = $1
                GROUP BY acc.id;
            `

        const res = await pool.query(query, [announcementID]);

        return res.rows[0];
    } catch (error) {
        throw error;
    }
}