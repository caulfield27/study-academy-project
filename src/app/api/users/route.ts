import data from '../../../../db.json'
import { NextResponse } from 'next/server';
import fs from 'fs'
import path from 'path';

const dbPath = path.join(process.cwd(), 'db.json')
 
export async function GET(request: Request) {
    const users = data.users
  try {
    return NextResponse.json(users, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}

export async function POST(request: Request){
  const newUser = await request.json()
  const data = fs.readFileSync(dbPath, 'utf-8')
  const parsedData = JSON.parse(data)
  parsedData.users.push(newUser)
  fs.writeFileSync(dbPath, JSON.stringify(parsedData,null,2))

  try{
    NextResponse.json(newUser, {status: 201})
  }catch(error){
    NextResponse.json(error, {status: 500})
  }
}