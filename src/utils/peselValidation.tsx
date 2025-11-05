export interface PeselValidation {
  valid: boolean;
  reason?: string;
  birthDate?: Date;
  gender?: "male" | "female";
}

export function validatePesel(peselRaw: string): PeselValidation {
  const pesel = peselRaw.trim();

  if (pesel.length !== 11 || !/^\d{11}$/.test(pesel)) {
    return { valid: false, reason: "PESEL musi składać się z 11 cyfr" };
  }

  const digits = Array.from(pesel, Number);

  if (!validateControlDigit(digits)) {
    return { valid: false, reason: "Nieprawidłowa cyfra kontrolna" };
  }

  const dateResult = extractBirthDate(digits);
  if (dateResult && !dateResult.valid) {
    return dateResult;
  }

  return {
    valid: true,
    birthDate: dateResult?.birthDate,
    gender: digits[9] % 2 === 0 ? "female" : "male",
  };
}

function validateControlDigit(digits: number[]): boolean {
  const weights = [1, 3, 7, 9, 1, 3, 7, 9, 1, 3];
  const sum = weights.reduce(
    (acc, weight, index) => acc + weight * digits[index],
    0
  );
  const controlDigit = (10 - (sum % 10)) % 10;
  return controlDigit === digits[10];
}

function extractBirthDate(digits: number[]): PeselValidation {
  let yearPart = digits[0] * 10 + digits[1];
  let month = digits[2] * 10 + digits[3];
  let day = digits[4] * 10 + digits[5];

  const centuryMap = [
    { min: 0, max: 19, base: 1900 },
    { min: 20, max: 39, base: 2000 },
    { min: 40, max: 59, base: 2100 },
    { min: 60, max: 79, base: 2200 },
    { min: 80, max: 99, base: 1800 },
  ];

  const centuryInfo = centuryMap.find(
    (range) => month >= range.min && month <= range.max
  );

  if (!centuryInfo) {
    return { valid: false, reason: "Nieprawidłowy miesiąc w numerze PESEL" };
  }

  month -= centuryInfo.min;
  const fullYear = centuryInfo.base + yearPart;

  if (month < 1 || month > 12) {
    return { valid: false, reason: "Nieprawidłowy miesiąc w numerze PESEL" };
  }

  if (!isValidDay(fullYear, month, day)) {
    return { valid: false, reason: "Nieprawidłowy dzień w numerze PESEL" };
  }

  const birthDate = new Date(fullYear, month - 1, day);
  if (
    birthDate.getFullYear() !== fullYear ||
    birthDate.getMonth() !== month - 1 ||
    birthDate.getDate() !== day
  ) {
    return {
      valid: false,
      reason: "Nieprawidłowa data urodzenia w numerze PESEL",
    };
  }
  return {
    valid: true,
    birthDate,
  };
}

function isValidDay(year: number, month: number, day: number): boolean {
  const daysInMonth = [
    31,
    isLeapYear(year) ? 29 : 28,
    31,
    30,
    31,
    30,
    31,
    31,
    30,
    31,
    30,
    31,
  ];
  return day >= 1 && day <= daysInMonth[month - 1];
}

function isLeapYear(year: number): boolean {
  return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
}
