'use server'

import { revalidatePath } from "next/cache";


export async function fetchData(api:string){
    try{
        const response = await fetch(api , {next: {revalidate: 5}});
        const data = await response.json()
        return data
    }catch(e){
        console.log(`error: ${e}`);
    }
}

export async function postData<T>(api:string, arg:T){
    try{
        const response = await fetch(api, {
            method: 'POST',
            body: JSON.stringify(arg)
        })
        revalidatePath(api)
    }catch(e){
        console.log(e)
    }

}