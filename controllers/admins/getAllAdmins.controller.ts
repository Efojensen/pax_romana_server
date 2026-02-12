import type { Request, Response } from 'express'
import getAllAdminsQuery from "../../sql/admins/getAllAdmins"

export async function getAllAdminsController(req: Request, res: Response) {
    try {
        const admins = await getAllAdminsQuery()

        if (!admins) {
            res.status(500).json({
                msg: 'sth went wrong',
                success: false
            })
            console.error('admins is undefined')
            return
        }

        if (admins && !admins.length) {
            console.log('No admins found');

            return res.json({
                message: "No admins found",
                success: true
            });
        };

        res.status(200).json({
                message: "Admins found",
                admins: admins,
                success: true
            });
    } catch (error) {
        console.error(error);
        res.status(500).json({
                message: "Internal Server error. Please check your inputs and try again",
                success: false
            })
    }
}