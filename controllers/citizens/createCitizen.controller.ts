import type { Request, Response } from 'express';
import { hashPassword } from '../../security/hashPwd';
import type { CitizenType } from '../../types/citizen';
import { findExistingCitizen } from '../../sql/citizens/findExistingCitizen.sql';
import { createCitizenRecord } from '../../sql/citizens/createCitizenRecord.sql';

export async function createCitizenController(req: Request, res: Response) {
    try {
        const {
            name,
            email,
            level,
            hostel,
            gender,
            program,
            password,
            birthDate,
            phoneNumber,
        } = req.body

        const { emailExists } = await findExistingCitizen(email)

        if (emailExists.length) {
            return res.status(409).json({
                message: 'citizen with this email already exists',
                success: false
            })
        }

        const pwdHash = await hashPassword(password)

        const citizenData: CitizenType = {
            name,
            email,
            level,
            hostel,
            gender,
            program,
            pwdHash,
            birthDate,
            phoneNumber
        }

        const response = await createCitizenRecord(citizenData)

        return res.status(201).json({
            message: 'citizen created successfully',
            citizen: response,
            success: true
        })
    } catch (e) {
        res.status(500).json({
            message: 'internal server error',
            error: e,
            success: false,
        })
    }
}