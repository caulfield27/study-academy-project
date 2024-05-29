import { fetchData } from "@/utils/api"
import AuthLogin from "@/components/login/login"



const Login = async () => {
    if(!process.env.BASED_URl){
        <h1>oops, something goes wrong</h1>
    }
    
    const users = await fetchData(`${process.env.BASED_URL}/api/users`)
    console.log(users)
    return (
        <AuthLogin users={users}/>
       
    )

}

export default Login

