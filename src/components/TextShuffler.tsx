import { useState } from "react";
import { shuffleTextPreservingPunctuation } from "../utils/shuffleInnerTextLetter";

export default function TextShuffler() {
  const [inputText, setInputText] = useState<string>("");
  const [outputText, setOutputText] = useState<string>("");

  const handleFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      setInputText(String(reader.result ?? ""));
    };
    reader.readAsText(file, "UTF-8");
  };

  const handleShuffle = () => {
    const lines = inputText.split(/\r?\n/);
    const out = lines
      .map((line) => {
        return shuffleTextPreservingPunctuation(line);
      })
      .join("\n");
    setOutputText(out);
  };

  return (
    <div className="">
      <div className="">
        <h3>Zadanie 1. </h3>
        <p>
          Napisz program w React, który posiada obsługę formularza do wgrania
          pliku tekstowego, a następnie przestawi losowo szyk liter w każdym
          wierszu oprócz pierwszej i ostatniej litery wyrazu. Uwzględnij
          interpunkcję, wielkie/małe litery, wielolinijkowe teksty, polskie
          znaki.
        </p>
      </div>
      <div className="">
        <input type="file" accept=".txt" onChange={handleFile} />
      </div>
      <div className="">
        <button onClick={handleShuffle}>Przetasuj losowo</button>
        <p>Wynik:</p>
        <textarea readOnly value={outputText} />
      </div>
    </div>
  );
}
