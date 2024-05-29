import { fetchData } from "@/utils/api"
import AuthLogin from "@/components/login/login"



const Login = async () => {
    const users = await fetchData(`${process.env.BASED_URL}/api/users`)
    return (
        <AuthLogin users={users}/>
       
    )

}

export default Login

