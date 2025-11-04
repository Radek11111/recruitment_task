import { useState } from "react";

export default function validatePesel() {
  const [usePesel, setUsePesel] = useState("");
  const [result, setResult] = useState<string | null>(null);

  return (
    <div className="card">
      <div className="header">
        <h3>Zadanie 2. </h3>
        <p>
          Napisz program w React do walidacji numeru PESEL zgodnie z oficjalną
          specyfikacją formatu. Przygotuj testy jednostkowe sprawdzające kilka
          danych nieprawidłowych i przynajmniej jeden poprawny numer PESEL.
        </p>
      </div>
      <div className="">
        <input
          type="text"
          value={usePesel}
          onChange={(event) => setUsePesel(event.target.value)}
          placeholder="Wpisz 11-cyfrowy PESEL"
        />
      </div>
    </div>
  );
}
