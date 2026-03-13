import pg from "pg";

// const pool = new pg.Pool({
//     user: process.env['SUPABASE_DB_USER'],
//     host: process.env['SUPABASE_DB_HOST'],
//     database: process.env['SUPABASE_DB_NAME'],
//     password: process.env['SUPABASE_DB_PASSWORD'],
//     port: parseInt(process.env['SUPABASE_DB_PORT']!),
//     // connectionString: process.env['']!
//     ssl: { rejectUnauthorized: false}
// })

const pool = new pg.Pool({
    user: process.env['DB_USER'],
    host: process.env['DB_HOST'],
    database: process.env['DB_NAME'],
    password: process.env['DB_PASSWORD'],
    port: parseInt(process.env['DB_PORT']!),
    // connectionString: process.env['']!
    ssl: { rejectUnauthorized: false}
})

export default pool;