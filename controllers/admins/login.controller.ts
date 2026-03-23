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

        const accessToken = generateToken(existingAdmin, email);

        return res.status(200).json({
            message: 'logged in successfully',
            admin: {
                email,
                name: existingAdmin.name,
                id: existingAdmin.admin_id,
            },
            access_token: accessToken,
            success: true
        });
    } catch (error) {
        console.error(`error: ${error}`)
        return res.json({
            message: `Something went wrong on our end`,
            success: false
        }).status(500);
    }
}