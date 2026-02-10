import pool from '../../config/db';
import type { adminType } from '../../types/admin';

const createAdminQuery = async (admin: adminType) => {
    try {
        let query = `INSERT INTO admin (firstname, lastname, username, email, password, photo_url)
                            VALUES ($1, $2, $3, $4, $5, $6)
                            ;`;

        const values = [
            admin.firstName,
            admin.lastName,
            admin.username,
            admin.email,
            admin.pwd_hash,
            admin.photo_url
        ];

        const { rows } = await pool.query(query, values)

        console.log('admin created successfully')
        return rows[0]
    } catch (error) {
        console.error("Error running admin creation query: ", error);
        throw error;
    }
}

export default createAdminQuery