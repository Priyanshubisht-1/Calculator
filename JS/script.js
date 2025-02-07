// 'use strict';

const inputBoxHis = document.querySelector('.calc-history');
const inputBoxAns = document.querySelector('.calc-answer');

inputBoxAns.focus();

const isAllowed = function () {
  // console.log(event.key, event.keyCode);
  if (event.keyCode >= 48 && event.keyCode <= 57) return true;
  else if (
    event.key === '+' ||
    event.key === '-' ||
    event.key === 'x' ||
    event.key === '/' ||
    event.key === '.' ||
    event.key === '(' ||
    event.key === ')' ||
    event.key === '%'
  )
    return true;
  return false;
};

const btn = document.querySelectorAll('.btn');
for (let item of btn) {
  item.addEventListener('click', function () {
    if (
      !item.classList.contains('calc-btn') &&
      !item.classList.contains('btn-sp') &&
      item.textContent !== '+/-'
    )
  });

  if (item.classList.contains('btn-sp') || item.textContent === '+/-') {
    item.addEventListener('click', function () {
      const act = item.textContent;

      switch (act) {
        case '%':
          inputBoxAns.value = `(${inputBoxAns.value})/100`;
          break;

        case 'AC':
          inputBoxHis.value = '';
          inputBoxAns.value = '';
          inputBoxAns.focus();
          break;

        case '+/-':
          if (
            inputBoxAns.value[1] === '(' &&
            inputBoxAns.value[inputBoxAns.value.length - 1] === ')'
          ) {
            const sign = inputBoxAns.value[0] === '+' ? '-' : '';
            inputBoxAns.value = `${sign}${inputBoxAns.value.slice(1)}`;
          } else {
            inputBoxAns.value = `-(${inputBoxAns.value})`;
          }
          break;

        case '()':
          if (
            inputBoxAns.value[0] === '(' &&
            inputBoxAns.value[inputBoxAns.value.length - 1] === ')'
          )
            inputBoxAns.value = inputBoxAns.value.slice(
              1,
              inputBoxAns.value.length - 1
            );
          else {
            inputBoxAns.value = `(${inputBoxAns.value})`;
          }
          break;
      }
    });
  }
}

document.querySelector('.calc-btn').addEventListener('click', function () {
  inputBoxHis.value = inputBoxAns.value;
  inputBoxAns.value = Number(
    eval(inputBoxAns.value.replace('x', '*')).toFixed(10)
  );
  if (inputBoxAns.value === 'NaN') inputBoxAns.value = Infinity;
  inputBoxAns.focus();
});

document.querySelector('.calc-answer').addEventListener('keydown', function () {
  if (event.key === 'Enter') {
    inputBoxHis.value = inputBoxAns.value;
    inputBoxAns.value = Number(
      eval(inputBoxAns.value.replace('x', '*')).toFixed(10)
    );
    if (inputBoxAns.value === 'NaN') inputBoxAns.value = Infinity;
  } else if (event.key === 'Backspace') {
    inputBoxAns.value = inputBoxAns.value.replace('Infinity', '');
  }
  inputBoxAns.focus();
});
