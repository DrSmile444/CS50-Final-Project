'use strict'; let p = console.log;

let user = document.getElementById('output');

function moreInput() {
	let n = prompt('Need input few IMC?\nCount:','');
	if ( +n ) {
		let result = '';
		for(let i = 0; i < n; i++) {
			result += (i+1) + ') ' + analyze( prompt('IMC:','') ) +';\n';
		}
		return user.value = result;
	}
	user.style.textAlign = "center";
	user.style.fontSize = "50px";
	user.value = 'Canceled';
}

function singleInput() {
	let start = prompt('Input your IMS', '');
	user.value = ( analyze(start) );
}

function analyze(input) {
	if (input == null) {
		user.style.textAlign = "center";
		user.style.fontSize = "50px";
		return "Empty IMC";
	}
	let result = '';
	let latin = ["R","\"","K","'"];
	input = input.toUpperCase();

	if( !!~latin.indexOf(input[0]) || !!~latin.indexOf(input[3]) ) {
		input = latinSupport(input);
	}
	
	let ims = input;

	let part1 = parseStr(input);
	result += analyzeArea(part1);
	input = input.slice(part1.length);

	let part2 = parseInt(input);
	result += analyzeSeria(part2);
	input = input.slice( (part2+'').length );

	let part3 = parseStr(input);
	result += analyzeGroup(part3);
	input = input.slice(part3.length);

	let part4 = parseInt(input);
	result += analyzeDate(part4);
	input = input.slice( (part4+'').length );

	if (input.length != 0) {
		result += ', модифікація ' + input; 
	}

	return ims + ' – ' + result;
}

function analyzeArea(string) {
	let result = '', len = string.length;

	let imsFrom = ["К", "Э"],
			imsFromAns = ["Сертифікована, ", "Експортна, ", "Внутрішня, "],
			imsMaterial = ['М', 'Н', 'Р', 'А', 'Ф', 'Б', 'Е'],
			imsMaterialAns = ['металокерамічна, ', 'mini металокерамічна, ', 'пластмасовий DIP, ', 'mini пластмасовий DIP, ', 'mini пластмасовий DIP (інша тех.), ', 'безкорпусний, ', 'металополімерний DIP'];
	
	if (len == 0) return 'Внутрішня, ';

	if (len > 0)	result += imsFromAns[ imsFrom.indexOf(string[0]) ];

	if (len > 1) result += imsMaterialAns[ imsMaterial.indexOf(string[1]) ];

	return result;
}

function analyzeSeria(number) {
	let result = '', flag = 0;
	number += '';

	if (number[0] % 2 == 0) result += 'гібридна, ';
	if (number[0] == 1 || number[0] == 5 || number[0] == 7) result += 'напівпровідникова, ';
	if (number[0] == 3) result += 'специфічна, ';
	if (number[0] == 5){
		result += 'ТТЛ/КМОН, ';
		flag = 5;
	} 

	if (number.slice(1) == '59' || number.slice(1) == '33') result += 'ТТЛ, біполярні'.slice(flag);

	return result;
}

function analyzeGroup(string) {
	let result = '';

	let imsGroup = ['ЛИ', 'ЛЛ', 'ЛН', 'ЛА', 'ЛЕ', 'ЛС', 'ЛБ', 'ЛР', 'ЛК', 'ЛК', 'ЛД', 'ЛП'],
			imsGroupAns = ["і (кон'юнктор), ", "або (альт-або), ", "не (інвертор), ", "і-не (штрих шефера), ", "або-не (стрілка пірса), ", "і-або (комплексні МС), ", "і-не, або-не (комплексні мс, стрілка + штрих), ", "і-або-не (комплексні МС і полярними входами), ", "і-або-не, і-або (комплексні МС с полярними входами, стрілка + штрих), ", "або-не, або, ", "розширені, ", "інші, "]
	if (!!~imsGroup.indexOf(string)) {
		result += imsGroupAns[imsGroup.indexOf(string)];
	} else alert('Group "' + string + '" is not include! Try pick another.');
	
	return result;
}

function analyzeDate(number) {
	let result = '';

	number += '';
	if (number.length <= 2) {
		result += '84-, '
	} else {
		result += '84+, '
	}

	return result + number + ' - номер розробки';
}

function parseStr(string) {
	let count = 0;
	for (let i = 0, n = string.length; i < n; i++) {
		if ( !+string[i] ) count++;
		else break;
	}
	return string.slice(0,count);
}

function latinSupport(string) {
	let result = string.split('');
	let latin = ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p", "[", "]", "a", "s", "d", "f", "g", "h", "j", "k", "l", ";", "'", "z", "x", "c", "v", "b", "n", "m", ",", ".", "Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P", "{", "}", "A", "S", "D", "F", "G", "H", "J", "K", "L", ":", "\"", "Z", "X", "C", "V", "B", "N", "M", "<", ">"]
	let cyrilic = ["й", "ц", "у", "к", "е", "н", "г", "ш", "щ", "з", "х", "ъ", "ф", "ы", "в", "а", "п", "р", "о", "л", "д", "ж", "э", "я", "ч", "с", "м", "и", "т", "ь", "б", "ю", "Й", "Ц", "У", "К", "Е", "Н", "Г", "Ш", "Щ", "З", "Х", "Ъ", "Ф", "Ы", "В", "А", "П", "Р", "О", "Л", "Д", "Ж", "Э", "Я", "Ч", "С", "М", "И", "Т", "Ь", "Б", "Ю"];

	for (let i = 0, n = string.length; i < n; i++) {
		if ( !!~latin.indexOf(string[i]) ) {
			result[i] = cyrilic[latin.indexOf(string[i])];
		}
	}

	return result.join('');
}