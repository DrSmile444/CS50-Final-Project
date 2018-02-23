'use strict';

let output = document.getElementById('output');

function start(key) {
  if (key) {
    toDecimal( prompt('Pick number: (binary)','') )
  } else {
    toBinary( +prompt('Pick number:','') );
  }
}

function toBinary(num) {
  outputDefault();

  if (isNaN(+num) ){
    output.value = 'This is not a number!';
    return 1;
  }
  
  let result = [];
  output.value += num + '|B\n';

  for(let i = 0; i < num;) {
    let remainder = num % 2;
    result.push(remainder);
    num = Math.floor(num/2);
    output.value += num + '|'+ remainder + '\n';
  }
  if (output.value.length > 37) {
    output.style.height = '220px';
  }
  if (output.value.length > 50) {
    output.style.height = '270px';
  }

  result = result.reverse().join('');
  output.value += 'Result:  \n' + result;
  return 0;
}

function toDecimal(num) {
  outputDefault();
  let process = (num + '').split('').reverse();
  let result = 0, arr = [];

  for (let i = 0, n = process.length; i < n; i++) {
    if (+process[i]) {
      let chache = Math.pow(2, i);
      result += chache;
      arr.push(chache)
    }
  }

  return output.value = num + ' =\n' + arr.reverse().join(' + ') + '\nResult is:   \n' + result;
}

function outputDefault() {
  output.value = '';
  output.style.height = '200px';
}

function about() {
  let info = '   The program helps understand the principle of obtaining a binary number.\nAnyway, you can obtain a decimal number.';
  
  alert(info);
}