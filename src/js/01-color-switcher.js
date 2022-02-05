const refs = {
    startBtnRef: document.querySelector('button[data-start]'),
    stopBtnRef: document.querySelector('button[data-stop]'),
    bodyRef: document.querySelector("body"),
}
// console.log(refs.startBtnRef);
// console.log(refs.stopBtnRef);
// console.log(refs.bodyRef);

let intervalId = null;

refs.startBtnRef.addEventListener("click", onStartBtnClick);
refs.stopBtnRef.addEventListener("click", onStopBtnClick);


function onStartBtnClick() {
    intervalId = setInterval(() => {
        const randomColor = getRandomHexColor();
        console.log(randomColor);
        refs.bodyRef.style.backgroundColor = `${randomColor}`;      
        
    }, 1000);
    console.log(intervalId);

    refs.startBtnRef.disabled = "true";
    refs.stopBtnRef.disabled = false;
        
};

function onStopBtnClick() {

    console.log(intervalId);      
    clearInterval(intervalId);
    refs.stopBtnRef.disabled = "true";
    refs.startBtnRef.disabled = false;

};

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}