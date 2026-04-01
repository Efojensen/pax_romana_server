import type { Request, Response } from 'express';
import type { Subgroup } from '../../../types/subgroup';
import { updateSubgroupRecord } from '../../../sql/general/subgroups/updateSubgroup.sql';

export async function updateSubgroupController(req: Request, res: Response) {
    try {
        const id = String(req.params.id)

        const updates:Subgroup = req.body;

        const updatedSubgroup = await updateSubgroupRecord(updates, id)

        return res.status(200).json({
            success: true,
            updatedSubgroup,
        })
    } catch (error) {
        console.error(error)
        return res.status(500).json({
            success: false,
            error: 'something went wrong'
        })
    }
}