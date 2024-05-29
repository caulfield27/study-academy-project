import { IUserItem } from "../auth/auth";
import { IFavCourse } from "./coursesTypes";
import { create } from "zustand";
import { setToStorage } from "@/utils/useLocaleStorage";

interface ICourses{
    favoriteCourses:IFavCourse[],
    courseModal: boolean,
    favCounter: number,
    search: string,
    category: string
}

interface Actions{
    setCourseModal: (payload: boolean) => void,
    getUserCourses: (payload: IFavCourse[] ) => void,
    resetCourses: ()=> void,
    incrementFavCounter: (payload: number)=> void,
    decrementGFavCounter: (payload: number)=> void,
    resetFavCounter:() => void,
    getCounter: (payload: number)=> void,
    setSearch: (payload: string)=> void,
    setCategory: (payload: string)=> void
    
    

}

export const useCourseStore = create<ICourses & Actions>((set)=>({
    favoriteCourses: [],
    courseModal: false,
    favCounter: 0,
    search: '',
    category: '',
    setSearch: (payload)=> set(()=> ({search: payload})),
    setCategory: (payload)=> set(()=> ({category:payload})),
    setCourseModal: (payload)=> set(()=> ({courseModal: payload})),
    getUserCourses: (payload)=> set(()=> ({favoriteCourses: payload})),
    resetCourses: ()=> set(()=> ({favoriteCourses: []})),
    incrementFavCounter: (payload)=> {
        setToStorage('favCourseCounter', payload === null ? 0 : payload)
        set(()=> ({favCounter:payload}))
    },
    decrementGFavCounter: (payload)=> {
        setToStorage('favCourseCounter', payload)
        set(()=> ({favCounter:payload}))
    },
    getCounter: (payload)=> set(()=> ({favCounter: payload})),
    resetFavCounter: ()=> set((state)=> ({favCounter: 0}))

}))

export const setUserFavCourse = (favCourses:IFavCourse[], currentUser:IUserItem[], getUserCourses:Function)=>{
    const  customFav = favCourses ? favCourses.filter(course => course.userToken === currentUser[0].userToken) : []
    getUserCourses(customFav)
}


