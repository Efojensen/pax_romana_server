import type { Request, Response } from 'express';
import { getSubgroups } from '../../../sql/general/subgroups/getSubgroups.sql';

export async function getSubgroupsController(req: Request, res: Response) {
    try {
        const subgroups = await getSubgroups()

        return res.status(200).json({
            success: true,
            subgroups
        })
    } catch (error) {
        console.error(error)
        return res.status(500).json({
            success: false,
            msg: 'something went wrong'
        })
    }
}