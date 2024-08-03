import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function getData() {
  const token = JSON.parse(localStorage.getItem("token"));
  const navigate = useNavigate();
  useEffect(() => {
    if (token) {
      const dataQuiz = JSON.parse(
        localStorage.getItem(`${token.username}`) || "[]"
      );
      if (dataQuiz.length === 0) {
        try {
          fetch(
            "https://opentdb.com/api.php?amount=5&difficulty=easy&type=boolean"
          )
            .then((response) => response.json())
            .then((data) => {
              dataQuiz.push(...data.results);
              localStorage.setItem(
                `${token.username}`,
                JSON.stringify(dataQuiz)
              );
            });
        } catch (error) {
          console.log(error);
        }
      }
    } else {
      navigate("/login");
    }
  }, []);
}

export default getData;
