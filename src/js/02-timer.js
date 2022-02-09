import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const refs = {
    inputDatetimePickerRef: document.querySelector('#datetime-picker'),
    startBtnRef: document.querySelector("button[data-start]"),
    spanDaysRef: document.querySelector("span[data-days]"),
    spanHoursRef: document.querySelector("span[data-hours]"),
    spanMinutesRef: document.querySelector("span[data-minutes]"),
    spanSecondsRef: document.querySelector("span[data-seconds]"),
};

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
     //   console.log(selectedDates[0]);
       
      if (selectedDates[0] <= Date.now()) {          
          if (!refs.startBtnRef.disabled) {
            refs.startBtnRef.disabled = true;            
          };          
          return Notiflix.Notify.failure('Please choose a date in the future');
      };
      refs.startBtnRef.disabled = false;
    
    },
};

flatpickr(refs.inputDatetimePickerRef, options);

refs.startBtnRef.disabled = true;

const timer = {
    intervalId: null,
    start() {
        const selectedDate = new Date(refs.inputDatetimePickerRef.value);
        
        refs.startBtnRef.disabled = true;
        refs.inputDatetimePickerRef.disabled = true;
        
        this.intervalId = setInterval(() => {
            const currentTime = Date.now();
            // console.log(currentTime);
            const deltaTime = selectedDate - currentTime;
            // console.log(deltaTime);
            if (deltaTime >= 0) {
                const { days, hours, minutes, seconds } = convertMs(deltaTime);
                console.log(`${days}:${hours}:${minutes}:${seconds}`);
                const convertedTime = convertMs(deltaTime);
                updateTimerFieldsValue(convertedTime);
            };
                     
        }, 1000);

        const timeToIntervalStop = selectedDate.getTime() - Date.now();
        // console.log(timeToIntervalStop);

        setTimeout(() => {
            clearInterval(this.intervalId)
        }, timeToIntervalStop);
              
    },
   
};

refs.startBtnRef.addEventListener("click", onStartBtnClick);

function onStartBtnClick() {
    timer.start();
}

function addLeadingZero(value) {
    return String(value).padStart(2, '0');
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = addLeadingZero(Math.floor(ms / day));
  // Remaining hours
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = addLeadingZero(Math.floor((((ms % day) % hour) % minute) / second));

  return { days, hours, minutes, seconds };
}

function updateTimerFieldsValue({ days, hours, minutes, seconds }) {
    refs.spanDaysRef.textContent = `${days}`;
    refs.spanHoursRef.textContent = `${hours}`;
    refs.spanMinutesRef.textContent = `${minutes}`;
    refs.spanSecondsRef.textContent = `${seconds}`;
}