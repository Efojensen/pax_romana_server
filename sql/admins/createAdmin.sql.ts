import pool from '../../config/db';
import { CustomError } from '../../types/error';
import type { CitizenData } from '../../types/citizen';

const createAdminQuery = async (citizen_id: number): Promise<CitizenData> => {
    try {
        let query = `INSERT INTO admins (citizen_id) VALUES ($1) RETURNING citizen_id;`;

        const { rows } = await pool.query(query, [citizen_id])
        console.log('admin created successfully')

        let next_query = `SELECT name, email, gender, phone_number FROM citizens WHERE id = $1;`;

        const res = await pool.query(next_query, [rows[0].citizen_id])

        return res.rows[0]
    } catch (error) {
        console.error("Error running admin creation query: ", error);
        throw new CustomError('admin already exists', 409);
    }
}

export default createAdminQuery