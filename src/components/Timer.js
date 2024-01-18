import React, { useEffect } from "react";

function Timer({ dispatch, remainingTime }) {
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
