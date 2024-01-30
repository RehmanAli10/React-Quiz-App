import React, { useEffect } from "react";
import { useQuiz } from "../contexts/QuizContext";

function Timer() {
  const { dispatch, remainingTime } = useQuiz();
  const mins = Math.floor(remainingTime / 60);
  const secs = remainingTime % 60;
  useEffect(
    function () {
      const id = setInterval(function () {
        dispatch({ type: "timer" });
      }, 1000);

      return () => clearInterval(id);
    },
    [dispatch]
  );

  return (
    <div className="timer">
      {mins < 10 ? "0" + mins : mins}: {secs < 10 ? "0" + secs : secs}
    </div>
  );
}

export default Timer;
