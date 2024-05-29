import data from '../../../../json_server/json_data/db.json'
import { NextResponse } from 'next/server';
 
export async function GET(request: Request) {
    const courses = data.courses
  try {
    return NextResponse.json(courses, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}