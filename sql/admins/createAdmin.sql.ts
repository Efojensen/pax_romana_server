import pool from '../../config/db';
import { CustomError } from '../../types/error';
import type { ReturnedCitizen } from '../../types/citizen';

const createAdminQuery = async (member_id: number): Promise<ReturnedCitizen> => {
    try {
        let query = `INSERT INTO admins (member_id) VALUES ($1) RETURNING member_id;`;

        const { rows } = await pool.query(query, [member_id])
        console.log('admin created successfully')

        let next_query = `SELECT name, email, gender, phone_number FROM citizens WHERE id = $1;`;

        const res = await pool.query(next_query, [rows[0]])

        return res.rows[0]
    } catch (error) {
        console.error("Error running admin creation query: ", error);
        throw new CustomError('admin already exists', 409);
    }
}

export default createAdminQuery