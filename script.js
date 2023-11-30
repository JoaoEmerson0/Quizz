let perguntaAtual = 1;
let acertos = 0;
let erros = 0;
let tempoTotal = 0;
let tempoMedio = 0;
let contadorTempo;

function respostaEstaCorreta(pergunta, respostaSelecionada) {
    switch (pergunta) {
        case 1:
            return respostaSelecionada === 'pergunta1_opcao1';
        case 2:
            return respostaSelecionada === 'pergunta2_opcao1';
        case 3:
            return respostaSelecionada === 'pergunta3_opcao1';
        case 4:
            return respostaSelecionada === 'pergunta4_opcao1';
        case 5:
            return respostaSelecionada === 'pergunta5_opcao1';
        default:
            return false;
    }
}

function iniciarQuiz() {
    document.getElementById('tela-inicial').style.display = 'none';
    document.getElementById(`pergunta${perguntaAtual}`).style.display = 'block';
    iniciarContadorTempo();
}

function iniciarContadorTempo() {
    contadorTempo = setInterval(() => {
        tempoTotal++;
    }, 1000);
}

function mostrarProximaPergunta(perguntaAtualID) {
    const opcoes = document.getElementsByName(`pergunta${perguntaAtual}`);
    let respostaSelecionada = null;

    opcoes.forEach(opcao => {
        if (opcao.checked) {
            respostaSelecionada = opcao.id;
        }
    });

    if (respostaSelecionada) {
        const label = document.querySelector(`label[for=${respostaSelecionada}]`);
        label.classList.add('selecionada');

        if (respostaEstaCorreta(perguntaAtual, respostaSelecionada)) {
            acertos++;
        } else {
            erros++;
        }
    }

    const perguntaAtualElement = document.getElementById(perguntaAtualID);
    perguntaAtualElement.classList.add('animated', 'fade-out');

    setTimeout(() => {
        perguntaAtualElement.style.display = 'none';
        perguntaAtualElement.classList.remove('animated', 'fade-out');

        perguntaAtual++;
        if (perguntaAtual <= 5) {
            const proximaPerguntaElement = document.getElementById(`pergunta${perguntaAtual}`);
            proximaPerguntaElement.style.display = 'block';
            proximaPerguntaElement.classList.add('animated', 'fade-in');
            reiniciarContadorTempo();
        } else {
            pararContadorTempo();
            mostrarResultado();
        }
    }, 1000);
}

function reiniciarContadorTempo() {
    clearInterval(contadorTempo);
    iniciarContadorTempo();
}

function pararContadorTempo() {
    clearInterval(contadorTempo);
}

function mostrarResultado() {
    for (let i = 1; i <= 5; i++) {
        const perguntaElement = document.getElementById(`pergunta${i}`);
        perguntaElement.style.display = 'none';
    }

    const resultadoElement = document.getElementById('resultado');
    resultadoElement.style.display = 'block';

    const acertosElement = document.getElementById('acertos');
    acertosElement.textContent = acertos;

    const errosElement = document.getElementById('erros');
    errosElement.textContent = erros;

    tempoMedio = tempoTotal / 5;

    const tempoMedioElement = document.getElementById('tempoMedio');
    tempoMedioElement.textContent = tempoMedio.toFixed(2) + ' segundos';
}

function recomecarQuizz() {
    // Redirecionar para a mesma página
    window.location.href = window.location.href;
}
