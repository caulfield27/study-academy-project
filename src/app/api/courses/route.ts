import data from '../../../../json_server/json_data/db.json'
import { NextResponse } from 'next/server';
 
export async function GET(request: Request) {
    const courses = data.courses
    const {searchParams} = new URL(request.url)
    const search = searchParams.get('_search')
    const filteredCourses = search ? 
          courses.filter((course)=> course.name.toLowerCase().includes(search.toLowerCase()))
          : courses 
    console.log(search)

  try {
    return NextResponse.json(filteredCourses, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}