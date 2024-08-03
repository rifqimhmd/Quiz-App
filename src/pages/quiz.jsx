import { useState } from "react";
import { useNavigate } from "react-router-dom";
import UseTimer from "../hooks/useTimer";
import { ClockIcon, ArrowLeftCircleIcon } from "@heroicons/react/24/solid";

function QuizPage() {
  const navigate = useNavigate();
  const account = JSON.parse(localStorage.getItem("account"));
  const dataQuiz = JSON.parse(
    localStorage.getItem(
      `${JSON.parse(localStorage.getItem("token")).username}`
    )
  );
  let accIndex, accValue, accTimer, accTotal;

  account.forEach((acc) => {
    if (acc.username === JSON.parse(localStorage.getItem("token")).username) {
      accIndex = acc.index;
      accValue = acc.value;
      accTimer = acc.timer;
      accTotal = acc.total;
    }
  });

  const [index, setIndex] = useState(accIndex ? accIndex : 0);
  const [value, setValue] = useState(accValue);
  const [timer, setTimer] = useState(accTimer ? accTimer : 60);
  const [totalAnswer, setTotalAnswer] = useState(0);

  function handleQuiz(answer) {
    if (answer === dataQuiz[index].correct_answer) {
      setValue(value + 20);
    }
    setIndex(index + 1);
    setTotalAnswer(totalAnswer + 1);
    account.forEach((acc) => {
      if (acc.username === JSON.parse(localStorage.getItem("token")).username) {
        acc.value = value + 20;
        acc.index = index + 1;
        acc.total = totalAnswer + 1;
      }
    });
    localStorage.setItem("account", JSON.stringify(account));
  }

  function handleBack() {
    localStorage.removeItem(
      `${JSON.parse(localStorage.getItem("token")).username}`
    );
    account.forEach((acc) => {
      if (acc.username === JSON.parse(localStorage.getItem("token")).username) {
        acc.value = 0;
        acc.index = 0;
        acc.timer = 60;
        acc.total = 0;
      }
    });
    localStorage.setItem("account", JSON.stringify(account));
    navigate("/");
  }

  setInterval(() => {
    setIndex(5);
  }, timer * 1000);

  return (
    <>
      <div className="h-[100dvh] w-[100dvw] sm:w-[70dvw] flex flex-col p-10 gap-10 ">
        <section className="flex justify-between">
          <p className="text-5xl">
            {accTotal}/{dataQuiz.length}
          </p>
          <div className=" flex flex-col items-center">
            <ClockIcon className="size-14" />
            <UseTimer seconds={timer} index={index} />
          </div>
        </section>
        <div>
          {index < dataQuiz.length ? (
            <section className="sm:text-4xl text-2xl text-justify">
              <h1 className="mb-5">
                {index + 1}. {dataQuiz[index].question}
              </h1>
              <button
                className="font-semibold w-full rounded-xl py-2 sm:py-3 bg-blue-500 hover:bg-blue-600 sm:my-8 my-3"
                onClick={() => handleQuiz("True")}
              >
                True
              </button>
              <button
                className="font-semibold w-full rounded-xl py-2 sm:py-3 bg-red-500 hover:bg-red-600 my-3 sm:my-8"
                onClick={() => handleQuiz("False")}
              >
                False
              </button>
            </section>
          ) : (
            <section className="flex flex-col items-center justify-around h-[60dvh]">
              <div>
                <h1 className="text-5xl mb-2">Your Score {value}</h1>
                <p className="text-3xl text-center">Correct : {value / 20}</p>
                <p className="text-3xl text-center">Wrong : {5 - value / 20}</p>
                <p className="text-3xl text-center">Answered : {accTotal}</p>
              </div>

              <button
                className=" rounded-md hover:opacity-80"
                onClick={handleBack}
              >
                <ArrowLeftCircleIcon className="size-16 text-red-700" />
              </button>
            </section>
          )}
        </div>
      </div>
    </>
  );
}
export default QuizPage;
