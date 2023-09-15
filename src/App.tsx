import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { loadSentencesFromLocalStorage } from "@app/sentence/sentenceSlice";
import SentenceForm from "./sentence/SentenceForm";
import { RootState } from "./app/store";
import { useAppSelector } from "@app/hooks";

function App() {
  const dispatch = useDispatch();
  const sentences = useAppSelector(
    (state: RootState) => state.sentences.sentences,
  );

  useEffect(() => {
    dispatch(loadSentencesFromLocalStorage());
  }, [dispatch]);

  return (
    <div>
      <h1>Marvin Best</h1>
      <SentenceForm />
      <div>
        <h2>Sentences:</h2>
        <ul>
          {sentences.map((sentence) => (
            <li key={sentence.id}>
              <strong>{sentence.user.name}: </strong>
              {sentence.sentence}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
