export default function interpolate(a, b, perc) {
	if (a === b) {
		return a;
	}

	return ((b - a) * perc) + a;
}
