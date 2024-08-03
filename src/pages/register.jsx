import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

function RegisterPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const account = JSON.parse(localStorage.getItem("account") || "[]");

  function handleRegister(e) {
    e.preventDefault();
    const isExist = account.some((acc) => acc.username === username);
    if (isExist) {
      alert("Username already exists");
    } else {
      alert("Register success");
      account.push({
        username,
        password,
        value: 0,
        total: 0,
        index: 0,
        timer: 60,
      });
      localStorage.setItem("account", JSON.stringify(account));
      navigate("/login");
    }
  }
  return (
    <>
      <div className="h-[100dvh] sm:w-[500px] flex flex-col justify-center p-5">
        <h1 className="text-5xl mb-8 font-bold">REGISTER</h1>
        <form onSubmit={handleRegister}>
          <label htmlFor="username" className="font-semibold">
            Register with username
          </label>
          <input
            type="text"
            id="username"
            required
            className="w-[95%] rounded-md py-3 pl-3 ml-1 my-3 bg-blue-900 placeholder:text-white focus:outline-none"
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Your username here"
          />
          <label htmlFor="password" className="font-semibold">
            Type your password
          </label>
          <input
            type="password"
            id="password"
            required
            className="w-[95%] rounded-md py-3 pl-3 ml-1 my-3 bg-blue-900 placeholder:text-white focus:outline-none"
            placeholder="Your password here"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="font-semibold w-[95%] rounded-2xl p-3 ml-1 bg-gradient-to-r from-blue-800 to-blue-700 hover:opacity-80 my-2">
            Register
          </button>
          <p className="my-2 font-semibold">
            Already have an account? {""}
            <Link to={"/login"} className="italic hover:underline">
              Login
            </Link>
          </p>
        </form>
      </div>
    </>
  );
}
export default RegisterPage;
