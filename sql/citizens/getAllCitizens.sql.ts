import pool from '../../config/db';
import type { UpdateCitizenData } from '../../types/citizen';

export async function getAllCitizens(): Promise<UpdateCitizenData[]> {
    try {
        const query = `
        SELECT c.name, c.email, c.gender, c.phone_number, p.name AS programme, h.name AS hall_or_hostel, c.level, json_agg(s.name) AS subgroup
            FROM citizens AS c
                INNER JOIN programmes AS p ON c.programme_id = p.id
                INNER JOIN campus_residences AS h ON c.campus_residency = h.id
                INNER JOIN subgroup_memberships AS m ON c.id = m.member_id
                INNER JOIN subgroups AS s ON m.subgroup_id = s.id
                GROUP BY c.name, c.email, c.gender, c.phone_number, p.name, h.name, c.level;`

        const citizensData = await pool.query(query)

        return citizensData.rows;
    } catch (error) {
        throw error
    }
}