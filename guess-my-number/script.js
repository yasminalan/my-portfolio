
let myNumber;

function getRandomNumber() {
  myNumber = Math.floor(Math.random() * 100) + 1;
}

function getNumber() {
  let guess = document.getElementById("myNumber").value;
  let element = document.getElementById("message")

  if (guess < myNumber) {
    element.innerHTML = "Too Low!"
  }
  else if (guess > myNumber) {
    element.innerHTML = "Too High!"
  } else {
    element.innerHTML = "Correct!"
    document.body.style.backgroundColor = "green";
  }
}

function reloadPage() {
  location.reload();
}

getRandomNumber();

