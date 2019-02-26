var canvas;
var stanley;
var cc;
var endScreen;
var stanx = 100;
var stany = 270;
var down = 1;
var firstBarTop = 400;
var firstBarBottom = 400;
var secondBarTop = 800;
var secondBarBottom = 800;
var firstBarTopSize;
var firstBarBottomSize;
var secondBarTopSize;
var secondBarBottomSize;
var difficulty = 1;
var whichStan = "Assets/Stanley.png";
var score = 0;
var dead = false;



window.onload = function(){
  canvas = document.getElementById("myCanvas");
  cc = canvas.getContext("2d");
  stanley = new Image();
  endScreen = new Image();
  changeFirstBarSize();
  changeSecondBarSize();
  setInterval(drawEverything, 1);

}

function drawEverything(){
  if (!dead){
    document.onkeydown = function(){
      down = down * -1;
      if (whichStan == "Assets/Stanley.png"){
        whichStan = "Assets/Stanley_Flipped.png";
      }
      else{
        whichStan = "Assets/Stanley.png";
      }
    }
    moveStan();
    moveBar();
    resetCheck();
    stanley.src = whichStan;
    cc.fillStyle = "black";
    cc.fillRect(0,0,canvas.width,canvas.height);
    cc.fillStyle = 'green';
    cc.fillRect(firstBarTop,0,20,firstBarTopSize);
    cc.fillRect(firstBarBottom,600-firstBarBottomSize,20,firstBarBottomSize );
    cc.fillRect(secondBarTop,0,20,secondBarTopSize);
    cc.fillRect(secondBarBottom, 600-secondBarBottomSize, 20, secondBarBottomSize);
    cc.fillStyle = "#41f48f";
    cc.font = "30px Arial"
    cc.fillText("Score: "+score, 30, 60);
    cc.drawImage(stanley,stanx,stany);
    checkCollide();
  }
  if (dead){
    endScreen.src = "Assets/endScreen.png";
    cc.drawImage(endScreen,0,0);
    cc.fillStyle = 'white';
    cc.font = "50px Arial";
    cc.fillText(score, 630,495);
  }
}

function moveBar(){
  firstBarTop -= difficulty;
  firstBarBottom -= difficulty;
  secondBarTop -= difficulty;
  secondBarBottom -= difficulty;
}

function changeFirstBarSize() {
  firstBarTopSize = Math.floor(Math.random() * 500);
  distance = 600 - firstBarTopSize;
  firstBarBottomSize = Math.floor(Math.random() * distance) - 150;
}

function changeSecondBarSize(){
  secondBarTopSize = Math.floor(Math.random() * 500);
  distance = 600 - secondBarTopSize;
  secondBarBottomSize = Math.floor(Math.random() * distance) - 150;
}

function resetCheck(){
  if (secondBarTop == 0){
    secondBarTop = 800;
    secondBarBottom = 800;
    changeSecondBarSize();
    score++;
  }
  if(firstBarTop == 0){
    firstBarTop = 800;
    firstBarBottom = 800;
    changeFirstBarSize();
    score++;
  }
}

function moveStan(){
  if (down == 1 && stany < 536){
    stany += 2;
  }
  if (down == -1 && stany > 0){
    stany -= 2;
  }
}

function checkCollide(){
  if (stanx >= firstBarTop - 64 && stanx <= firstBarTop + 20 && stany < firstBarTopSize){ //top bar collision
    dead = true;
  }
  if (stanx >= firstBarTop - 64 && stanx <= firstBarTop + 20 && stany + 64 > 600 - firstBarBottomSize){ //bottom bar collision
    dead = true;
  }
  if (stanx >= secondBarTop - 64 && stanx <= secondBarTop + 20 && stany + 64 > 600 - secondBarBottomSize){ //bottom bar collision
    dead = true;
  }
  if (stanx >= secondBarTop - 64 && stanx <= secondBarTop + 20 && stany < secondBarTopSize){ //top bar collision
    dead = true;
  }

}
