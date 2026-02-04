import {NextRequest, NextResponse} from "next/server";
import mysql from 'mysql2/promise';
export async function GET(req: NextRequest, {params}: { params:Promise<{id: number}>}) {
    const { id } = await params;
    const db = await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'root',
        database: 'next_app',
    })
    const [results]= await db.query(
        `SELECT * FROM test WHERE id=${id}`
    )
    return NextResponse.json({
        status: 200,
        msg: 'ok',
        data: results
    },{ status: 200 })
}
