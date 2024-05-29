import { setToStorage } from "@/utils/useLocaleStorage";
import Swal from "sweetalert2";
import { create } from "zustand";

export interface IUserItem {
    userName: string,
    userEmail: string,
    userPassword: string,
    userToken: string,
}

export interface IAuth {
    isAuth: boolean,
    currentUser: IUserItem[],
}

type Actions = {
    setAuth: (payload: boolean) => void,
    setCurrentUser: (payload: IUserItem[]) => void,
    checkIsAuth: (payload: boolean) => void,
    logOut: () => void


}


const useAuth = create<IAuth & Actions>((set) => ({
    isAuth: false,
    currentUser: [],
    setAuth: (payload) => set(() => ({ isAuth: payload })),
    setCurrentUser: (payload) => set(() => ({ currentUser: payload })),
    logOut: () => set(() => ({ isAuth: false, currentUser: [] })),
    checkIsAuth: (payload) => set(() => ({ isAuth: payload }))

}))

export default useAuth

export const handleLogin = (email: string, password: string,
    navigate: any, users: IUserItem[], setAuth: Function, setCurrentUser: Function) => {
    console.log(users);

    // const loggedInUser = users === undefined ? [] : users.filter((user:IUserItem)=>{
    //     return user.userEmail === email && user.userPassword === password
    // }) 
    let loggedInUser: IUserItem[] = []
    if (users) {
        users.forEach((user) => {
            if (user.userEmail === email && user.userPassword === password) {
                loggedInUser.push(user)
            }
        })
    }

    if (loggedInUser.length > 0) {
        setAuth(true)
        setCurrentUser(loggedInUser)
        setToStorage('loggedInUser', loggedInUser)
        navigate.push('/')
        Swal.fire({
            title: "Loged in successful",
            text: 'welcome to Humo Academy',
            icon: "success"

        })
    } else {
        Swal.fire({
            title: 'Login error!',
            text: "This account doesn't exist",
            icon: 'error',
            confirmButtonText: 'try again'
        })
    }
};




export const handleSignup = (email: string, fullName: string, password: string,
    navigate: any, users: IUserItem[]) => {
    const existingUser = users.find((user: IUserItem) => user.userEmail === email);


    if (existingUser) {
        Swal.fire({
            title: 'Sign up error',
            text: 'User with this email already exist',
            icon: 'error',
            confirmButtonText: 'try again'
        })
    } else {
        const signedUser: IUserItem = {
            userEmail: email,
            userName: fullName,
            userPassword: password,
            userToken: `token!*${email}${password}`,
        }
        // try {
        //     fetch('http://localhost:3001/users', {
        //         method: 'POST',
        //         body: JSON.stringify(signedUser)
        //     })
        // } catch (e) {
        //     console.log(e)
        // } finally {
        //     navigate.push('/auth/login')
        //     Swal.fire({
        //         title: 'Signed up successfull',
        //         text: 'login with your email',
        //         icon: 'success',
        //     confirmButtonText: 'ok'
        // })
        // }
    }


}




