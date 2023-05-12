import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refs = {
  inputDelay: document.querySelector('input[name=delay]'),
  inputStep: document.querySelector('input[name=step]'),
  inputAmount: document.querySelector('input[name=amount]'),
  creatPromiseBtn: document.querySelector('button'),
  formEl: document.querySelector('form'),
};



refs.formEl.addEventListener('submit', e => {

  e.preventDefault();
  // Вирішив залишити строгу рівність у 17 рядку, оскільки є окрема перевірка на amount у 21 рядку.
  if (+refs.inputAmount.value < 0 || +refs.inputStep.value < 0 || +refs.inputDelay.value < 0) {
    Notify.warning(`Values ​​must not be negative!`);
    return
  }
  else if(refs.inputAmount.value == 0) { 
    Notify.warning('Write amount more then 0!')
  }
  else {
    let firstDelay = Number(refs.inputDelay.value);
    let step = Number(refs.inputStep.value);
    let amount = Number(refs.inputAmount.value);

    for (let i = 1; i <= amount; i++){
      if (i === 1) {
        createPromise(i, firstDelay).then(({ position, delay }) => {
          Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
        })
        .catch(({ position, delay }) => {
          Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
        });
      }
      else {
        createPromise(i, firstDelay + step * (i -1)).then(({ position, delay }) => {
          Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
        })
        .catch(({ position, delay }) => {
          Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
        });
      };
    };
  };
  
});

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay) 
  });
}
