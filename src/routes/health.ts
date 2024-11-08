import pool from '../util/db'

const health_check = async (req: Request, res: any) => {
    try {
        const result = await pool.query('SELECT NOW()');
        res.json({ status: 'ok', timestamp: result.rows[0].now });
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: 'error', message: 'Database connection failed' });
    }
}

export default health_check;