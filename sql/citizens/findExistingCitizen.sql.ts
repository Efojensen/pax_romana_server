import pool from '../../config/db';

export async function findExistingCitizen(email: string) {
    const query = `
        SELECT
            EXISTS (SELECT 1 FROM citizens WHERE email =$1) AS email_exists
    `;

    const { rows } = await pool.query(query, [email])

    return {
        emailExists: rows[0].email_exists
    }
}