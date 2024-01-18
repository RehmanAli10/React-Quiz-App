import React from "react";
import Options from "./Options";

function Questions({ questions, dispatch, answer, numQuestions, index }) {
  console.log("Questions component", questions);

  return (
    <div className="options">
      <h3>{questions.question}</h3>
      <Options questions={questions} dispatch={dispatch} answer={answer} />
    </div>
  );
}

export default Questions;
