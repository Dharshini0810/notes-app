import { useState,useEffect } from "react";
import { useDispatch , useSelector } from "react-redux";
import PasswordInput from "../../components/Input/PasswordInput";
import { Link,useNavigate } from "react-router-dom";
import { validateEmail } from "../../utils/helper";
import Navbar from "../../components/Navbar/Navbar";
import { signup } from "../../features/auth/signUpSlice";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const dispatch = useDispatch()
  const {loading,signupError,success} = useSelector((state) => state.signup)
  const navigate = useNavigate()

  const handleSignUp = async (e) => {
    e.preventDefault();

    if(!name){
        setError("Please enter the name.")
        return;
    }

    if(!validateEmail(email)){
        setError("Please enter the valid email address");
        return;
    }

    if(!password){
        setError("Please enter the password");
        return;
    }
    dispatch(signup({name,email,password}))

    setError("");

    //SignUp API call
  };

  useEffect(() => {
    if (signupError) {
      setError(signupError);
    }
    if(!signupError){
      setError("")
    }
    if (success) {
      navigate("/login");
    }
  }, [signupError, success, navigate]);
  return (
    <>
    <Navbar/>
    <div className="flex justify-center items-center mt-20">
      <div className="w-96 border rounded px-7 py-10 bg-white">
        <form onSubmit={handleSignUp}>
          <h4 className="text-2xl mb-7">SignUp</h4>

          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Name"
            className="input-box"
          />

          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className="input-box"
          />

          <PasswordInput
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {error && <p className="text-red-500 text-xs pb-1">{error}</p>}

          <button type="submit" className="btn-primary">
            {loading ? "Loading..." : "Create Account"}
          </button>
          <p className="text-sm text-center mt-4">
            Already have an account?{" "}
            <Link to="/login" className="font-medium text-primary underline">
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
    </>
  );
};

export default Signup;
