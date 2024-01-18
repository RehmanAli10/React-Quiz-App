import React from "react";

function Options({ questions, dispatch, answer }) {
  const isAnswer = answer !== null;
  return (
    <div className="options">
      {questions.options.map((option, index) => (
        <button
          key={option}
          onClick={() => dispatch({ type: "answer", payload: index })}
          className={`btn btn-option ${index === answer ? "answer" : ""} ${
            isAnswer
              ? index === questions.correctOption
                ? "correct"
                : "wrong"
              : ""
          }`}
          disabled={isAnswer}
        >
          {option}
        </button>
      ))}
    </div>
  );
}

export default Options;
