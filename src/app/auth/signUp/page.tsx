import AuthSignUp from "@/components/signUp/signUp"
import { fetchData } from "@/utils/api"
import fs from 'fs'

const SignUp = async () => {
    const users = await fetchData(`${process.env.BASED_URL}/api/users`)

    return (
        <AuthSignUp users={users}/>
    )
}

export default SignUp