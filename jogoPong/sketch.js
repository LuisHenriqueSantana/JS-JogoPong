let campoMultiplayer;

//variáveis da bolinha
let xBolinha = 300;
let yBolinha = 200;
let diametro = 22;
let raio = diametro / 2;

//velocidade da bolinha
let velocidadeXBolinha = 6;
let velocidadeYBolinha = 6;
let raqueteComprimento = 15;
let raqueteAltura = 110;

//variáveis da raquete
let xRaquete = 5;
let yRaquete = 150;

let xRaqueteOponente = 585;
let yRaqueteOponente = 150;
let velocidadeYOponente;
let chanceDeErrar = 1;


let colidiu = false;

//placar do jogo

let meusPontos = 0;
let pontosOponente = 0;

//sons do jogo

let raquetada;
let ponto;
let trilha;

function preload() {
  trilha = loadSound("trilha.mp3");
  ponto = loadSound("ponto.mp3");
  raquetada = loadSound("raquetada.mp3");
}

function setup() {
  //trilha.loop();
  createCanvas(600, 400);
  campoMultiplayer = createCheckbox("2 Jogadores");
}

function draw() {
  background(0);
  bolinhaNaoFicaPresa();
  mostraBolinha();
  movimentaBolinha();
  verificaColisaoBorda();
  mostraRaquete(xRaquete, yRaquete);
  mostraRaquete(xRaqueteOponente, yRaqueteOponente);
  movimentaMinhaRaquete();
  multiplayer();
  verificaColisaoRaquete(xRaquete, yRaquete);
  verificaColisaoRaquete(xRaqueteOponente, yRaqueteOponente);
  incluiPlacar();
  //colisaoMinhaRaqueteBiblioteca();
  marcaPonto();
}

function mostraBolinha() {
  circle(xBolinha, yBolinha, diametro);
}

function movimentaBolinha() {
  xBolinha += velocidadeXBolinha;
  yBolinha += velocidadeYBolinha;
}

function verificaColisaoBorda() {
  if (xBolinha + raio > width || xBolinha - raio < 0) {
    velocidadeXBolinha *= -1;
  }
  if (yBolinha + raio > height || yBolinha - raio < 0) {
    velocidadeYBolinha *= -1;
  }
}

function mostraRaquete(x, y) {
  rect(x, y, raqueteComprimento, raqueteAltura);
}

function movimentaMinhaRaquete() {
  if (keyIsDown(UP_ARROW)) {
    yRaquete -= 10;
  }
  if (keyIsDown(DOWN_ARROW)) {
    yRaquete += 10;
  }
}

function movimentaRaqueteOponenteWS(){
    if (keyIsDown(87)) {
    yRaqueteOponente -= 10;
  }
  if (keyIsDown(83)) {
    yRaqueteOponente += 10;
  }
}

function movimentaRaqueteOponente(){
  velocidadeYOponente = yBolinha -yRaqueteOponente - raqueteComprimento / 2 - 30;
  yRaqueteOponente += velocidadeYOponente + chanceDeErrar
} 

function verificaColisaoRaquete(x, y) {
  colidiu = collideRectCircle(x, y, raqueteComprimento, raqueteAltura, xBolinha, yBolinha, raio);
  if (colidiu) {
    velocidadeXBolinha *= -1;
    raquetada.play();
  }
}

function incluiPlacar() {
  stroke("white");
  textAlign(CENTER);
  textSize(16);
  fill("orange");
  rect(430, 61, 40, 20);
  rect(130, 61, 40, 20);

  fill("white");
  text(meusPontos, 150, 76);
  text(pontosOponente, 450, 76);
}

function marcaPonto() {
  if (xBolinha > 585) {
    meusPontos += 1;
    ponto.play();
  }
  if (xBolinha < 11) {
    pontosOponente += 1;
    ponto.play();
  }
}


function bolinhaNaoFicaPresa(){
    if (xBolinha - raio < -1){
    xBolinha = 200;
    }
  if (xBolinha  > 585){
    xBolinha = 200; 
}
}

function multiplayer (){
        if (campoMultiplayer.checked()) {
    movimentaRaqueteOponenteWS();
  } else {
    movimentaRaqueteOponente();
  }
}
