import bcrypt from 'bcrypt'

export async function hashPassword(pwd: string): Promise<string> {
    const salt = process.env['SALT']!
    const hash = await bcrypt.hash(pwd, salt)

    return hash
}