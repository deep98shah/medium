import { useNavigate } from "react-router-dom"
import { Heading } from "../components/Heading"
import { Input } from "../components/Input"
import { BottomWarning } from "../components/BottomWarning"
import { RecoilRoot, useRecoilState } from "recoil"
import { userDetailsAtom } from "../store/atoms/UserDetails"
import { Button } from "../components/Button"
import axios from "axios"

export const Signup = () => {
    return (
        <RecoilRoot>
            <SignupContainer></SignupContainer>
        </RecoilRoot>
    )
}

const SignupContainer = () => {
    const [userDetails, setUserDetails] = useRecoilState(userDetailsAtom)
    const navigate = useNavigate()
    
    return (
        <div className="flex min-h-screen justify-center">
            <div className="flex flex-col justify-center w-1/2 bg-gray-200 px-36">
                <div className="text-black text-2xl font-bold py-2">
                    "The customer service I received was exceptional. The support team went above and beyond to address my concerns."
                </div>
                <div className="text-black text-lg font-bold">
                    Jules Winnfield
                </div>
                <div className="text-gray-500 font-semibold">
                    CEO, Acme Inc
                </div>
            </div>
            <div className="flex flex-col justify-center w-1/2 bg-white px-36">
                <div className="flex justify-center">
                    <div className="min-w-full px-44">
                        <Heading label="Create an account"></Heading>
                        <BottomWarning label="Already have an account" buttonText="Login" to="/signin"></BottomWarning>
                        <Input title={"First name"} onChange={(e) => {
                            setUserDetails({
                            ...userDetails,
                                email: e.target.value
                            })
                        }} placeholder={"Deep"} type={"text"}></Input>
                        <Input title={"Last name"} onChange={(e) => {
                            setUserDetails({
                            ...userDetails,
                                email: e.target.value
                            })
                        }} placeholder={"Shah"} type={"text"}></Input>
                        <Input title={"Email"} onChange={(e) => {
                            setUserDetails({
                            ...userDetails,
                                email: e.target.value
                            })
                        }} placeholder={"deepshah@example.com"} type={"text"}></Input>
                        <Input title={"Password"} onChange={(e) => {
                            setUserDetails({
                            ...userDetails,
                                email: e.target.value
                            })
                        }} type={"password"}></Input>
                        <Button label={"Sign Up"} onClick={async () => {
                            const res = await axios.post('http://localhost:8787/api/v1/users/signup', {
                                firstName: userDetails.firstName,
                                lastName: userDetails.lastName,
                                email: userDetails.email,
                                password: userDetails.password
                            })
                            if (res.status === 200) {
                                const token = res.data.token
                                if (token) {
                                    localStorage.setItem('token', 'Bearer ' + token)
                                    navigate('/blog')
                                }
                            }
                        }}></Button>
                    </div>
                </div>            
            </div>
        </div>
    )
}