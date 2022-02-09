import Notiflix from 'notiflix';

const refs = {
  form: document.querySelector(".form"),
  inputDeley: document.querySelector('input[name = "delay"]'),
  inputStep: document.querySelector('input[name = "step"]'),
  inputAmount: document.querySelector('input[name = "amount"]'),
  createPromiseBtn: document.querySelector('button[type = "submit"]'),
}

console.log(refs.inputAmount);


let promises = []; 

refs.form.addEventListener("submit", onSubmitBtnClick);

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    console.log(shouldResolve);

    setTimeout(() => {
      if (shouldResolve) {
        // Fulfill
        resolve({ position , delay})
      } else {
        // Reject
        reject({ position , delay})
      }
    }, delay);    
  });     
};


function onSubmitBtnClick(event) {
  event.preventDefault();
  const firstDelay = Number(refs.inputDeley.value);
  const delayStep = Number(refs.inputStep.value);  
  const promisesAmount = Number(refs.inputAmount.value);

  if (login.value === "" || password.value === "") {
    return console.log("Please fill in all the fields!");
  }
  
  createArrayOfPromises(promisesAmount, firstDelay, delayStep).forEach(promise => {
    promise.
      then(({ position, delay }) => {
        Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
      }).catch(({ position, delay }) => {
        Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
      })
  });

  event.currentTarget.reset();

};


function createArrayOfPromises(promisesAmount, firstDelay, delayStep) {
  
  for (let i = 0; i <= promisesAmount - 1 ; i += 1) {
    
    const delay = firstDelay + delayStep * i;
    const promisePosition = i + 1;
    promises.push(createPromise(promisePosition, delay));    
    // console.log(promises);      
  };
  return promises;
};
