const form = document.querySelector('form');
const btn = document.querySelector('button');

form.addEventListener('input', handlerInput);
function handlerInput() {
  let delay = Number(form.elements.delay.value);
  const delayStep = Number(form.elements.step.value);
  const amount = Number(form.elements.amount.value);
  btn.addEventListener('click', handlerSubmit);
  function handlerSubmit(evt) {
    evt.preventDefault();

    for (let index = 1; index <= amount; index++) {
      createPromise(index, delay);
      delay += delayStep;
    }
  }
}
function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  const promice = new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        // Fulfill
        resolve({ position, delay });
      } else {
        // Reject
        reject({ position, delay });
      }
    }, delay);
  });
  promice
    .then(({ position, delay }) => {
      console.log(`✅ Fulfilled promise ${position} in ${delay}ms`);
    })
    .catch(({ position, delay }) => {
      console.log(`❌ Rejected promise ${position} in ${delay}ms`);
    });
}
