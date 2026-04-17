import type { Request, Response } from 'express'
import { verifyPwd } from '../../security/verifyPwd';
import { generateCitizenToken } from '../../util/auth/generateCitizenToken';
import { findExistingCitizen } from '../../sql/citizens/findExistingCitizen.sql';

export async function loginCitizenController(req: Request, res: Response) {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.json({
            message: 'email and password required',
            success: false
        }).status(400);
    }

    try {
        const existingCitizen = await findExistingCitizen(email)

        if (!existingCitizen) {
            console.log('citizen not found');

            return res.json({
                message: 'no citizen with that email found',
                success: false
            }).status(404);
        }

        const isPasswordValid = await verifyPwd(password, existingCitizen.pwdHash);

        if (!isPasswordValid) {
            return res.json({
                message: 'invalid password',
                success: false
            }).status(401);
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
        return res.json({
            message: `Something went wrong on our end`,
            success: false
        }).status(500);
    }
}