'use strict';
function add(form) {
	var first = +form.numOne.value, second = +form.numTwo.value;
	var result = document.getElementById("result");
	result.style.color="black";

	if(first == 0) {
		result.style.color="red";
		return result.value = "The number is zero";
	}

	if (second < 2) {
		result.style.color="red";
		return result.value = "Invalid system number";
	}

	if(second == 10) {
		result.style.color="red";
		return result.value = "There is no point in considering the same number: " + first;
	}
	
	var request = first.toString(second);
	return result.value = request;
}