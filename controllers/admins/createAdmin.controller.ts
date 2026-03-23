import type { Request, Response } from 'express';
import sendMail from '../../util/email/sendMail';
import createAdminQuery from '../../sql/admins/createAdmin.sql';
import { SuccessfulAdminRegistration } from '../../util/email/functions/successfulRegistration';

export async function createAdminController(req: Request, res: Response) {
    try {
        const {
            citizen_id
        } = req.body;

        const successfulCreate = await createAdminQuery(citizen_id)

        res.status(201).json({
            message: 'admin created successfully',
            admin: successfulCreate,
            success: true
        })

        // let emailDetails = {
        //     sender: process.env['EMAIL_ADDRESS'],
        //     recipient: {
        //         ...successfulCreate
        //     }
        // };

        // const sendingBody = SuccessfulAdminRegistration(emailDetails)

        // sendMail(sendingBody)

        // res.status(200).json({
        //     msg: 'sent admin an email',
        //     success: true
        // })
    } catch (error) {
        console.error(error);
        res.status(500)
            .send({
                message: 'Internal Server Error. Please check your inputs and try again',
                success: false
            })
    }
}