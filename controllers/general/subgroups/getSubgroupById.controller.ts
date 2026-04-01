import type { Request, Response } from 'express';
import { getSubgroupByIdQuery } from '../../../sql/general/subgroups/getSubgroupById.sql';

export async function getSubgroupByIdController(req: Request, res: Response) {
    try {
        const id = String(req.params.id)

        if (!id || id === undefined) {
            return res.status(404).json({
                success: false,
                message: 'subgroup id not provided'
            })
        }
        const returnedSubgroup = await getSubgroupByIdQuery(id)

        return res.status(200).json({
            success: true,
            subgroup: returnedSubgroup
        })
    } catch (error) {
        console.error(error)
        return res.status(500).json({
            success: false,
            message: 'something went wrong'
        })
    }
}