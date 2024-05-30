import data from '../../../../json_server/json_data/db.json'
import { NextResponse } from 'next/server';
import path from 'path';
import fs from 'fs';

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

export async function POST(request: Request) {
  const books = data.books;

  try {
    const newBook = await request.json();

    if (!newBook.name || !newBook.author) {
      return NextResponse.json({ error: 'Invalid book data' }, { status: 400 });
    }

    books.push(newBook);

    const filePath = path.resolve(__dirname, '../../../../json_server/json_data/db.json');
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));

    return NextResponse.json({ message: 'Book added successfully', book: newBook }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to add book' }, { status: 500 });
  }
}