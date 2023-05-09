const refs = {
    startBtn: document.querySelector('[data-start]'),
    stopBtn: document.querySelector('[data-stop]'),
};

let colorSwitcher = null;

refs.startBtn.addEventListener('click', switchBodyColor);
refs.stopBtn.addEventListener('click', stopSwitchingBodyColor);

function switchBodyColor() {
    refs.startBtn.disabled = true;
    refs.stopBtn.disabled = false;
    document.body.style.backgroundColor = getRandomHexColor();
    colorSwitcher = setInterval(() => {
        const color = getRandomHexColor();
        document.body.style.backgroundColor = color;
    }, 1000);
};

function stopSwitchingBodyColor() {
    clearInterval(colorSwitcher);
    refs.stopBtn.disabled = true;
    refs.startBtn.disabled = false;
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
};


