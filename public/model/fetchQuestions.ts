import logError from "../log/logError";
import Question from "../model/Question";

const questionCount = 10;

/**
 * This is isomorphic code; it's used for server props as well as on the client when restarting.
 */
function fetchQuestions(): Promise<Question[]> {
  const reallyFetch = window.fetch;

  // TODO: we might want short timeouts on the server side
  return reallyFetch(
    // I removed "difficulty" since it resulted in the same questions over and over
    `https://opentdb.com/api.php?amount=${questionCount}&type=boolean`
  )
    .then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        throw new Error(res.statusText);
      }
    })
    .then((json) =>
      json.results.map(({ correct_answer, category, question }) => ({
        category,
        question,
        correct_answer: correct_answer === "True",
      }))
    );
}

/**
 * Assuming the results of `fn` are stochastic and `fn` is slow, returns a preloading version of the function.
 * Will attempt to maintain a buffer of preloadCount results.
 * If `fn` fails during the preload, there will be a retry.
 */
export function preload<T>(
  fn: () => Promise<T>,
  preloadCount: number
): () => Promise<T> {
  let preloaded: T[] = [];

  function fillBuffer() {
    for (let i = preloadCount - preloaded.length; i > 0; i--) {
      fn().then((res) => preloaded.push(res), logError);
    }
  }

  fillBuffer();

  return async () => {
    try {
      const [first] = preloaded.splice(0, 1);

      return first ? first : fn();
    } finally {
      fillBuffer();
    }
  };
}

const buildFetchQuestions = (preloadCount: number) =>
  preload(fetchQuestions, preloadCount);

export default buildFetchQuestions;
