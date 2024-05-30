import data from '../../../../json_server/json_data/db.json'
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const books = data.books
  const DEFAULT_PAGE_SIZE = 10;
  const DEFAULT_PAGE_NUMBER = 1;
  const { searchParams } = new URL(request.url);
  const page = searchParams.get('_page')
  const startIndex = (Number(page) - 1) * DEFAULT_PAGE_SIZE
  const search: string | null = searchParams.get('_search')?? null

  const handleSearch = ()=>{
    if(search !== null){
      return books.filter((book)=> book.name.toLowerCase().includes(search.toLowerCase()))
    }else{
      return books
    }
  }
  
  
  const paginatedBooks = page && handleSearch().length > 10
  ? [...handleSearch()].splice(startIndex, DEFAULT_PAGE_SIZE) 
  : handleSearch();
  
  const booksData = {
    data: paginatedBooks,
    total:handleSearch().length,
    page: page
  }

  try {
    return NextResponse.json(booksData, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}