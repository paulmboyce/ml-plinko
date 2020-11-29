const outputs = [];
function onScoreUpdate(dropPosition, bounciness, size, bucketLabel) {
	// Ran every time a balls drops into a bucket
	const score = [dropPosition, bounciness, size, bucketLabel];
	outputs.push(score);
	console.log(outputs);
}

function runAnalysis() {
	// Write code here to analyze stuff

	// 1. Subtract 300 from all dropPosition values
	// 2. Take abs val
	// 3. Order descending (i.e. closest to drop point)
	// 4. Take top "k" results
	// 5. See which result is most common.
	const BASE = 300;
	const _K = 9;
	const DROP_POSN = 0;
	const BASE_DIST = 0;
	const BUCKET_LABEL = 3;

	const absDistance = (position) => {
		return Math.abs(position - BASE);
	};

	const results = _.chain(outputs)
		.map((row) => [
			absDistance(row[DROP_POSN]),
			row[1],
			row[2],
			row[BUCKET_LABEL],
		])
		.tap((a) =>
			console.log(`STEPS 1+2: Get absolute distance from Base (${BASE}) `, a)
		)
		.sortBy(BASE_DIST)
		.tap((a) => console.log(`STEP3: Sort by distance from ${BASE}`, a))
		.value();

	console.log(
		`STEP4: Take top _K (${_K}) results (to see which result is most common for 'close to' ${BASE})`
	);

	const step4 = results.slice(0, _K);
	step4.map((a) => {
		console.log(a);
	});

	console.log(
		`STEP5: See which result is most common in Top _K(${_K}) Results (based on closeness to ${BASE})`
	);
	window.bucketCountsMap = new Map();
	step4.map((row) => {
		let count = bucketCountsMap.has(row[BUCKET_LABEL])
			? bucketCountsMap.get(row[BUCKET_LABEL]).count
			: 0;
		bucketCountsMap.set(row[BUCKET_LABEL], { count: ++count });
	});

	for (let [key, value] of bucketCountsMap) {
		console.log("bucket: " + key + " has " + value.count + "results");
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
	console.log("WINNER BUCKET =", winnerBucket);
}
