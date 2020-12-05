import style from "./ask-question.module.css";
import Page from "./Page";

const AskQuestion = ({ question, questionNumber, questionCount, onAnswer }) => {
  return (
    <Page
      className={style.askQuestion}
      buttons={[
        { label: "True", onClick: () => onAnswer(true) },
        { label: "False", onClick: () => onAnswer(false) },
      ]}
    >
      <h4>{question.category}</h4>
      <h2 dangerouslySetInnerHTML={{ __html: question.question }}></h2>
      <div className="number">
        {questionNumber + 1} / {questionCount}
      </div>
    </Page>
  );
};

export default AskQuestion;
