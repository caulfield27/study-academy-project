'use server'

import { books } from "@/store/books/booksTypes";
import { revalidatePath } from "next/cache";
import axios from "axios";
import { cache } from "react";


export const instanceFirst = axios.create({baseURL:process.env.BASE_URL_FIRST})
export const instanceSecond = axios.create({baseURL: process.env.BASE_URL_SECOND})


export const getBooks = cache(async(page:string)=>{
    try{
        const res = await instanceFirst.get(`/books?_page=${page}`)
        return res.data
    }catch(e){
        console.log(e);
        
    }
})

export const getCourses = cache(async(path:string)=>{
    try{
        const res = await instanceSecond.get(path)
        return res.data
    }catch(e){
        console.log(e);
        
    }
})

export const getUsers = cache(async(path:string)=>{
    try{
        const res = await instanceFirst.get(path)
        return res.data
    }catch(e){
        console.log(e);
        
    }
})

// export const getApi = async (path:string)=>{
//     try{
//         const response = await fetch(path, {next: {revalidate:5}});
//         const data = await response.json()
//         return data
//     }catch(e){
//         console.log(e);
//     }finally{
//         console.log('done')
//     }
// }

export async function postData(path:string, arg:books){
    try{
        const response = await instanceFirst.post(path, {arg})
        revalidatePath(path)
    }catch(e){
        console.log(e)
    }finally{
        console.log('done: ')
    }

}