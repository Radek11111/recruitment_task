import { useCallback, useState } from "react";
import { shuffleTextPreservingPunctuation } from "../utils/shuffleInnerTextLetter";

export default function TextShuffler() {
  const [inputText, setInputText] = useState<string>("");
  const [outputText, setOutputText] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleFile = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files && event.target.files[0];
      if (!file) return;

      if (file.type.includes("text/") && !file.name.endsWith(".txt")) {
        alert("Proszę wgrać plik tekstowy (.txt)");
        return;
      }
      setIsLoading(true);

      const reader = new FileReader();
      reader.onload = () => {
        const text = String(reader.result ?? "");
        setInputText(text);
        setOutputText(text);
        setIsLoading(false);
      };
      reader.readAsText(file, "UTF-8");
    },
    []
  );

  const handleShuffle = useCallback(() => {
    if (!inputText.trim()) return;

    const lines = inputText.split(/\r?\n/);
    const outshuffledLines = lines
      .map((line) => {
        return shuffleTextPreservingPunctuation(line);
      })
      .join("\n");
    setOutputText(outshuffledLines);
  }, [inputText]);

  const handleClear = useCallback(() => {
    setInputText("");
    setOutputText("");
  }, []);

  return (
    <div className="container">
      <div className="header">
        <h3>Zadanie 1. </h3>
        <p>
          Napisz program w React, który posiada obsługę formularza do wgrania
          pliku tekstowego, a następnie przestawi losowo szyk liter w każdym
          wierszu oprócz pierwszej i ostatniej litery wyrazu. Uwzględnij
          interpunkcję, wielkie/małe litery, wielolinijkowe teksty, polskie
          znaki.
        </p>
      </div>
      <div className="file-section">
        <input type="file" accept=".txt" onChange={handleFile} />
        {isLoading && <p>Wczytywanie...</p>}
      </div>
      <div className="button-section">
        <button onClick={handleShuffle} disabled={isLoading}>
          Przetasuj losowo
        </button>
        <button onClick={handleClear} disabled={isLoading}>
          Wyczyść
        </button>
      </div>
      <div className="text-area"></div>
      <p>Wynik:</p>
      <textarea readOnly value={outputText} rows={10} />
    </div>
  );
}
