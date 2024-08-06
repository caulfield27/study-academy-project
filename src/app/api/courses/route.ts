import data from '../../../../db.json'
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const courses = data.courses
  const { searchParams } = new URL(request.url)
  const search = searchParams.get('_search')
  const sort = searchParams.get('_sort')
  const sortedCourses = sort ? courses.filter((course)=> 
    course.category.toLowerCase() === sort.toLowerCase() ) : courses
  const filteredCourses = search ? sortedCourses.filter((course) => 
    course.name.toLowerCase().includes(search.toLowerCase())) : sortedCourses
  try {
    return NextResponse.json(filteredCourses, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}