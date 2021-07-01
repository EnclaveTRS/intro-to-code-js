import {
  letterValues,
  regularScorePhrases,
  comboScoredPhrases,
} from "./letterValues";
/**
 * Define the function
 *
 * @category 06 - Object
 * @function phraseScore
 * @param {String} inputPhrase
 * @param {Boolean} comboActive - when comboActive is true, combo scoring is in effect
 * @returns {Number} total value of inputPhrase
 */
function phraseScore(inputPhrase, comboActive) {
  let score = 0;
  let lastChar = "";
  let combo = 1;
  let multiplier = inputPhrase.length;
  let currPoints;
  let debugScores = [];

  for (const char of inputPhrase) {
    if (comboActive) {
      /**
       * First char of inputPhrase
       *    set lastChar to first char of phrase
       *    add that char's value to score
       * currChar is the same as lastChar
       *    add 1 to combo
       *    add that char's value * combo to score
       * currChar is NOT the same as lastChar (same as initial!)
       *    reset combo to 1
       *    set lastChar to currChar
       *    add that char's value to score
       */
      if (lastChar !== char) {
        lastChar = char;
        combo = 1;

        currPoints = letterValues[char];
        debugScores.push(currPoints);

        score += currPoints;
      } else {
        combo++;

        currPoints = letterValues[char] * combo;
        debugScores.push(currPoints);

        score += currPoints;
      }
    } else {
      currPoints = letterValues[char];
      debugScores.push(currPoints);

      score += letterValues[char];
    }
  }

  if (comboActive) {
    console.log({
      inputPhrase: {
        charScores: debugScores,
        total: score,
        multiplied: score * multiplier,
      },
    });
    return score * multiplier;
  }
  // console.log(inputPhrase, debugScores, score, score * multiplier);
  return score;
}

import { expect } from "chai";

describe("#: phraseScore", () => {
  it("returns a number", () => {
    for (const phrase in regularScorePhrases) {
      expect(phraseScore(phrase)).to.be.a("number");
    }
  });

  it("uses the correct value per letter", () => {
    const testSingleValues = {};

    for (const letter in letterValues) {
      const testValue = phraseScore(letter);
      testSingleValues[letter] = testValue;
    }
    expect(testSingleValues).to.eql(letterValues);
  });

  describe("returns the correct score for the input phrase", () => {
    for (const phrase in regularScorePhrases) {
      const currScore = phraseScore(phrase);

      it(`${phrase} --> ${currScore}`, () => {
        const currTestScore = regularScorePhrases[phrase];
        expect(currScore).to.equal(currTestScore);
      });
    }
  });

  describe("BONUS: when comboActive is true", () => {
    console.log(Object.keys(comboScoredPhrases));

    context("phraseScore", () => {
      it("returns a number", () => {
        for (const phrase in comboScoredPhrases) {
          expect(phraseScore(phrase, true)).to.be.a("number");
        }
      });

      it("uses the correct value per single letter", () => {
        const testSingleValues = {};

        for (const letter in letterValues) {
          const testValue = phraseScore(letter, true);
          testSingleValues[letter] = testValue;
        }
        expect(testSingleValues).to.eql(letterValues);
      });

      describe("returns the correct phrase score using the combo rules", () => {
        let test = {};

        for (const phrase in comboScoredPhrases) {
          const comboScore = comboScoredPhrases[phrase];
          test[phrase] = phraseScore(phrase, true);

          it(`${phrase} --> ${comboScore}`, () => {
            expect(phraseScore(phrase, true)).to.equal(comboScore);
          });
        }
        // console.log(test);
      });
    });
  });
});
