import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constant";

const Login = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [loginForm, setLoginForm] = useState(true);
  const [error, setError] = useState();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await axios.post(
        BASE_URL + "/login",
        {
          email: email,
          password: password,
        },
        {
          withCredentials: true,
        },
      );
      dispatch(addUser(response.data));
      return navigate("/feed");
    } catch (error) {
      setError(error.response.data);
    }
  };

  const handleSignup = async () => {
    try {
      const response = await axios.post(
        BASE_URL + "/signup",
        {
          email: email,
          password: password,
          firstName: firstName,
          lastName: lastName,
        },
        {
          withCredentials: true,
        },
      );
      console.log(response);
      dispatch(addUser(response.data));
      return navigate("/profile");
    } catch (error) {
      setError(error.response.data);
    }
  };

  return (
    <div className="flex justify-center items-center mt-[10%]">
      <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border  p-4">
        <legend className="fieldset-legend">
          {loginForm ? "Login" : "Signup"}
        </legend>
        {!loginForm && (
          <>
            <label className="label">First Name</label>
            <input
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="input"
              placeholder="First Name"
            />
            <label className="label">Last Name</label>
            <input
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="input"
              placeholder="Last Name"
            />
          </>
        )}
        <label className="label">Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="input"
          placeholder="Email"
        />

        <label className="label">Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="input"
          placeholder="Password"
        />
        <p className="text-red-500"> {error}</p>
        <button
          className="btn btn-neutral mt-4"
          onClick={loginForm ? handleLogin : handleSignup}
        >
          {loginForm ? "Login" : "Signup"}
        </button>
        <button
          className="btn btn-neutral mt-4"
          onClick={() => setLoginForm(!loginForm)}
        >
          {loginForm ? "New here? Signup" : "Already have an account? Login"}
        </button>
      </fieldset>
    </div>
  );
};

export default Login;
