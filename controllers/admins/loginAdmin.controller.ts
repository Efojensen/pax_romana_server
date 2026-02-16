import type { Request, Response } from 'express'
import { verifyPwd } from '../../security/verifyPwd';
import { generateToken } from '../../util/auth/generateToken';
import { findAndReturnExistingAdmin } from '../../sql/admins/findExistingAdmin.sql';

export async function loginAdminController(req: Request, res: Response) {
    const { emailOrUsername, password } = req.body;

    if (!emailOrUsername || !password) {
        return res.json({
            message: "Email/Username and Password required",
            success: false
        }).status(400);
    }

    try {
        const existingAdmin = await findAndReturnExistingAdmin(emailOrUsername)

        if (!existingAdmin) {
            console.log("Admin not found");

            return res.json({
                message: "No Admin with that username/email found",
                success: false
            }).status(404);
        }

        const isPasswordValid = await verifyPwd(password, existingAdmin.pwd_hash);

        if (!isPasswordValid) {
            return res.json({
                message: "Invalid password",
                success: false
            }).status(401);
        };

        const accessToken = generateToken(existingAdmin.id!);

        return res.json({
            message: "Logged in successfully",
            admin: {
                id: existingAdmin.id,
                email: existingAdmin.email,
                username: existingAdmin.username,
                lastName: existingAdmin.lastName,
                firstName: existingAdmin.firstName,
                photo_url: existingAdmin.photo_url,
            },
            access_token: accessToken,
            success: true
        }).status(200);
    } catch (error) {
        console.error(`Error ${error}`)
        return res.json({
            message: `Something went wrong on our end`,
            success: false
        }).status(500);
    }
}