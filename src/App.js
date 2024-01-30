import React from "react";
import Header from "./StartScreen/Header";
import StartContent from "./StartScreen/StartContent";
import Loader from "./components/Loader";
import Error from "./components/Error";
import Questions from "./QuestionsList/Questions";
import NextButton from "./components/NextButton";
import Main from "./components/Main";
import Progress from "./components/Progress";
import Timer from "./components/Timer";
import FinishScreen from "./FinishScreen/FinishScreen";
import { useQuiz } from "./contexts/QuizContext";

function App() {
  const { status } = useQuiz();
  console.log(status);
  return (
    <div className="app">
      <Header />
      {status === "loading" && <Loader />}
      {status === "error" && <Error />}
      {status === "active" && <StartContent />}

      <Main>
        {status === "ready" && (
          <>
            <Progress />
            <Questions />
            <footer>
              <Timer />
              <NextButton />
            </footer>
          </>
        )}

        {status === "finished" && (
          <>
            <FinishScreen />
          </>
        )}
      </Main>
    </div>
  );
}

export default App;
