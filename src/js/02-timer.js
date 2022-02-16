import flatpickr from 'flatpickr';
// Дополнительный импорт стилей
import 'flatpickr/dist/flatpickr.min.css';

import { Notify } from 'notiflix/build/notiflix-notify-aio';


const refs = {
  days: document.querySelector('span[data-days]'),
  hours: document.querySelector('span[data-hours]'),
  minutes: document.querySelector('span[data-minutes]'),
  seconds: document.querySelector('span[data-seconds]'),
  btnStart: document.querySelector('button[data-start]'),
};
// кнопка Старт не активна до выбора даты
refs.btnStart.disabled = true;
//время вибора даты окончания отсчета
let initTime = null


// объект параметров.
const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
        initTime = selectedDates[0];
        if (initTime < Date.now()) {
            Notify.failure("Please choose a date in the future");
        } else {
            refs.btnStart.disabled = false;
        }
    }
};

flatpickr('#datetime-picker', options);

// Функция подсчета значений

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = addLeadingZero(Math.floor((((ms % day) % hour) % minute) / second));

  return { days, hours, minutes, seconds };
};

function addLeadingZero (value){
  return String(value).padStart(2, "0");
};

refs.btnStart.addEventListener("click", dialUpdate);


function dialUpdate() {
    const timeId = setInterval (() => {
        let residualTime = initTime - Date.now();
        if (residualTime > 0) {
        refs.days.textContent = convertMs(residualTime).days;
        refs.hours.textContent = convertMs(residualTime).hours;
        refs.minutes.textContent = convertMs(residualTime).minutes;
        refs.seconds.textContent = convertMs(residualTime).seconds;
        refs.btnStart.disabled = true;
        } else {
            clearInterval(timeId);
        };        
    }, 1000);
}

