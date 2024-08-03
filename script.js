const caixaPrincipal = document.querySelector(".caixa-principal");
const caixaPerguntas = document.querySelector(".caixa-pergunta");
const caixaAlternativas = document.querySelector(".caixa-alternativas");
const caixaResultado = document.querySelector(".caixa-resultado");
const textoResultado = document.querySelector(".texto-resultado");

const perguntas = [
    {
        enunciado: "A IA tem transformado profundamente a maneira como coletamos, processamos e compartilhamos informações. Com a capacidade de analisar grandes volumes de dados, ela é usada para personalizar experiências de usuário, melhorar a eficiência de processos e tomar decisões mais precisas. No entanto, essa coleta e análise de dados também geram preocupações significativas sobre a privacidade dos usuários e pelo acesso desses dados por parte da IA. Tendo isso em mente, você acredita que essa tendência nos beneficia ou prejudica?",
        alternativas: [
            { texto: "Beneficia", valor: "positivo" },
            { texto: "Prejudica", valor: "negativo" }
        ]
    },
    {
        enunciado: "A segurança digital procura manter a proteção de sistemas, redes e dados contra ataques, danos ou acesso não autorizado. Alguns métodos de proteção exigem dados do usuário para aumentar sua segurança, mas ainda assim é suscetível a ataques hackers. Como usuário, você disponibilizaria seus dados a instituições privadas para garantir mais segurança perante possíveis invasões?",
        alternativas: [
            { texto: "Com certeza", valor: "positivo" },
            { texto: "De maneira alguma", valor: "negativo" }
        ]
    },
    {
        enunciado: "Você acredita que a área de segurança digital necessite de algum tipo de regulamentação jurídica?",
        alternativas: [
            { texto: "Sim", valor: "positivo" },
            { texto: "Não", valor: "negativo" }
        ]
    },
    {
        enunciado: "É aceitável que dispositivos de IoT coletem dados online dos usuários mesmo que com o objetivo de incrementar a experiência do usuário?",
        alternativas: [
            { texto: "É aceitável", valor: "positivo" },
            { texto: "Completamente inaceitável", valor: "negativo" }
        ]
    },
    {
        enunciado: "Na sua opinião, os dados de localização de usuários devem ser coletados e analisados por empresas para melhorar serviços como navegação e recomendações?",
        alternativas: [
            { texto: "Devem", valor: "positivo" },
            { texto: "Não devem", valor: "negativo" }
        ]
    }
];

let indiceAtual = 0;
let respostas = [];

function exibirPergunta() {
    const perguntaAtual = perguntas[indiceAtual];
    caixaPerguntas.textContent = perguntaAtual.enunciado;

    caixaAlternativas.innerHTML = '';

    perguntaAtual.alternativas.forEach((alternativa, index) => {
        const botao = document.createElement("button");
        botao.textContent = alternativa.texto;
        botao.addEventListener("click", () => selecionarAlternativa(index));
        caixaAlternativas.appendChild(botao);
    });

    caixaResultado.style.display = "none";
}

function selecionarAlternativa(indice) {
 
    const valorResposta = perguntas[indiceAtual].alternativas[indice].valor;
    respostas.push(valorResposta);

    indiceAtual++;
    if (indiceAtual < perguntas.length) {
        exibirPergunta();
    } else {
        gerarConclusao();
    }
}

function gerarConclusao() {
    const positivas = respostas.filter(resposta => resposta === "positivo").length;
    const negativas = respostas.filter(resposta => resposta === "negativo").length;

    let conclusao = '';
    if (positivas > negativas) {
        conclusao = "Você tem uma visão positiva sobre o impacto da IA e segurança digital.";
    } else if (negativas > positivas) {
        conclusao = "Você tem preocupações significativas sobre o impacto da IA e segurança digital.";
    } else {
        conclusao = "Você tem uma visão equilibrada sobre o impacto da IA e segurança digital.";
    }

    caixaPerguntas.style.display = "none";
    caixaAlternativas.style.display = "none";

    textoResultado.textContent = conclusao;
    caixaResultado.style.display = "block";

    setTimeout(reiniciarQuiz, 5000);
}

function reiniciarQuiz() {
    indiceAtual = 0;
    respostas = [];
    caixaPerguntas.style.display = "block";
    caixaAlternativas.style.display = "block";
    exibirPergunta();
}

exibirPergunta();
