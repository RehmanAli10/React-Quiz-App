import { createContext, useContext, useEffect, useReducer } from "react";

const QuizContext = createContext();

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

function QuizProvider({ children }) {
  const [
    { status, questions, index, answer, points, remainingTime, highScore },
    dispatch,
  ] = useReducer(reducer, initialState);

  const numQuestions = questions.length;

  const maxPoints = questions.reduce(
    (acc, currQues) => acc + currQues.points,
    0
  );

  useEffect(function () {
    async function fetchingQuestions() {
      try {
        dispatch({ type: "loading" });

        const request = await fetch("http://localhost:8000/questions");

        if (!request.ok) throw new Error("Something went wrong!😨");

        const data = await request.json();
        console.log(data);

        dispatch({ type: "dataRetrived", payload: data });
      } catch (err) {
        dispatch({ type: "error" });
      }
    }

    fetchingQuestions();
  }, []);

  return (
    <QuizContext.Provider
      value={{
        status,
        questions,
        index,
        answer,
        points,
        remainingTime,
        highScore,
        numQuestions,
        maxPoints,
        dispatch,
      }}
    >
      {children}
    </QuizContext.Provider>
  );
}

function useQuiz() {
  const context = useContext(QuizContext);
  if (context === undefined)
    throw new Error("QuizContext was used outside of the QuizProvider");

  return context;
}

export { QuizProvider, useQuiz };
