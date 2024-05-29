import data from '../../../../json_server/json_data/db.json'
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const books = data.books

  const DEFAULT_PAGE_SIZE = 10;
  const DEFAULT_PAGE_NUMBER = 1;
  const { searchParams } = new URL(request.url);
  const page = searchParams.get('_page') || DEFAULT_PAGE_NUMBER
  const startIndex = (Number(page) - 1) * DEFAULT_PAGE_SIZE
  const paginatedBooks = [...books].splice(startIndex, DEFAULT_PAGE_SIZE);
  const totalItems = books.length;
  console.log(paginatedBooks);
  console.log(page);
  
  
  const booksData = {
    data: paginatedBooks,
    total: totalItems,
    page: page
  }

  try {
    return NextResponse.json(booksData, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}