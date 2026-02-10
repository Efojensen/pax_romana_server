import pool from '../../config/db';

const getAllAdminsQuery = async () => {
    try {
        const query = `SELECT id, firstname, lastname, username, email, photo_url
                        FROM admin;`;

        const admins = await pool.query(query, []);

        console.log("SQL response: ", admins.rows);

        return admins.rows;

    } catch (error) {
        console.error("Error fetching all admins (SQL):", error);
    }
}

export default getAllAdminsQuery