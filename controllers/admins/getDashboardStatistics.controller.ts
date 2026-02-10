import type { Request, Response } from 'express'
import getDashboardStatisticsQuery from '../../sql/admins/getDashboardStatistics.sql'

export async function getDashboardStatistics(req: Request, res: Response) {
    try {
        const registrationStatistics = await getDashboardStatisticsQuery();

        return res.status(200)
            .send({
                message: "Registration statistics retrieved successfully",
                success: true,
                registration_data: registrationStatistics
            });

    } catch (error) {
        console.error(error);
        res.status(500)
            .send({
                message: "Internal server error. Please check your inputs and try again",
                success: false
            });
    }
}