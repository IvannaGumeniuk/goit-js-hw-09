import Notiflix from 'notiflix';

const form = document.querySelector('form');
const firstDelay = document.querySelector('input[name="delay"]');
const delaysStep = document.querySelector('input[name="step"]');
const amount = document.querySelector('input[name="amount"]');

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    
    const shouldResolve = Math.random() > 0.3;
    
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
 
  })
}

form.addEventListener('submit', (event) => {
  event.preventDefault();

  let delay = Number(firstDelay.value);
  let position = Number(amount.value);
  let step = Number(delaysStep.value);

  	for (let i = 1; i <= position; i++) {
			createPromise(i, delay)
			.then(({ position, delay }) => {
				Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
			})
			.catch(({ position, delay }) => {
				Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
			});
  			delay = delay + step;	
	}
})