import { useState, useEffect } from "preact/hooks";
import { default as buildFetchQuestions } from "../model/fetchQuestions";
import Question from "../model/Question";
import AskQuestion from "./AskQuestion";
import Results from "./Results";
import Welcome from "./Welcome";
import Error from "./Error";

const preloadCount = 1;
const fetchQuestions =
  typeof window !== "undefined"
    ? buildFetchQuestions(preloadCount)
    : async () => [];

/**
 * Full application logic except for displaying error messages.
 */
export default function Application({
  onError,
}: {
  onError: (e: Error) => void;
}) {
  const [questions, setQuestions] = useState<Question[]>(null);
  const [answers, setAnswers] = useState<Record<number, boolean>>({});
  const [isStarted, setStarted] = useState(false);

  useEffect(() => {
    fetchQuestions().then(setQuestions, onError);
  }, []);

  const onAnswer = (answer: boolean) => {
    setAnswers({ ...answers, [questionNumber]: answer });
  };

  const questionNumber =
    questions && questions.findIndex((_, index) => answers[index] == undefined);

  const onStart = () => setStarted(true);
  const onRestart = () => {
    fetchQuestions()
      .then((questions) => {
        setQuestions(questions);
        setAnswers({});
      })
      .catch(onError);
  };

  return !isStarted ? (
    <Welcome onStart={onStart} />
  ) : questions == null ? (
    <Error message="Loading questions..." />
  ) : questionNumber >= 0 ? (
    <AskQuestion
      question={questions[questionNumber]}
      questionNumber={questionNumber}
      questionCount={questions.length}
      onAnswer={onAnswer}
    />
  ) : (
    <Results questions={questions} answers={answers} onRestart={onRestart} />
  );
}
