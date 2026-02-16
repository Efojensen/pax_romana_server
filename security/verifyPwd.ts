import bcrypt from 'bcrypt'

export async function verifyPwd(pwd: string, pwdHash: string): Promise<boolean> {
    return await bcrypt.compare(pwd, pwdHash);
}