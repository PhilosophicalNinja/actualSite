var canvas = document.querySelector("canvas");
var resetBtn = document.getElementById("resetBtn");
var selectMenu = document.getElementById("selectMenu");
var ctx = canvas.getContext("2d");
canvas.addEventListener("click", input);
resetBtn.addEventListener("click", initialize);
selectMenu.addEventListener("change", promote);

//var black = "#1204d6";
//var white = "aqua";
var black = "#968e96";
var white = "#ebebeb";

var pieces = {
    b_bishop: new Image(),
    b_king: new Image(),
    b_knight: new Image(),
    b_pawn: new Image(),
    b_queen: new Image(),
    b_rook: new Image(), 
    w_bishop: new Image(),
    w_king: new Image(),
    w_knight: new Image(),
    w_pawn: new Image(),
    w_queen: new Image(),
    w_rook: new Image()
}
pieces.b_bishop.src = "b_bishop_png_256px.png";
pieces.b_bishop.alt = "b_bishop";
pieces.b_king.src = "b_king_png_256px.png";
pieces.b_king.alt = "b_king";
pieces.b_knight.src = "b_knight_png_256px.png";
pieces.b_knight.alt = "b_knight";
pieces.b_pawn.src = "b_pawn_png_256px.png";
pieces.b_pawn.alt = "b_pawn";
pieces.b_queen.src = "b_queen_png_256px.png";
pieces.b_queen.alt = "b_queen";
pieces.b_rook.src = "b_rook_png_256px.png";
pieces.b_rook.alt = "b_rook";
pieces.w_bishop.src = "w_bishop_png_256px.png";
pieces.w_bishop.alt = "w_bishop";
pieces.w_king.src = "w_king_png_256px.png";
pieces.w_king.alt = "w_king";
pieces.w_knight.src = "w_knight_png_256px.png";
pieces.w_knight.alt = "w_knight";
pieces.w_pawn.src = "w_pawn_png_256px.png";
pieces.w_pawn.alt = "w_pawn";
pieces.w_queen.src = "w_queen_png_256px.png";
pieces.w_queen.alt = "w_queen";
pieces.w_rook.src = "w_rook_png_256px.png";
pieces.w_rook.alt = "w_rook";


class Square {
    color;
    piece;
    constructor(COLOR, PIECE){
        this.color = COLOR;
        this.piece = PIECE;
    }
}

var board = [];
for(let i = 0; i < 8; i++){
    board[i] = [];
    for(let j = 0; j < 8; j++){
        let color;
        if(((i + 1) % 2) != 0){
            if(((j + 1) % 2) != 0){
                color = white;
            } else {
                color = black;
            }
        } else {
            if(((j + 1) % 2) != 0){
                color = black;
            } else {
                color = white;
            }
        }
        board[i][j] = new Square(color, "empty");
    }
}

function initialize(){
    for(let i = 0; i < 8; i++){
        for(let j = 0; j < 8; j++){
            board[i][j].piece = "empty"; 
        }
    }
    board[0][0].piece = pieces.b_rook;
    board[1][0].piece = pieces.b_knight;
    board[2][0].piece = pieces.b_bishop;
    board[3][0].piece = pieces.b_queen;
    board[4][0].piece = pieces.b_king;
    board[5][0].piece = pieces.b_bishop;
    board[6][0].piece = pieces.b_knight;
    board[7][0].piece = pieces.b_rook;
    for(let i = 0; i < 8; i++){
        board[i][1].piece = pieces.b_pawn;
    }

    board[0][7].piece = pieces.w_rook;
    board[1][7].piece = pieces.w_knight;
    board[2][7].piece = pieces.w_bishop;
    board[3][7].piece = pieces.w_queen;
    board[4][7].piece = pieces.w_king;
    board[5][7].piece = pieces.w_bishop;
    board[6][7].piece = pieces.w_knight;
    board[7][7].piece = pieces.w_rook;
    for(let i = 0; i < 8; i++){
        board[i][6].piece = pieces.w_pawn;
    }
    render();
}

function render(cellx = null, celly = null){
    if(cellx === null){
        for(let i = 0; i < 8; i++){
            for(let j = 0; j < 8; j++){
                ctx.beginPath();
                ctx.rect(i* 50, j*50, 50, 50);
                ctx.fillStyle = board[i][j].color;
                ctx.strokeStyle = board[i][j].color;
                ctx.fill();
                ctx.stroke();
                if(board[i][j].piece != "empty"){
                    ctx.drawImage(board[i][j].piece, i*50, j*50, 50, 50);
                } 
            }
        }
    } else {
        ctx.beginPath();
        ctx.rect(cellx*50, celly*50, 50, 50);
        ctx.fillStyle = board[cellx][celly].color;
        ctx.strokeStyle = board[cellx][celly].color;
        ctx.fill();
        ctx.stroke();
        if(board[cellx][celly].piece != "empty"){
            ctx.drawImage(board[cellx][celly].piece, cellx*50, celly*50, 50, 50);
        } 
    }
}


