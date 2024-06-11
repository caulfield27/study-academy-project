import QuestSidebar from "./questSidebar/questSidebar";
import LogedSidebar from "./userSIdebar/userSidebar";
import { useEffect, useState } from "react";
import useAuth from "@/store/auth/auth";
import { getFromStorage } from "@/utils/useLocaleStorage";


const Sidebar = () => {
    const {isAuth, checkIsAuth, setCurrentUser} = useAuth((state)=> state)

    useEffect(()=>{
        const logedUSer = getFromStorage('loggedInUser')
        checkIsAuth(Boolean(logedUSer))
        setCurrentUser(logedUSer)
    },[isAuth])


    return ( 
        isAuth ? <LogedSidebar/> : <QuestSidebar/>
    );
}
 
export default Sidebar;