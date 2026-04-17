import jwt from 'jsonwebtoken'
import type { CitizenType } from "../../types/citizen"

export function generateCitizenToken(citizen: CitizenType, email: string): string {
    const jwtSecretKey = process.env['JWT_SECRET']!;

    const token = jwt.sign(
        {
            email: email,
            name: citizen.name,
            citizen_id: citizen.id,
        },
        jwtSecretKey,
        { expiresIn: '1h' }
    )

    return token;
}