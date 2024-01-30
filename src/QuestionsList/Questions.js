import React from "react";
import Options from "./Options";
import { useQuiz } from "../contexts/QuizContext";

function Questions() {
  const { questions, index, dispatch, answer } = useQuiz();
  return (
    <div className="options">
      <h3>{questions[index].question}</h3>
      <Options
        questions={questions[index]}
        dispatch={dispatch}
        answer={answer}
      />
    </div>
  );
}

export default Questions;
