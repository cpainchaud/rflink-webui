export function capitalize (value) {
	if (!value) return ''
	value = value.toString()

	let separateWord = value.toLowerCase().split(' ');
	for (let i = 0; i < separateWord.length; i++) {
		separateWord[i] = separateWord[i].charAt(0).toUpperCase() +
			separateWord[i].substring(1);
	}
	return separateWord.join(' ');
}