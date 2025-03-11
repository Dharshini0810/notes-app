import { Link,useNavigate } from "react-router-dom"
import { useEffect } from "react";
import PasswordInput from "../../components/Input/PasswordInput"
import { useDispatch,useSelector } from "react-redux";
import { useState } from "react"
import { validateEmail } from "../../utils/helper";
import Navbar from "../../components/Navbar/Navbar";
import { login } from "../../features/auth/authSlice"


const Login = () => {

    const[email,setEmail] = useState("");
    const[password,setPassword] = useState("");
    const[error,setError] = useState(null)
    const dispatch = useDispatch()
    const { loading, authError, isAuthenticated,user } = useSelector((state) => state.auth);
    const navigate = useNavigate()

    const handleLogin = async (e) =>{
        e.preventDefault();
        if(!validateEmail(email)){
            setError({message : "Please enter the valid email address."})
            return;
        }

        if(!password){
            setError({message : "Please enter the password."})
            return;
        }

        //Login API call
        dispatch(login({email,password}))

        setError("")
    }

    useEffect(() => {
        if (isAuthenticated && user) {
          navigate(`/dashboard`);
        }
      }, [isAuthenticated, user, navigate]);
    
      useEffect(() => {
        if (authError) {
          setError(authError);
        }
        if(!authError){
          setError("")
        }
      }, [authError]);


  return (
    <>
    <Navbar/>
    <div className="flex justify-center items-center mt-20">
        <div className="w-96 border rounded px-7 py-10 bg-white">
            <form onSubmit={handleLogin}>
                <h4 className="text-2xl mb-7">Login</h4>

                <input type="text"
                 value = {email}
                 onChange={(e)=>setEmail(e.target.value)}
                 placeholder="Email" className="input-box"/>

                <PasswordInput value={password} onChange={(e)=>setPassword(e.target.value)}/>

                {error && <p className="text-red-500 text-xs pb-1">{error}</p>}

                <button type="submit" className="btn-primary">{loading? "Loading...": "Login"}</button>
                <p className="text-sm text-center mt-4">
                    Not Registered yet?{" "}
                    <Link to ="/signup" className="font-medium text-primary underline">Create an Account?</Link>
                </p>
            </form>
        </div>
    </div>
    </>
  )
}

export default Login
