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
Input.addEventListener("input", () => {
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
  if (typedchar === "") return;
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
    Input.value = "";
  }
});

//This for pc backspace

Input.addEventListener("keydown", (e) => {
  if (e.key === "Backspace" && index > 0) {
    index--;
    let currentspan = spans[index];
    let currentColor = currentspan.style.color;
    if (currentColor === "rgb(255, 107, 107)" || currentColor === "#FF6B6B") {
      errorcount--;
    } else if (
      currentColor === "rgb(0, 255, 127)" ||
      currentColor === "#00FF7F"
    ) {
      corectcount--;
    }
    currentspan.style.color = "";
    e.preventDefault();
  }
});
//This for mobile keybord back

Input.addEventListener("input", (e) => {
  if (
    Input.value.length === 0 &&
    e.inputType === "deleteContentBackward" &&
    index > 0
  ) {
    index--;
    let currentspan = spans[index];
    let currentColor = currentspan.style.color;
    if (currentColor === "rgb(255, 107, 107)" || currentColor === "#FF6B6B") {
      errorcount--;
    } else if (
      currentColor === "rgb(0, 255, 127)" ||
      currentColor === "#00FF7F"
    ) {
      corectcount--;
    }
    currentspan.style.color = "";
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
