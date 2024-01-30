import React from "react";
import { useQuiz } from "../contexts/QuizContext";

function Progress() {
  const { numQuestions, index, answer, points, maxPoints } = useQuiz();
  return (
    <div className="progress">
      <progress max={numQuestions} value={index + Number(answer !== null)} />
      <p>
        Question <strong>{index + 1}</strong> / {numQuestions}
      </p>
      <p>
        {points} / {maxPoints}
      </p>
    </div>
  );
}

export default Progress;
