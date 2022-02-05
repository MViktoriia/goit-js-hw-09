import Notiflix from 'notiflix';

const refs = {
  form: document.querySelector(".form"),
  inputDeley: document.querySelector('input[name = "delay"]'),
  inputStep: document.querySelector('input[name = "step"]'),
  inputAmount: document.querySelector('input[name = "amount"]'),
  createPromiseBtn: document.querySelector('button[type = "submit"]'),
}

// console.log(refs.inputDeley);
// console.log(refs.inputStep);
// console.log(refs.inputAmount);
// console.log(refs.createPromiseBtn);


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



refs.form.addEventListener("submit", onSubmitBtnClick);

function onSubmitBtnClick(event) {
  event.preventDefault();
  let promisePosition = 0;
  let delay = refs.inputDeley.value;
  // console.log(delay);
  let delayStep = 0;
  // console.log(delayStep);
  const promisesAmount = refs.inputAmount.value;
  multiplePromise();

  function multiplePromise() {
    delay = Number(delay) + Number(delayStep);
    console.log(delay);
    delayStep = refs.inputStep.value;
    console.log(delay);
    const date = Date.now();
    setTimeout(() => {
      const currentTime = Date.now();
      console.log("Deley", currentTime - date);
      if (promisesAmount > promisePosition) {
        promisePosition += 1;
        // console.log(promisePosition);
        // console.log(delay);
        createPromise(promisePosition, delay)
          .then(({ position, delay }) => {
            console.log(`✅ Fulfilled promise ${position} in ${delay}ms`);
          })
          .catch(({ position, delay }) => {
            console.log(`❌ Rejected promise ${position} in ${delay}ms`);
          });       
        
        multiplePromise();
        return;
      }
      console.log("Error")
    }, delay);

  };

  
}