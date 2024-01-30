import React from "react";
import { useQuiz } from "../contexts/QuizContext";

function StartContent() {
  const { numQuestions, dispatch } = useQuiz();
  return (
    <div className="start">
      <h2>Welcome to The React Quiz!</h2>
      <h3>{numQuestions} to test your React mastery</h3>
      <button className="btn" onClick={() => dispatch({ type: "ready" })}>
        Let's Start
      </button>
    </div>
  );
}

export default StartContent;
