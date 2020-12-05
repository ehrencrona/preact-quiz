import { useState } from "preact/hooks";
import Application from "./components/Application";
import Error from "./components/Error";
import style from "./app.module.css";

export default function App() {
  const [error, setError] = useState<string>(null);

  return (
    <div className={style.container}>
      {!error ? (
        <Application
          onError={(e) => setError(e.message)}
        />
      ) : (
        <Error message={error} />
      )}
    </div>
  );
}
