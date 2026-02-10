import pool from '../../config/db';

export async function findExistingAdmin(email: string, username: string) {
    const query = `
        SELECT
            EXISTS (SELECT 1 FROM admin WHERE email = $1)    AS email_exists,
            EXISTS (SELECT 1 FROM admin WHERE username = $2) AS username_exists
    `;

    const { rows } = await pool.query(query, [email, username]);

    return {
        emailExists: rows[0].email_exists,
        usernameExists: rows[0].username_exists,
    };
}