function promote(){
    switch(selectMenu.value){
        case "queen":
            board[inputObj.x2][inputObj.y2].piece = pieces.w_queen;
            break;
        case "knight":
            board[inputObj.x2][inputObj.y2].piece = pieces.w_knight;
            break;
        case "rook":
            board[inputObj.x2][inputObj.y2].piece = pieces.w_rook;
            break;
        case "bishop":
            board[inputObj.x2][inputObj.y2].piece = pieces.w_bishop;
            break;
        default:
            console.log("Something has gone wrong.");
            break;
    }
        render(inputObj.x2, inputObj.y2);
        selectMenu.style.visibility = "hidden";
        selectMenu.value = "select";
}

function verifyMove(){
    let diffX = Math.abs(inputObj.x1 - inputObj.x2);
    let directX = Math.pow(inputObj.x2 - inputObj.x1, 0);
    let diffY = Math.abs(inputObj.y1 - inputObj.y2);
    let directY = Math.pow(inputObj.y2 - inputObj.y1, 0);
    let pass = true;
    let occupied = false;
    //phase one: check if movement pattern is valid
    switch(board[inputObj.x1][inputObj.y1].piece.alt.slice(2)){
        case "rook": 
            if(!((diffX > 0 && diffY == 0) || (diffX == 0 && diffY > 0))){
                pass = false;
            }
            break;
        case "bishop":
            if(!(diffX == diffY)){
                pass = false;
            }
            break;
        case "knight":
            if(!((diffX == 2 && diffY == 1) || (diffX == 1 && diffY == 2))){
                pass = false;
            }
            break;
        case "queen":
            if((diffX > 0 && diffY == 0) || (diffX == 0 && diffY > 0)){
                break;
            } else if(diffX == diffY){
                break;
            } else {
                pass = false;
            }
            break;
        case "pawn":
            if(diffY == 1 && diffX == 0 && board[inputObj.x2][inputObj.y2].piece == "empty"){
                break;
            } else if((diffX == diffY && diffY == 1) && board[inputObj.x2][inputObj.y2].piece != "empty"){
                break;
            } else {
                pass = false;
            }
            break;
        case "king":
            if(diffY > 1 || diffX > 1){
                pass = false;
            }
            break;
        default:
            console.error("Unidentified piece movement");

    }
    //phase two: check if piece blocks the shot
    switch(board[inputObj.x1][inputObj.y1].piece.alt.slice(2)){
        case "rook":
            if(diffX > 1){
                console.log(diffX)
                if(directX > 0){
                    for(let i = inputObj.x1 + 1; i < inputObj.x2; i++){
                        if(board[i][inputObj.y1].piece != "empty"){
                            if(occupied){
                                pass = false;
                            } else {
                                occupied = true;
                            }
                        }
                    }
                } else if(directX < 0){
                    for(let i = inputObj.x1 - 1; i < inputObj.x2; i--){
                        if(board[i][inputObj.y1].piece != "empty"){
                            if(occupied){
                                pass = false;
                            } else {
                                occupied = true;
                            }
                        }
                    }
                }
            }
    //phase three: if attacking piece, check for enemy
        }
    return pass;
        
}

function move(){
    let isMoveLegal = verifyMove();
    if(!(inputObj.x1 == inputObj.x2 && inputObj.y1 == inputObj.y2) && isMoveLegal){
        let change = false;
        if(board[inputObj.x1][inputObj.y1].piece.alt.slice(2) == "pawn" && inputObj.y2 == 0){
            change = true;
        }
        board[inputObj.x2][inputObj.y2].piece = board[inputObj.x1][inputObj.y1].piece;
        board[inputObj.x1][inputObj.y1].piece = "empty";
        board[inputObj.x1][inputObj.y1].color = inputObj.firstColor;
        board[inputObj.x2][inputObj.y2].color = inputObj.secondColor;
        render(inputObj.x1, inputObj.y1);
        render(inputObj.x2, inputObj.y2);
        if(change){
            selectMenu.style.visibility = "visible";
            selectMenu.style.top = inputObj.absy;
            selectMenu.style.left = inputObj.absx;
        }
        inputObj.first = false;
    } else {
        board[inputObj.x1][inputObj.y1].color = inputObj.firstColor;
        board[inputObj.x2][inputObj.y2].color = inputObj.secondColor;
        render(inputObj.x1, inputObj.y1);
        render(inputObj.x2, inputObj.y2);
        inputObj.first = false;
    }
}

var inputObj = {
    absx: 0,
    absy: 0,
    x1: 0,
    y1: 0,
    firstColor: null,
    first: false,
    x2: 0,
    y2: 0,
    secondColor: null
}

function input(e){
    console.log("__________________________________________________________");
    inputObj.absx = e.clientX;
    inputObj.absy = e.pageY;
    let x = Math.floor(e.offsetX/50);
    let y = Math.floor(e.offsetY/50);  
    if(inputObj.first == false){
        if(board[x][y].piece != "empty"){
            inputObj.firstColor = board[x][y].color;
            board[x][y].color = "yellow";
            inputObj.x1 = x;
            inputObj.y1 = y;
            render(x, y);
            inputObj.first = true;
        }
    } else {
        inputObj.secondColor = board[x][y].color;
        board[x][y].color = "red";
        inputObj.x2 = x;
        inputObj.y2 = y;
        render(x, y);
        move();
    }
    
}

window.onload = initialize;
var a = []; a['cat']='meow';