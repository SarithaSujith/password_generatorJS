const characterAmountRange = document.getElementById('characterAmountRange');
const characterAmountNumber = document.getElementById('characterAmountNumber');
// const characterAmountSymbol= document.getElementById('characterAmountSymbol')
const includeUppercaseElement = document.getElementById('includeUppercase');
const includeNumbersElement = document.getElementById('includeNumbers');
const includeSymbolsElement = document.getElementById('includeSymbols');
const form = document.getElementById('passwordGeneratorForm');
const passwordDisplay = document.getElementById('passwordDisplay');

const UPPERCASE_CHAR_CODES = arrayFromLowToHigh(65, 90);
const LOWECASE_CHAR_CODES = arrayFromLowToHigh(97, 122);
const NUMBERS_CHAR_CODES = arrayFromLowToHigh(48, 57);
const SYMBOL_CHAR_CODES = arrayFromLowToHigh(33, 47)
	.concat(arrayFromLowToHigh(58, 64))
	.concat(arrayFromLowToHigh(91, 96))
	.concat(arrayFromLowToHigh(123, 126)); //its different coz there are abunch

// this is to sync the character and the range value
//eventlisteners
characterAmountNumber.addEventListener('input', synCharacterAmount);
characterAmountRange.addEventListener('input', synCharacterAmount);

form.addEventListener('submit', (e) => {
	e.preventDefault(); //stop submitting the form
	const characterAmount = characterAmountNumber.value;
	const includeUppercase = includeUppercaseElement.checked;
	const includeNumbers = includeNumbersElement.checked;
	const includeSymbols = includeSymbolsElement.checked;
	const password = generatePassword(
		characterAmount,
		includeUppercase,
		includeNumbers,
		includeSymbols
	);
	passwordDisplay.innerText = password;
});
//all codes for generating the passwords
function generatePassword(
	characterAmount,
	includeUppercase,
	includeNumbers,
	includeSymbols
) {
	let charCodes = LOWECASE_CHAR_CODES;
	//this will generate all possible char codes
	if (includeUppercase) charCodes = charCodes.concat(UPPERCASE_CHAR_CODES);
	if (includeNumbers) charCodes = charCodes.concat(NUMBERS_CHAR_CODES);
	if (includeSymbols) charCodes = charCodes.concat(SYMBOL_CHAR_CODES);

	//to store our passwords
	const passwordCharacters = [];
	for (let i = 0; i < characterAmount; i++) {
		const characterCode =
			charCodes[Math.floor(Math.random() * charCodes.length)];
		passwordCharacters.push(String.fromCharCode(characterCode));
	}
	// console.log(LOWECASE_CHAR_CODES)
	// String.fromCharCode(65)
	return passwordCharacters.join('');
}
//function to generate an array
function arrayFromLowToHigh(low, high) {
	const array = [];
	for (let i = low; i <= high; i++) {
		array.push(i);
	}
	return array;
}
// now call the function
function synCharacterAmount(e) {
	const value = e.target.value;
	characterAmountNumber.value = value;
	characterAmountRange.value = value; //now you can see the range and the chracters are linkeed to each other
}
