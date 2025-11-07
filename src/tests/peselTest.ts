import { validatePesel } from "../utils/peselValidation";
console.log("=== PESEL TEST START ===");

function assert(condition: boolean, message: string) {
  if (!condition) {
    console.error("Test failed:", message);
    throw new Error(message);
  }
  console.log("Test passed:", message);
}

function run() {
  console.log("Starting PESEL validation tests...\n");

  const testCases = [
    {
      pesel: "123",
      expected: false,
      description: "Too short PESEL",
    },
    {
      pesel: "44051401358",
      expected: false,
      description: "Wrong control digit",
    },
    {
      pesel: "00222912345",
      expected: false,
      description: "Invalid date (Feb 29, 1900)",
    },
    {
      pesel: "99023012345",
      expected: false,
      description: "Invalid day (Feb 30, 1999)",
    },
    {
      pesel: "44051401359",
      expected: true,
      description: "Valid PESEL from 1944",
    },
    {
      pesel: "00222912345",
      expected: false,
      description: "Invalid leap year date",
    },
  ];

  let passed = 0;
  let failed = 0;

  testCases.forEach((testCase, index) => {
    try {
      const result = validatePesel(testCase.pesel);
      assert(
        result.valid === testCase.expected,
        `Test Case ${index + 1}: ${testCase.description}- PESEL: ${
          testCase.pesel
        } `
      );
      passed++;
    } catch (error) {
      failed++;
      console.log(
        `Expected: ${testCase.expected}, but got: ${!testCase.expected}`
      );
    }
  });
  console.log(
    `\nPESEL validation tests completed. Passed: ${passed}, Failed: ${failed}`
  );
  console.log(failed === 0 ? "All tests passed!" : "Some tests failed.");
}

run();
