const fs = require("fs");

// Function to decode the y value based on the given base
function decodeValue(base, value) {
  return parseInt(value, parseInt(base));
}

// Function to calculate the Lagrange interpolation constant term
function lagrangeInterpolation(roots) {
  let constant = 0;

  for (let i = 0; i < roots.length; i++) {
    let xi = roots[i].x;
    let yi = roots[i].y;
    let term = yi;

    for (let j = 0; j < roots.length; j++) {
      if (i !== j) {
        let xj = roots[j].x;
        term *= -xj / (xi - xj);
      }
    }
    constant += term;
  }

  return Math.round(constant); // Round to nearest integer
}

// Function to process the test case
function processTestCase(testCase) {
  const keys = testCase.keys;
  const n = keys.n;
  const k = keys.k;

  if (n < k) {
    console.error("Insufficient roots provided to solve the polynomial.");
    return null;
  }

  const roots = [];
  for (let key in testCase) {
    if (key === "keys") continue;

    const root = testCase[key];
    const x = parseInt(key);
    const y = decodeValue(root.base, root.value);
    roots.push({ x, y });

    if (roots.length === k) break; // Use only the first k roots
  }

  return lagrangeInterpolation(roots);
}

// Main function
function main() {
  try {
    // Load the test cases
    const testCase1 = JSON.parse(fs.readFileSync("testcase1.json", "utf-8"));
    const testCase2 = JSON.parse(fs.readFileSync("testcase2.json", "utf-8"));

    // Process each test case
    const secret1 = processTestCase(testCase1);
    const secret2 = processTestCase(testCase2);

    // Output the results
    console.log("Secret for Test Case 1:", secret1);
    console.log("Secret for Test Case 2:", secret2);
  } catch (err) {
    console.error("Error:", err.message);
  }
}

main();
