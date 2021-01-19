(function (exports) {
	if (typeof require !== "undefined") {
		this._ = require("lodash");
	}

	let _DEBUG = false;

	function browserlog(message, obj) {
		if (globalThis.location || _DEBUG) {
			if (obj) {
				console.log(message, obj);
			} else {
				console.log(message);
			}
		}
	}

	const outputs = [];
	function onScoreUpdate(dropPosition, bounciness, size, bucketLabel) {
		// Ran every time a balls drops into a bucket
		const score = [dropPosition, bounciness, size, bucketLabel];
		outputs.push(score);
		browserlog(outputs);
	}

	const runAnalysis = (data, _K = 5, debug = false) => {
		// Write code here to analyze stuff

		// 1. Subtract 300 from all dropPosition values
		// 2. Take abs val
		// 3. Order descending (i.e. closest to drop point)
		// 4. Take top "k" results
		// 5. See which result is most common.
		const BASE = 300;
		const DROP_POSN = 0;
		const BASE_DIST = 0;
		const BUCKET_LABEL = 3;

		_DEBUG = debug;

		if (globalThis.location || _DEBUG) {
			console.log(
				"\n\n\n\nTop K results, _K: %s, BASE: %s DEBUG: %s \n ========================== \n\n\n",
				_K,
				BASE,
				_DEBUG
			);
		}

		const absDistance = (position) => {
			return Math.abs(position - BASE);
		};
		const results = _.chain(data || outputs)
			.map((row) => [
				absDistance(row[DROP_POSN]),
				row[1],
				row[2],
				row[BUCKET_LABEL],
			])
			.tap((a) =>
				browserlog(`STEPS 1+2: Get absolute distance from Base (${BASE}) `, a)
			)
			.sortBy(BASE_DIST)
			.tap((a) => browserlog(`STEP3: Sort by distance from ${BASE}`, a))
			.value();

		browserlog(
			`STEP4: Take top _K (${_K}) results (to see which result is most common for 'close to' ${BASE})`
		);

		const step4 = results.slice(0, _K);
		step4.map((a) => {
			browserlog(a);
		});

		browserlog(
			`STEP5: See which result is most common in Top _K(${_K}) Results (based on closeness to ${BASE})`
		);
		this.bucketCountsMap = new Map();
		step4.map((row) => {
			let count = bucketCountsMap.has(row[BUCKET_LABEL])
				? bucketCountsMap.get(row[BUCKET_LABEL]).count
				: 0;
			bucketCountsMap.set(row[BUCKET_LABEL], { count: ++count });
		});

		for (let [key, value] of bucketCountsMap) {
			browserlog("bucket: " + key + " has " + value.count + "results");
		}

		let winnerBucket;
		bucketCountsMap.forEach((val, bucket) => {
			if (!winnerBucket) {
				winnerBucket = bucket;
				return;
			}
			if (val.count > bucketCountsMap.get(winnerBucket).count) {
				winnerBucket = bucket;
			}
		});
		browserlog("WINNER BUCKET =", winnerBucket);
		return winnerBucket;
	};

	// export ONLY on server, for unit tests.
	//if (typeof window === undefined) {
	//	exports.runAnalysis = runAnalysis;
	//}

	exports.runAnalysis = runAnalysis;
	exports.onScoreUpdate = onScoreUpdate;
})(typeof exports === "undefined" ? (this["score"] = {}) : exports);
