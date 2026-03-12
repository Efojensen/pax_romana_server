import pool from '../../config/db';
import type { CitizenType } from '../../types/citizen';

export async function createCitizenRecord(citizenData: CitizenType): Promise<CitizenType> {
    try {
        const query = `
            INSERT INTO citizens
            (name, email, pwd_hash, gender, phone_number, birth_date, programme_id, campus_residency, level)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
            RETURNING name, email, pwd_hash, gender, phone_number, birth_date, programme_id,
            campus_residency, level;
        `

        const values = [
            citizenData.name,
            citizenData.email,
            citizenData.pwdHash,
            citizenData.gender,
            citizenData.phoneNumber,
            citizenData.birthDate,
            citizenData.program,
            citizenData.hostel,
            citizenData.level
        ]

        const result = await pool.query(query, values)

        console.log('citizen created successfully')
        return result.rows[0]
    } catch (error) {
        throw error
    }
}