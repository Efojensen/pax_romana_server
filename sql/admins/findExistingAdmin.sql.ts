import pool from '../../config/db';
import type { adminType } from '../../types/admin';

export async function findExistingAdmin(email: string, username: string) {
    const query = `
        SELECT
            EXISTS (SELECT 1 FROM admin WHERE email = $1) AS email_exists,
            EXISTS (SELECT 1 FROM admin WHERE username = $2) AS username_exists
    `;

    const { rows } = await pool.query(query, [email, username]);

    return {
        emailExists: rows[0].email_exists,
        usernameExists: rows[0].username_exists,
    };
}
export async function findExistingAdminByUsername(username: string) {
    const query = `
        SELECT
            EXISTS (SELECT 1 FROM admin WHERE username = $1) AS username_exists
    `;

    const { rows } = await pool.query(query, [username]);

    return {
        usernameExists: rows[0].username_exists,
    };
}

export async function findAndReturnExistingAdmin(emailOrUsername: string): Promise<adminType> {
    try {
        const query = `SELECT * FROM admin WHERE email = $1 OR username = $1`;

        const existingAdmin = await pool.query(query, [emailOrUsername]);

        console.log("Existing Admin: ", existingAdmin.rows);

        return existingAdmin.rows[0];

    } catch (error) {
        console.error("Error finding admin (SQL)", error);
        throw error;
    }
}