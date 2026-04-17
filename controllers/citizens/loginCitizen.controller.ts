import type { Request, Response } from 'express'
import { verifyPwd } from '../../security/verifyPwd';
import { generateCitizenToken } from '../../util/auth/generateCitizenToken';
import { findAndReturnExistingCitizen } from '../../sql/citizens/findExistingCitizen.sql';

export async function loginCitizenController(req: Request, res: Response) {
    const { email, password } = req.body;

    try {
        if (!email || !password || password.trim() === '') {
            return res.status(400).json({
                message: 'email and password required',
                success: false
            });
        }

        const existingCitizen = await findAndReturnExistingCitizen(email)

        if (!existingCitizen) {
            console.log('citizen not found');

            return res.status(401).json({
                message: 'no citizen with that email found',
                success: false
            });
        }

        const isPasswordValid = await verifyPwd(password, existingCitizen.pwdhash);

        if (!isPasswordValid) {
            return res.status(401).json({
                message: 'invalid password',
                success: false
            });
        };

        const accessToken = generateCitizenToken(existingCitizen, email);

        return res.status(200).json({
            message: 'logged in successfully',
            citizen: {
                email,
                id: existingCitizen.id,
                name: existingCitizen.name,
            },
            access_token: accessToken,
            success: true
        });
    } catch (error) {
        console.error(`error: ${error}`)
        return res.status(500).json({
            message: `Something went wrong on our end`,
            success: false
        })
    }
}