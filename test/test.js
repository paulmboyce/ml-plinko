var score = require("../src/score");
var expect = require("chai").expect;

describe("Array", function () {
	describe("#indexOf()", function () {
		it("should return -1 when the value is not present", function () {
			expect([1, 2, 3].indexOf(4)).to.equal(-1);
		});

		it("should run analysis", function () {
			expect(true).to.equal(true);
		});

		it("should load the analysis", function () {
			const DATA = [
				[10, 0.5, 16, 1],
				[200, 0.5, 16, 4],
				[650, 0.5, 16, 4],
				[300, 0.5, 16, 5],
			];
			console.log("AN", score.runAnalysis);
			const result = score.runAnalysis(DATA);
			console.log(result);
			expect(result).to.equal(5);
		});
	});
});
