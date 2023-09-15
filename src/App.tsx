import SentenceForm from "./sentence/SentenceForm";
import { RootState } from "./app/store";
import { getMockUsers } from "./mock/user";
import { useAppSelector } from "@app/hooks";

function App() {
  const sentences = useAppSelector(
    (state: RootState) => state.sentences.sentences,
  );

  console.log(sentences);

  return (
    <div>
      <h1>Marvin Best</h1>
      <SentenceForm />
      <div>
        <h2>Sentences:</h2>
        <ul>
          {sentences.map((sentence) => (
            <li key={sentence.id}>
              <strong>
                {
                  getMockUsers().find((user) => user.id === sentence.user.id)
                    ?.name
                }
                :
              </strong>
              {sentence.sentence}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
