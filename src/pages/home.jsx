import { useNavigate } from "react-router-dom";
import useLogin from "../hooks/useLogin";
import { PowerIcon } from "@heroicons/react/24/solid";
import getData from "../services/data.services";

function HomePage() {
  const username = useLogin();
  getData();
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="h-[100dvh]  w-[100dvw] sm:w-[70dvw] flex flex-col p-10">
      <section className="flex justify-end">
        <button
          className="bg-red-700 p-1 rounded-full hover:opacity-80"
          onClick={handleLogout}
        >
          <PowerIcon className="size-14 text-white" />
        </button>
      </section>
      <section>
        <p className="text-3xl sm:text-4xl mb-8 font-bold italic">
          Welcome to Quiz App
        </p>
      </section>
      <section className="text-justify p-5 border border-white bg-blue-950 mb-8 text-lg">
        <p>
          Hello {username}, The quiz consists of 5 questions, with true/false
          options and a 60-second turnaround time.
        </p>
        <p>Please click the button below, to start working on the quiz.</p>
      </section>
      <button
        className="font-semibold w-[95%] rounded-2xl py-2 sm:py-3 ml-1 bg-gradient-to-r from-blue-800 to-blue-700 hover:opacity-80 my-2"
        onClick={() => navigate("/quiz")}
      >
        Start Quiz
      </button>
    </div>
  );
}
export default HomePage;
