import { useState } from "react";
import { type PeselValidation } from "../utils/peselValidation";
import { validatePesel } from "../utils/peselValidation";
import "./Pesel.css";

export default function Pesel() {
  const [pesel, setPesel] = useState("");
  const [validation, setValidation] = useState<PeselValidation | null>(null);

  const handlePeselChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setPesel(value);

    if (value.length === 11) {
      const result = validatePesel(value);
      setValidation(result);
    } else {
      setValidation(null);
    }
  };

  const formatDate = (date: Date): string => {
    return date.toLocaleDateString("pl-PL", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  const formatGender = (gender: "male" | "female"): string => {
    return gender === "male" ? "Mężczyzna" : "Kobieta";
  };

  return (
    <div className="card pesel-card">
      <div className="header">
        <h3>Zadanie 2.</h3>
        <p>
          Napisz program w React do walidacji numeru PESEL zgodnie z oficjalną
          specyfikacją formatu. Przygotuj testy jednostkowe sprawdzające kilka
          danych nieprawidłowych i przynajmniej jeden poprawny numer PESEL.
        </p>
      </div>
      <div className="input-container">
        <input
          type="text"
          value={pesel}
          onChange={handlePeselChange}
          placeholder="Wpisz 11-cyfrowy PESEL"
          maxLength={11}
          className={`pesel-input ${
            validation
              ? validation.valid
                ? "input-valid"
                : "input-invalid"
              : ""
          }`}
        />
      </div>
      <div className="validation-result">
        {validation && (
          <div className={validation.valid ? "result-valid" : "result-invalid"}>
            {validation.valid ? (
              <div>
                <h4>PESEL jest poprawny!</h4>
                <div className="pesel-details">
                  <p>
                    <strong>Data urodzenia:</strong>{" "}
                    {formatDate(validation.birthDate!)}
                  </p>
                  <p>
                    <strong>Płeć:</strong> {formatGender(validation.gender!)}
                  </p>
                </div>
              </div>
            ) : (
              <div>
                <h4>PESEL jest niepoprawny</h4>
                <p>
                  <strong>Powód:</strong> {validation.reason}
                </p>
              </div>
            )}
          </div>
        )}
        {pesel.length > 0 && pesel.length < 11 && (
          <div className="result-warning">Wprowadź 11-cyfrowy numer PESEL</div>
        )}
      </div>
    </div>
  );
}
