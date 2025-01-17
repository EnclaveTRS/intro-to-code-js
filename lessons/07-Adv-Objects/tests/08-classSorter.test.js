import { expect } from "chai";
import { classSorter } from "../08-classSorter";
import {
  emptyRoster,
  onlyStudentsRoster,
  onlyStudentsExpected,
  onlyTeachersRoster,
  onlyTeachersExpected,
  oneGradeSaTRoster,
  oneGradeSaTExpected,
  twoGradeSaTRoster,
  twoGradeSaTExpected,
  multipleGradeSaTRoster,
  multipleGradeSaTExpected,
} from "../data/08-classSorter.data";

describe("#8: classSorter", () => {
  it("should return an empty object for an empty roster", () => {
    const sortedClasses = classSorter(emptyRoster);
    expect(sortedClasses).to.deep.equal({});
  });

  describe("should correctly sort a roster", () => {
    describe("one grade", () => {
      it("only students", () => {
        const sortedClasses = classSorter(onlyStudentsRoster);
        expect(sortedClasses).to.deep.equal(onlyStudentsExpected);
      });

      it("only teachers", () => {
        const sortedClasses = classSorter(onlyTeachersRoster);
        expect(sortedClasses).to.deep.equal(onlyTeachersExpected);
      });

      it("students and teachers", () => {
        const sortedClasses = classSorter(oneGradeSaTRoster);
        expect(sortedClasses).to.deep.equal(oneGradeSaTExpected);
      });
    });

    describe("two grades", () => {
      it("students and teachers", () => {
        const sortedClasses = classSorter(twoGradeSaTRoster);
        expect(sortedClasses).to.deep.equal(twoGradeSaTExpected);
      });
    });

    describe("multiple grades", () => {
      it("students and teachers", () => {
        const sortedClasses = classSorter(multipleGradeSaTRoster);
        expect(sortedClasses).to.deep.equal(multipleGradeSaTExpected);
      });
    });
  });
});
