import pool from '../../config/db';
import type { ReturnedCitizen } from '../../types/citizen';

const getAllAdminsQuery = async (): Promise<ReturnedCitizen[]> => {
    try {
        const query = `SELECT c.name, c.email, c.phone_number, p.name AS programme, c.level FROM citizens AS c
            INNER JOIN admins AS a ON a.member_id = c.id
            INNER JOIN programmes AS p ON c.programme_id = p.id;`

        const admins = await pool.query(query);

        return admins.rows;
    } catch (error) {
        console.error("Error fetching all admins (SQL):", error);
        return []
    }
}

export default getAllAdminsQuery