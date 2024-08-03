import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function useLogin() {
  const navigate = useNavigate();
  const [username, setUserName] = useState("");
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    } else {
      setUserName(JSON.parse(token).username);
    }
  }, []);
  return username;
}

export default useLogin;
