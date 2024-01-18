import React from "react";

function Progress({ numQuestions, index, answer, points, maxPoints }) {
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
