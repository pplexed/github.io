/* Caching the dom here - setting up variables for all the "get document.get items that I am going to end up using."
this is better than going back and forth between the HTML and the JS*/

let userScore = 0;
let computerScore = 0;
const userScore_span = document.getElementById('user-score');
const computerScore_span = document.getElementById('computer-score');
const scoreBoard_div = document.querySelector(".scoreboard");
const result_p = document.querySelector(".result > p");
const rock_div = document.getElementById("r");
const paper_div = document.getElementById("p");
const scissors_div = document.getElementById("s");

function getComputerChoice() {
    const choices = ["r", "p", "s"];
    const randomNumber = Math.floor(Math.random() * 3);
    return choices[randomNumber]
}

function convertToWord(letter){
  if (letter === "r") return "Rock";
  if (letter === "p") return "Paper";
  return "Scissors";
}

function win(userChoice, computerChoice){
  const smallUserWord = "user".fontsize(3).sub();
  const smallCompWord = "comp".fontsize(3).sub();
  const userChoice_div = document.getElementById(userChoice);
  userScore++;
  userScore_span.innerHTML = userScore;
  computerScore_span.innerHTML = computerScore;
  result_p.innerHTML = `${convertToWord(userChoice)} ${(smallUserWord)} beats ${convertToWord(computerChoice)} ${smallCompWord}. You win!`;
  userChoice_div.classList.add("green-glow");
  setTimeout(() => userChoice_div.classList.remove("green-glow"), 1000);
}//used the ``(displays strings) and the ${} (around variables) as part of the ES6 and removing the "+" and concatenation

function lose(userChoice, computerChoice){
  const smallUserWord = "user".fontsize(3).sub();
  const smallCompWord = "comp".fontsize(3).sub();
  const userChoice_div = document.getElementById(userChoice);
  computerScore++;
  userScore_span.innerHTML = userScore;
  computerScore_span.innerHTML = computerScore;
  result_p.innerHTML = `${convertToWord(userChoice)} ${(smallUserWord)} loses to ${convertToWord(computerChoice)} ${smallCompWord}. You lost...`;
  userChoice_div.classList.add("red-glow");
  setTimeout(() => userChoice_div.classList.remove("red-glow"), 1000);
}//used the ``(displays strings) and the ${} (around variables) as part of the ES6 and removing the "+" and concatenation


function draw(userChoice, computerChoice){
  //userScore++;
  //userScore_span.innerHTML = userScore;
  //computerScore_span.innerHTML = computerScore;
  const smallUserWord = "user".fontsize(3).sub();
  const smallCompWord = "comp".fontsize(3).sub();
  const userChoice_div = document.getElementById(userChoice);
  result_p.innerHTML = `${convertToWord(userChoice)} ${(smallUserWord)} equals ${convertToWord(computerChoice)} ${smallCompWord}. It's a draw!`;
  userChoice_div.classList.add("gray-glow");
  setTimeout(() => userChoice_div.classList.remove("gray-glow"), 1000);
}//used the ``(displays strings) and the ${} (around variables) as part of the ES6 and removing the "+" and concatenation

/* console.log(getComputerChoice()); used this to cofirm that our function
actually worked */

function game(userChoice) {
  const computerChoice = getComputerChoice();
  switch (userChoice + computerChoice) {
    case "rs":
    case "pr":
    case "sp":
      win(userChoice, computerChoice);
      break;
    case "rp":
    case "ps":
    case "sr":
      lose(userChoice, computerChoice);
      break;
    case "rr":
    case "pp":
    case "ss":
      draw(userChoice, computerChoice);
      break;
  }
  //console.log("user choice => " + userChoice);
  //console.log("computer choice => " + computerChoice);
}


function main(){
  rock_div.addEventListener('click',() => game("r"));
  paper_div.addEventListener('click',() => game("p"));
  scissors_div.addEventListener('click',() => game("s"));
}

main();
