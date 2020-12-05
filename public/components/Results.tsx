import Question from "../model/Question";
import style from './results.module.css';
import Page from "./Page";

const Results = ({
  questions,
  answers,
  onRestart,
}: {
  questions: Question[];
  answers: Record<number, boolean>;
  onRestart: () => void;
}) => {
  const isCorrect = (questionNumber: number) =>
    questions[questionNumber].correct_answer === answers[questionNumber];

  const correctCount = questions.filter((question, questionNumber) =>
    isCorrect(questionNumber)
  ).length;

  return (
    <Page className={style.results} buttons={[{ label: "Play again", onClick: onRestart }]}>
      <h2>
        You scored {correctCount} out of {questions.length}
      </h2>

      {questions.map((question, questionNumber) => (
        <div
          key={questionNumber}
          className={
            style.answer + ' ' + (isCorrect(questionNumber) ? style.correct : style.incorrect)
          }
          dangerouslySetInnerHTML={{ __html: question.question }}
        ></div>
      ))}
    </Page>
  );
};

export default Results;
