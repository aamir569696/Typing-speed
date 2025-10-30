let Timer = document.querySelector(".timer span");
let Input = document.querySelector("#input");
let paragraph = document.querySelector(".para p");
let typingpage = document.querySelector(".typing-page");
let ResultPage = document.querySelector(".result-page");

let corectcount = 0;
let errorcount = 0;
let totaltyped = 0;

//this part for spliting letter
let text = paragraph.innerText;
let letter = text.split("");
//this part for wraping letter
let span = letter.map((char) => `<span>${char}</span>`).join("");
paragraph.innerHTML = span;

let spans = paragraph.querySelectorAll("span");
//this part for timer
let leftTime = 60;
let timerruning = false;
Input.addEventListener("keypress", () => {
  if (!timerruning) {
    timerruning = true;
    let countdown = setInterval(() => {
      leftTime--;
      Timer.textContent = leftTime + "s";
      if (leftTime <= 0) {
        clearInterval(countdown);
        Input.disabled = true;
        typingpage.style.display = "none";
        ResultPage.style.display = "block";
        showresult();
      }
    }, 1000);
  }
});
//input typing and letter color change
let index = 0;
Input.addEventListener("input", () => {
  let typedchar = Input.value.slice(-1);
  if (typedchar) {
    let currentspan = spans[index];
    let currentletter = currentspan.innerText;

    totaltyped++;
    if (typedchar.toLowerCase() === currentletter.toLowerCase()) {
      currentspan.style.color = "#00FF7F";
      corectcount++;
    } else {
      currentspan.style.color = "#FF6B6B";
      errorcount++;
    }
    index++;
    // Input.value="";
  }
});
function showresult() {
  let timetaken = 60 - leftTime;

  let WPM = Math.round(corectcount / 5 / (timetaken / 60));

  ResultPage.querySelector(".word h2").textContent = WPM;
  ResultPage.querySelector(".character h2").textContent = corectcount;
  ResultPage.querySelector(".error h2").textContent = errorcount;

  typingpage.style.display = "none";
  ResultPage.style.display = "block";
}
document.querySelector(".reset-game").addEventListener("click", () => {
  location.reload();
});
