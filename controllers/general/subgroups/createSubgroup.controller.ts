import type { Request, Response } from 'express';
import type { Subgroup } from '../../../types/subgroup';
import { createSubgroupRecord } from '../../../sql/general/subgroups/createSubgroup.sql';

export async function createSubgroupController(req: Request, res: Response) {
    try {
        const subgroup:Subgroup = req.body

        const adminID = req.admin?.admin_id

        if (!adminID) {
            return res.status(400).json({
                error: 'admin id is required',
                success: false
            })
        }

        const createdSubgroup = await createSubgroupRecord(subgroup, adminID)

        return res.status(201).json({
            createdSubgroup,
            success: true
        })
    } catch (error) {
        console.error(error)
        return res.status(500).json({
            error: 'something went wrong',
            success: false
        })
    }
}