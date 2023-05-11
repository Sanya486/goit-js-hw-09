const refs = {
  inputDelay: document.querySelector('input[name=delay]'),
  inputStep: document.querySelector('input[name=step]'),
  inputAmount: document.querySelector('input[name=amount]'),
  creatPromiseBtn: document.querySelector('button'),
  formEl: document.querySelector('form'),
};


refs.formEl.addEventListener('submit', (e) => {
  e.preventDefault();
  let stepIncremet = +refs.inputStep.value;
  setTimeout(() => {
    for (let i = 1; i <= +refs.inputAmount.value; i++) {
      createPromise(i, stepIncremet);
      stepIncremet += +refs.inputStep.value
    }
  }, +refs.inputDelay.value);
});



function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  setTimeout(() => {
    return new Promise((resolve, reject) => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    })
      .then(({ position, delay }) => {
        console.log(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        console.log(`❌ Rejected promise ${position} in ${delay}ms`);
      });
  }, delay)

  
  
};