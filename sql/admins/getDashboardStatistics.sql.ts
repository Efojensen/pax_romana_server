import pool from '../../config/db';

const getDashboardStatisticsQuery = async () => {
    try {
        const query =
            `SELECT COUNT(*) AS total_members, COUNT(CASE WHEN DATE(registered_at ) = current_date THEN 1 END) AS members_registered_today,
                (SELECT COUNT(*) FROM subgroup) AS total_subgroups,
                (SELECT COUNT(*) FROM subgroup_membership) AS total_subgroup_memberships
                FROM member;`;

        const response = await pool.query(query, []);

        console.log("Dashboard statistics retrieved successfully", response.rows[0]);

        return response.rows[0];

    } catch (error) {
        console.error("Error retrieving statistics (SQL): ", error);
        throw error;
    }
}

export default getDashboardStatisticsQuery