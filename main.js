/* class name of the clickable card tiles */
const unsolved_class_name = "n1rw4zro c1ci68pz sf3hvof"
/* time to wait between clicks (in ms). 160 ms found to be optimal */
const between_clicks = 160;

/* You have to manually declare all pairs */
const pairs = {};

function delay_click() {
	return new Promise(resolve => setTimeout(resolve, between_clicks));
}

/* @param cards is an array of pairs [obj, label]
 * @return an object which maps String->DOM Object
 * throws an exception if any of the labels is not in our pairs object
 */
function generate_map(cards) {
	const missing = []
	const dict = {};
	cards
		.forEach(card => {
			let label = card[1]
			for (const pair_key of Object.getOwnPropertyNames(pairs)) {
				if (label === pair_key) {
					return;
				} else if (label === pairs[pair_key]) {
					dict[pair_key] = card[0];
					return;
				}
			}
			missing.push(label);
		});

	if (missing.length !== 0) {
		console.log(missing)
		throw new Error("Unknown cards found")
	}

	return dict;
}

/* solves n pairs, all if undefined */
async function solve() {
	const cards = [...document.getElementsByClassName(unsolved_class_name)]
		.map(div => [
			div,
			div.childNodes[0].childNodes[0].childNodes[0].ariaLabel
		]);

	const dict = generate_map(cards);

	while (cards.length !== 0) {
		const [dom, label] = cards[0]

		const match = dict[label];
		if (match !== undefined) {
			dom.click();
			await delay_click()
			match.click();
			await delay_click()
		}

		cards.splice(0, 1);
	}
}

let start_button = [...document.getElementsByClassName(
	"AssemblyButtonBase AssemblyPrimaryButton--default AssemblyButtonBase--xlarge AssemblyButtonBase--padding AssemblyButtonBase--fullWidth"
)].filter(dom => dom.ariaLabel === "Start game")[0]

start_button.click();
await delay_click();
await solve();
