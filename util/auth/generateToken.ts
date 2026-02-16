import jwt from 'jsonwebtoken'

export function generateToken(userId: string): string {
    const jwtSecretKey = process.env['JWT_SECRET']!;
    const encryptionData = {
        time : Date(),
        userId : userId
    }

    const token = jwt.sign(encryptionData, jwtSecretKey);

    return token;
}