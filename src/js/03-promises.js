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

  if (+refs.inputAmount.value < 0 || +refs.inputStep.value < 0 || +refs.inputDelay.value < 0) {
    Notify.warning(`All values ​​must be positive!`);
    return
  }
  else if(refs.inputAmount.value == 0) {
    Notify.warning('Write amount more then 0!')
  }
  else {
    let firstDelay = Number(refs.inputDelay.value);
    let step = Number(refs.inputStep.value);
    let amount = Number(refs.inputAmount.value);
    let messageIncrement = firstDelay;
    let delayIncrement = 0;

    setTimeout(() => {
      createPromise(1, firstDelay)
        .then(({ position, delay }) => {
          Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
        })
        .catch(({ position, delay }) => {
          Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
        });

      for (let i = 2; i <= amount; i++) {
        delayIncrement += step;
        setTimeout(() => {
          messageIncrement += step;

          createPromise(i, messageIncrement)
            .then(({ position, delay }) => {
              Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
            })
            .catch(({ position, delay }) => {
              Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
            });
        }, delayIncrement);

        if (i === amount) {
          messageIncrement = firstDelay;
          delayIncrement = 0;
        }
      }
    }, firstDelay);
  }

  
});

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  return new Promise((resolve, reject) => {
    if (shouldResolve) {
      resolve({ position, delay });
    } else {
      reject({ position, delay });
    }
  });
}
