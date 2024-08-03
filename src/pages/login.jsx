import { Link, useNavigate } from "react-router-dom";
import { useRef } from "react";

function LoginPage() {
  const usernameRef = useRef();
  const passwordRef = useRef();
  const navigate = useNavigate();
  const isExist = JSON.parse(localStorage.getItem("account"));
  const handleLogin = (e) => {
    e.preventDefault();
    isExist.forEach((acc) => {
      if (
        acc.username === usernameRef.current.value &&
        acc.password === passwordRef.current.value
      ) {
        const newToken = { username: acc.username };
        localStorage.setItem("token", JSON.stringify(newToken));
        navigate("/");
      }
    });
  };
  return (
    <>
      <div className=" h-[100dvh] sm:w-[500px] flex flex-col justify-center p-5">
        <h1 className="text-5xl mb-8 font-bold">LOGIN</h1>
        <form onSubmit={handleLogin}>
          <label htmlFor="username" className="font-semibold">
            Login with username
          </label>
          <input
            type="text"
            name="username"
            id="username"
            ref={usernameRef}
            required
            className="w-[95%] rounded-md py-3 pl-3 ml-1 my-3 bg-blue-900 placeholder:text-white focus:outline-none"
            placeholder="Your username here"
          />
          <label htmlFor="password" className="font-semibold">
            Type your password
          </label>
          <input
            type="password"
            name="password"
            id="password"
            ref={passwordRef}
            required
            className="w-[95%] rounded-md py-3 pl-3 ml-1 my-3 bg-blue-900 placeholder:text-white focus:outline-none"
            placeholder="Your password here"
          />
          <button className="font-semibold w-[95%] rounded-2xl p-3 ml-1 bg-gradient-to-r from-blue-800 to-blue-700 hover:opacity-80 my-2">
            Login
          </button>
          <p className="my-2 font-semibold">
            Don't have an account? {""}
            <Link to={"/register"} className="italic hover:underline">
              Register
            </Link>
          </p>
        </form>
      </div>
    </>
  );
}
export default LoginPage;
