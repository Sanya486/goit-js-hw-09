const refs = {
  inputDelay: document.querySelector('input[namr="delay"]'),
  inputStep: document.querySelector('input[namr="step"]'),
  inputAmount: document.querySelector('input[namr="amount"]'),
  creatPromiseBtn: document.querySelector('button'),
};

let firstDelay = inputDelay.value
console.log(firstDelay)

refs.creatPromiseBtn.addEventListener('click', () => {
  preventDefault();
  for (let i = 1; i <= refs.inputAmount.value; i++){
    createPromise(i, refs.inputDelay.value);
  }
});



function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve({position, delay});
      }
      else {
        reject({position, delay});
      }
    }, delay)
  })
  return promise;
};

createPromise(2, 1500)
  .then(({ position, delay }) => {
    console.log(`✅ Fulfilled promise ${position} in ${delay}ms`);
  })
  .catch(({ position, delay }) => {
    console.log(`❌ Rejected promise ${position} in ${delay}ms`);
  });