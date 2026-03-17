import pool from "../../config/db"
import type { CitizenData } from "../../types/citizen";

export async function getCitizenByIdQuery(citizenId: string): Promise<CitizenData> {
    try {
        const query = `
            SELECT c.name, c.email, c.gender, c.phone_number, c.birth_date, p.name AS programme, h.name AS hall_or_hostel, json_agg(s.name) AS subgroups FROM citizens AS c
                INNER JOIN programmes AS p ON c.programme_id = p.id
                INNER JOIN campus_residences AS h ON c.campus_residency = h.id
                LEFT JOIN subgroup_memberships AS x ON c.id = x.citizen_id
                LEFT JOIN subgroups AS s ON x.subgroup_id = s.id
                WHERE c.id = $1
                GROUP BY c.name, c.email, c.gender, c.phone_number, c.birth_date, p.name, h.name;`

            const citizens = await pool.query(query, [citizenId]);

            return citizens.rows[0];
    } catch (error) {
        throw error;
    }
}