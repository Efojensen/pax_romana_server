import type { Request, Response } from 'express';
import sendMail from '../../util/email/sendMail';
import type { AdminType } from '../../types/admin';
import { hashPassword } from '../../security/hashPwd';
import createAdminQuery from '../../sql/admins/createAdmin.sql';
import { findExistingAdmin } from '../../sql/admins/findExistingAdmin.sql';
import { SuccessfulAdminRegistration } from '../../util/email/functions/successfulRegistration';

export async function createAdminController(req: Request, res: Response) {
    try {
        const {
            firstName,
            lastName,
            username,
            email,
            password,
            photo_url
        } = req.body;

        const { emailExists, usernameExists } = await findExistingAdmin(email, username)

        if (emailExists) {
            return res.status(409).json({
                message: 'Admin with this email already exists',
                success: false
            });
        }

        if (usernameExists) {
            return res.status(409).json({
                message: 'Admin with this username already exists',
                success: false
            });
        }

        const pwdHash = await hashPassword(password)
        const admin: AdminType = {
            firstName,
            lastName,
            username,
            email,
            pwd_hash: pwdHash,
            photo_url
        }

        const successfulCreate = await createAdminQuery(admin)

        res.status(201).json({
            message: 'admin created successfully',
            admin: successfulCreate,
            success: true
        })

        let emailDetails = {
            sender: process.env['EMAIL_ADDRESS'],
            recipient: {
                ...admin
            }
        };

        const sendingBody = SuccessfulAdminRegistration(emailDetails)

        sendMail(sendingBody)

        res.status(200).json({
            msg: 'sent admin an email',
            success: true
        })
    } catch (error) {
        console.error(error);
        res.status(500)
            .send({
                message: 'Internal Server Error. Please check your inputs and try again',
                success: false
            })
    }
}