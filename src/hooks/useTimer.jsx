import { useEffect, useRef, useState } from "react";

function formatTime(time) {
  let minutes = Math.floor(time / 60);
  let seconds = Math.floor(time - minutes * 60);

  if (minutes < 10) minutes = "0" + minutes;
  if (seconds < 10) seconds = "0" + seconds;
  return minutes + ":" + seconds;
}

function UseTimer({ seconds, index }) {
  const [timer, setTimer] = useState(seconds);
  const timerId = useRef();
  const account = JSON.parse(localStorage.getItem("account"));

  useEffect(() => {
    account.forEach((acc) => {
      if (acc.username === JSON.parse(localStorage.getItem("token")).username) {
        acc.timer = timer;
      }
    });
    localStorage.setItem("account", JSON.stringify(account));
  }, [timer]);

  useEffect(() => {
    timerId.current = setInterval(() => {
      setTimer((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(timerId.current);
  }, []);

  useEffect(() => {
    if (timer === 0 || index === 5) {
      clearInterval(timerId.current);
    }
  }, [timer]);
  return <h1 className="text-xl">{formatTime(timer)}</h1>;
}

export default UseTimer;
