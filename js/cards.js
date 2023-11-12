const handPositions = document.querySelectorAll(".hand");
const startgameButton = document.querySelector("button");
let selected = 0;
handPositions.forEach(element => {
    element.addEventListener("click", function(){
        handPositions[selected].classList.remove("selected");
        selected = parseInt(this.id);
        this.classList.add("selected");
    })
});
let cards;
let board;
let hand;

startgameButton.onclick = function() {
    startGame();
}

function loadJson(){
    fetch("../json/cards.json")
        .then(response => {
            if (response.ok) return response.json();
            else {
                alert("No s'ha pogut completar la càrrega. Error " + response.status)
            }
        })
        .then(data => {
            cards = data["cards"];
        });
        
}
function startGame(){
    board = [[null, null, null, null], [null, null, null, null], [null, null, null, null]];
    hand = [null, null, null];
    selected = 0;
    draw(0);
    draw(1);
    draw(2);
}

function draw(id){
    let value = getRandomCardValue();
    console.log(value)
    console.log(cards)
    console.log(cards[value])
    hand[id] = cards[value];
    handPositions[id].innerHTML = "<img src=\"img/"+ cards[value].Name +".jpg\"/>"
}

function getRandomCardValue(){
    let value = Math.round(Math.random() * 10);
    return value;
}
loadJson();
