var score = require("./score");
var expect = require("chai").expect;

describe("testing: score.js", function () {
	let TEST_DATA;
	let CONSOLE_ON = undefined;

	this.beforeAll(() => {
		TEST_DATA = [
			[10, 0.5, 16, 1],
			[200, 0.5, 16, 4],
			[650, 0.5, 16, 4],
			[300, 0.5, 16, 5],
			[10, 0.5, 16, 1],
			[200, 0.5, 16, 4],
			[650, 0.5, 16, 4],
			[300, 0.5, 16, 5],
			[10, 0.5, 16, 1],
			[200, 0.5, 16, 4],
			[650, 0.5, 16, 4],
			[300, 0.5, 16, 6],
			[10, 0.5, 16, 1],
			[200, 0.5, 16, 4],
			[650, 0.5, 16, 4],
			[300, 0.5, 16, 6],
			[10, 0.5, 16, 1],
			[200, 0.5, 16, 4],
			[650, 0.5, 16, 4],
			[300, 0.5, 16, 6],
		];
	});

	it("chooses Bucket 6 when Top K =5", function () {
		//ARR
		const _K = 5;
		//ACT
		let result = score.runAnalysis(TEST_DATA, _K, CONSOLE_ON);
		//ASS
		expect(result).to.equal(6);
	});

	it("chooses Bucket 5 when Top K =3", function () {
		//ARR
		const _K = 3;
		//Act
		result = score.runAnalysis(TEST_DATA, _K, CONSOLE_ON);
		//ASS
		expect(result).to.equal(5);
	});
});
