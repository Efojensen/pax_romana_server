import pool from "../../config/db";
import type { Announcement } from "../../types/announcement";

export async function createAnnouncementRecord(newAnnouncement: Announcement): Promise<Announcement> {
    const client = await pool.connect()
    try {
        await client.query('BEGIN')
        const query = `
            INSERT INTO announcements(title, body, summary, photo_url)
            VALUES($1, $2, $3, $4)
            RETURNING id;
        `

        const values = [
            newAnnouncement.title,
            newAnnouncement.body,
            newAnnouncement.summary,
            newAnnouncement.photo_url
        ]

        const result = await client.query(query, values)
        const announcementId = result.rows[0].id

        // 2. Insert into join table ONLY if subgroups exist
        if (newAnnouncement.subgroups && newAnnouncement.subgroups.length > 0) {
            const subgroupIds = Array.isArray(newAnnouncement.subgroups)
                ? newAnnouncement.subgroups
                : [newAnnouncement.subgroups]

            const values = subgroupIds
                .map((_, i) => `($1, $${i + 2})`)
                .join(', ')

            await client.query(
                `INSERT INTO announcement_subgroups (announcement_id, subgroup_id)
                    VALUES ${values}`,
                [announcementId, ...subgroupIds]
            )
        }
        const res = await client.query(
            `SELECT a.title, a.body, a.summary, a.photo_url,
                COALESCE(json_agg(s.name) FILTER (where s.id IS NOT NULL), '[]') AS subgroups
                FROM announcements AS a
                    LEFT JOIN announcement_subgroups AS x ON a.id = x.announcement_id
                    LEFT JOIN subgroups AS s ON x.subgroup_id = s.id WHERE a.id = $1
                GROUP BY a.id;`, [announcementId])

        await client.query('COMMIT')

        return res.rows[0]
    } catch (error) {
        await client.query('ROLLBACK')
        throw error
    } finally {
        client.release()
    }
}