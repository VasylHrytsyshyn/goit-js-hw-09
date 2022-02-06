function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

const refs = {
    body: document.querySelector("body"),
    btnStart: document.querySelector("button[data-start]"),
    btnStop: document.querySelector("button[data-stop]"),
};
let timerId = null;

refs.btnStart.addEventListener('click', () => {
    timerId = setInterval(() => {
        refs.body.style.backgroundColor = getRandomHexColor();
    }, 1000);
    refs.btnStart.disabled = true;
});

refs.btnStop.addEventListener('click', () => {
    clearInterval(timerId);
    refs.btnStart.disabled = false;
});