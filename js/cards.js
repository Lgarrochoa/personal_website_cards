const handPositions = document.querySelectorAll(".hand");
const startgameButton = document.querySelector("button");
const boardTiles = document.querySelectorAll(".board .row .tile");
let selected = 0;
handPositions.forEach(element => {
    element.addEventListener("click", function(){
        handPositions[selected].classList.remove("selected");
        selected = parseInt(this.id);
        this.classList.add("selected");
    })
});
boardTiles.forEach(element => {
    element.addEventListener("click", function(){
        let x = parseInt(element.getAttribute("x"))
        let y = parseInt(element.getAttribute("y"));
        if(validatePlacing(x, y)){
        element.innerHTML = "<img src=\"img/"+ hand[selected].Name +".jpg\"/>"
        board[y][x] = hand[selected];
        draw(selected);
        if(checkWin()){
            alert("You win!!!");
        }
    }
    })
});
let cards;
let board;
let hand;

startgameButton.onclick = function() {
    startGame();
}

function validatePlacing(x, y){
    if(board[y][x] != null)return false;
    if(compatibleTile(x, y - 1, "up", "down")) return false;
    if(compatibleTile(x, y + 1, "down", "up")) return false;
    if(compatibleTile(x + 1, y, "right", "left")) return false;
    if(compatibleTile(x - 1, y, "left", "right")) return false;
    return true;
}

function compatibleTile(x, y, Attributehand, Attributeboard){
    console.log(y);
    if((x<0 || x>3) || (y < 0 || y > 2)) return false;
    if(board[y][x] == null) return false;
    if(board[y][x][Attributeboard] == hand[selected][Attributehand]) return false;
    return true;
}

function checkWin(){
    for(let i=0; i<board.length; i++){
        for(let e=0; e<board[0].length; e++){
            if(board[i][e] === null) return false;
        }
    }
    return true;
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
    boardTiles.forEach(element => {
        element.innerHTML = "";
    });
    draw(0);
    draw(1);
    draw(2);
}

function draw(id){
    let value = getRandomCardValue();
    hand[id] = cards[value];
    handPositions[id].innerHTML = "<img src=\"img/"+ cards[value].Name +".jpg\"/>"
}

function getRandomCardValue(){
    let value = Math.round(Math.random() * 10);
    return value;
}
loadJson();
