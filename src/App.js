import React, { useEffect, useReducer } from "react";
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

const secPerQuestion = 30;

const initialState = {
  questions: [],
  status: "loading",
  index: 0,
  answer: null,
  points: 0,
  remainingTime: null,
  highScore: 0,
};

function reducer(state, action) {
  switch (action.type) {
    case "loading":
      return { ...state };
    case "error":
      return { ...state, status: "error" };
    case "dataRetrived":
      return { ...state, questions: action.payload, status: "active" };
    case "ready":
      return {
        ...state,
        status: "ready",
        remainingTime: state.questions.length * secPerQuestion,
      };
    case "answer":
      const question = state.questions.at(state.index);
      return {
        ...state,
        answer: action.payload,
        points:
          action.payload === question.correctOption
            ? state.points + question.points
            : state.points,
      };
    case "nextQuestion":
      return {
        ...state,
        index: state.index + 1,
        answer: null,
      };
    case "timer":
      return {
        ...state,
        remainingTime: state.remainingTime - 1,
        status: state.remainingTime === 0 ? "finished" : state.status,
      };
    case "finished":
      return {
        ...state,
        status: "finished",
        highScore:
          state.points > state.highScore ? state.points : state.highScore,
      };
    case "restart":
      return {
        ...initialState,
        questions: state.questions,
        highScore: state.highScore,
        status: "active",
      };
    default:
      throw new Error("something wrong with actions");
  }
}

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  // Destructuring initialState
  const { status, questions, index, answer, points, remainingTime, highScore } =
    state; //         {

  const numQuestions = questions.length;

  const maxPoints = questions.reduce(
    (acc, currQues) => acc + currQues.points,
    0
  );

  useEffect(function () {
    async function fetchinQuestions() {
      try {
        dispatch({ type: "loading" });
        const request = await fetch("http://localhost:8000/questions");
        if (!request.ok) throw new Error("Something went wrong!😨");
        const data = await request.json();
        dispatch({ type: "dataRetrived", payload: data });
      } catch (err) {
        dispatch({ type: "error" });
      }
    }

    fetchinQuestions();
  }, []);

  return (
    <div className="app">
      <Header />
      {status === "loading" && <Loader />}
      {status === "error" && <Error />}
      {status === "active" && (
        <StartContent numQuestions={numQuestions} dispatch={dispatch} />
      )}

      <Main>
        {status === "ready" && (
          <>
            <Progress
              numQuestions={numQuestions}
              index={index}
              answer={answer}
              points={points}
              maxPoints={maxPoints}
            />
            <Questions
              questions={questions[index]}
              dispatch={dispatch}
              answer={answer}
            />
            <footer>
              <Timer dispatch={dispatch} remainingTime={remainingTime} />
              <NextButton
                dispatch={dispatch}
                answer={answer}
                numQuestions={numQuestions}
                index={index}
              />
            </footer>
          </>
        )}

        {status === "finished" && (
          <>
            <FinishScreen
              points={points}
              maxPoints={maxPoints}
              highScore={highScore}
              dispatch={dispatch}
            />
          </>
        )}
      </Main>
    </div>
  );
}

export default App;
