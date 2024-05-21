import QuestSidebar from "./questSidebar/questSidebar";
import LogedSidebar from "./userSIdebar/userSidebar";
import { useEffect, useState } from "react";
import useAuth from "@/store/auth/auth";


const Sidebar = () => {
    const {isAuth, checkIsAuth, setCurrentUser} = useAuth((state)=> state)

    useEffect(()=>{
        const logedUSer = localStorage.getItem('loggedInUser')
        if(logedUSer){
            checkIsAuth(Boolean(logedUSer))
            setCurrentUser(JSON.parse(logedUSer))
        }
        
        
        
    },[isAuth])


    return ( 
        isAuth ? <LogedSidebar/> : <QuestSidebar/>
    );
}
 
export default Sidebar;