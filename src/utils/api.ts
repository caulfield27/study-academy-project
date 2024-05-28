'use server'

import { books } from "@/store/books/booksTypes";
import { revalidatePath } from "next/cache";

export const getApi = async (path:string)=>{
    try{
        const response = await fetch(path, {next: {revalidate:5}});
        const data = await response.json()
        return data
    }catch(e){
        console.log(e);
    }finally{
        console.log('done')
    }
}

export async function postData(path:string, arg:books){
    try{
        const response = await fetch(path, {
            method: 'POST',
            body: JSON.stringify(arg)
        })
        revalidatePath(path)
    }catch(e){
        console.log(e)
    }finally{
        console.log('done: ')
    }

}