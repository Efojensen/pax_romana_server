import jwt from 'jsonwebtoken'
import type { AdminData } from '../../types/citizen';

export function generateToken(admin: AdminData, email: string): string {
    const jwtSecretKey = process.env['JWT_SECRET']!;

    const token = jwt.sign(
        {
            email: email,
            name: admin.name,
            id: admin.admin_id,
        },
        jwtSecretKey,
        { expiresIn: '1h' }
    )

    return token;
}