let gameSeq = [];
let userSeq = [];
let btns = ['red', 'yellow', 'green', 'purple'];

let started = false;
let level = 0;

let h2 = document.querySelector("h2");
let h3= document.querySelector("h3");

document.addEventListener("keypress", function() {
    if(started == false) {
    console.log("Game is started");
    started = true;

    levelUp();
    }
});

function gameFlash(btn) {
    btn.classList.add('flash');
    setTimeout(function () {
        btn.classList.remove('flash');
    }, 250);
}

function userFlash(btn) {
    btn.classList.add('userFlash');
    setTimeout(function () {
        btn.classList.remove('userFlash');
    }, 250);
}

function levelUp() {
    userSeq = [];

    level++;
    h2.innerText = `level ${level}`;

    let randIdx = Math.floor(Math.random() * 3);
    let randColor = btns[randIdx];
    let randBtn = document.querySelector(`.${randColor}`)

    gameSeq.push(randColor);
    console.log(gameSeq);
    gameFlash(randBtn);
}

//........Matching sequence...............
function checkAns(idx) {

    if(userSeq[idx] === gameSeq[idx]){
        if(userSeq.length == gameSeq.length){
           setTimeout(() => {
            levelUp();
           },600);
        }
    } else {
        h2.innerHTML = `<b>GAME OVER</b>! Your score was<b> ${level}<b> <br>Press any key to start.`;
        document.querySelector("body").style.backgroundColor = "red";
        setTimeout(() => {
            document.querySelector("body").style.backgroundColor = "white";
        },150);
 
        let highScore = level;
        h3.innerText = `Your Highest Score is ${highScore}`;

        reset();

        if(highScore < level) {
        h3.innerText = `Highest Score is ${level}`;
        } else {
        h3.innerText = `Highest Score is ${highScore}`;
        }
    }
}

function btnPress() {
    let btn = this;
    userFlash(btn);

    userColor = btn.getAttribute("id");
    userSeq.push(userColor);
    
    checkAns(userSeq.length-1);
}

let allBtns = document.querySelectorAll(".btn");
for(btn of allBtns) {
    btn.addEventListener("click", btnPress);
}

function reset(){
    started = false;
    gameSeq = []; 
    userSeq = [];
    level = 0;
}
