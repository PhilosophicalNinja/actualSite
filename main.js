var canvas = document.querySelector("canvas");
var ctx = canvas.getContext("2d");
canvas.addEventListener("click", input);

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
pieces.w_queen.src = "w_queen_png_256px.png";
pieces.w_rook.src = "w_rook_png_256px.png";


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

function move(){
    
}

var inputObj = {
    x1: 0,
    y1: 0,
    first: false,
    x2: 0,
    y2: 0
}

function input(e){
    console.log("__________________________________________________________");
    let x = Math.floor(e.offsetX/50);
    let y = Math.floor(e.offsetY/50);  
    board[x][y].color = "yellow";
    render(x, y);
}

setTimeout(render, 1000);


//canvas.addEventListener("onload", ()=>ctx.drawImage(list[0], 0, 0, 50, 50));
//setTimeout(()=>ctx.drawImage(pieces.w_king, 0, 0, 50, 50), 1000);
var a = []; a['cat']='meow';