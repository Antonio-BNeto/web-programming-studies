var altura = 0;
var largura = 0;
var vidas = 1;
var tempo = 50;

var criaMosquitoTempo = 1500;

var nivel = window.location.search;
nivel = nivel.replace('?', '');

if(nivel === 'facil'){
    criaMosquitoTempo = 1500;

}else if(nivel === 'normal'){
    criaMosquitoTempo = 1000;

}else if(nivel === 'dificil'){
    criaMosquitoTempo = 750;

}

function ajustaTamanhoJogo(){
    altura = window.innerHeight;
    largura = window.innerWidth;
}

ajustaTamanhoJogo();

document.getElementById('cronometro').innerHTML = tempo;

var cronometro = setInterval(function(){

    if(tempo <= 0 ){
        clearInterval(cronometro);
        clearInterval(criaMosquito);
        window.location.href = 'vitoria.html';
    }else{
        tempo -= 1 ;
        document.getElementById('cronometro').innerHTML = tempo; 
    }

}, 1000)

function posicaoRandomica(){

    //Removendo o mosquito anterior (caso exista algum);
    if(document.getElementById('mosquito')){
        document.getElementById('mosquito').remove();

        if(vidas > 3){
            window.location.href = 'gameOver.html';
        }else{
            document.getElementById('v' + vidas).src = '../img/coracao_vazio.png';
            vidas++;
        }
    }

    var posicaoX = Math.floor(Math.random() * largura) - 100;
    var posicaoY = Math.floor(Math.random() * altura) - 100;

    //Evitando valores negativos para posicaoX e posicaoY
    posicaoX = posicaoX < 0 ? 0: posicaoX;
    posicaoY = posicaoY < 0 ? 0: posicaoY;

    console.log(posicaoX, posicaoY);

    //Criar o elemento html
    var mosquito = document.createElement('img');

    //Caminho para a imagem do mosquito
    mosquito.src = '../img/mosquito.png';

    //Adicionando uma classe que controla o tamanho do mosquito
    mosquito.className = tamanhoAleatorio();

    //Randomizando a posição que o mosquito vai ficar
    mosquito.style.left = posicaoX + 'px';
    mosquito.style.top = posicaoY + 'px';

    //Definindo o position do mosquito
    mosquito.style.position = 'absolute';

    //Adicionando uma classe para controlar para qual lado o mosquito vai ficar virado
    mosquito.className += (' ' + ladoAleatorio());

    //Adicionando um id ao mosquito
    mosquito.id = 'mosquito';

    //Adicionando o evendo de onclick no mosquito
    mosquito.onclick = function(){
        this.remove();
    }

    //Mostrando o mosquito no body da pagina html
    document.body.appendChild(mosquito);
}

function tamanhoAleatorio(){
    var classe = Math.floor(Math.random() * 3);
    
    switch(classe){
        case 0:
            return 'mosquito1';
        case 1:
            return 'mosquito2';
        case 2:
            return 'mosquito3';
    }
}

function ladoAleatorio(){
    var classe = Math.floor(Math.random() * 2);

    switch(classe) {
        case 0:
            return 'ladoA';
        case 1:
            return 'ladoB';
    }

}

var criaMosquito = setInterval(function(){
    posicaoRandomica();
}, criaMosquitoTempo)


/* Manipulando a pagina inicial do jogo*/

function iniciar(){
    var dificuldade = document.getElementById('dificuldade').value;

    if(dificuldade != ""){
        window.location.href = 'app.html?' + dificuldade;
    }

    alert("Selecione uma dificuldade válida");
}