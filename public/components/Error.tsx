import style from "./error.module.css";
import Page from "./Page";

const Error = ({ message }) => {
  return (
    <Page
      buttons={[{ label: "Reload", onClick: () => document.location.reload() }]}
    >
      <h1 className={style.errorH1}>An internal error occurred</h1>
      <p>Sorry. Please try reloading the page.</p>
      <p>Error message: "{message}"</p>
    </Page>
  );
};

export default Error;
