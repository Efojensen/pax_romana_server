import type { Request, Response } from 'express'
import { verifyPwd } from '../../security/verifyPwd';
import { generateToken } from '../../util/auth/generateToken';
import { findAndReturnExistingAdmin } from '../../sql/admins/findExistingAdmin.sql';

export async function loginAdminController(req: Request, res: Response) {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.json({
            message: 'email and password required',
            success: false
        }).status(400);
    }

    try {
        const existingAdmin = await findAndReturnExistingAdmin(email)

        if (!existingAdmin) {
            console.log('admin not found');

            return res.json({
                message: 'no admin with that email found',
                success: false
            }).status(404);
        }

        const isPasswordValid = await verifyPwd(password, existingAdmin.pwd_hash);

        if (!isPasswordValid) {
            return res.json({
                message: 'invalid password',
                success: false
            }).status(401);
        };

        const accessToken = generateToken(existingAdmin.admin_id!);

        return res.json({
            message: 'logged in successfully',
            admin: {
                name: existingAdmin.name,
                email: existingAdmin.email,
                id: existingAdmin.admin_id,
                photo_url: existingAdmin.photo_url,
            },
            access_token: accessToken,
            success: true
        }).status(200);
    } catch (error) {
        console.error(`error: ${error}`)
        return res.json({
            message: `Something went wrong on our end`,
            success: false
        }).status(500);
    }
}