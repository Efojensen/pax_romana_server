import pool from '../../config/db';

export async function updateAdminProfile() {
    try {
        const query = `
                UPDATE admin SET 
                    ${field} = $1
                WHERE 
                    id = $2
                RETURNING *;`;

        const values = [
            attribute,
            id
        ];
    } catch (error) {

    }
}