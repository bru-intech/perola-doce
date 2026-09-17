/* =====================
ELEMENTOS DA PÁGINA
===================== */

// Menu
let botaoMenu = document.getElementById("botaoMenu");
let menuMobile = document.getElementById("menuMobile");

// Carrinho
let botaoCarrinho = document.getElementById("botaoCarrinho");
let painelCarrinho = document.getElementById("painelCarrinho");
let fecharCarrinho = document.getElementById("fecharCarrinho");

let botoesAdicionar =
    document.querySelectorAll(".adicionar-carrinho");

let contadorCarrinho =
    document.getElementById("contadorCarrinho");

let mensagemCarrinho =
    document.getElementById("mensagemCarrinho");

let itensCarrinho =
    document.getElementById("itensCarrinho");

let totalCarrinho =
    document.getElementById("totalCarrinho");

let finalizarPedido =
    document.getElementById("finalizarPedido");


// Kit Festa
let itensKit =
    document.querySelectorAll(".item-kit");

let totalKit =
    document.getElementById("totalKit");

let botaoAdicionarKit =
    document.getElementById("adicionarKitCarrinho");


// Identificação do cliente
let boasVindas =
    document.getElementById("boasVindas");

let nomeCliente =
    document.getElementById("nomeCliente");

let entrarSite =
    document.getElementById("entrarSite");

let erroNome =
    document.getElementById("erroNome");

let saudacaoCliente =
    document.getElementById("saudacaoCliente");


// Checkout
let nomeCheckout =
    document.getElementById("nomeCheckout");

let itensCheckout =
    document.getElementById("itensCheckout");

let totalCheckout =
    document.getElementById("totalCheckout");


/* =====================
DADOS SALVOS
===================== */

// Recupera o carrinho salvo.
// Se não existir, começa vazio.
let carrinho =
    JSON.parse(localStorage.getItem("carrinho")) || [];


// Recupera o nome salvo.
let nomeSalvo =
    localStorage.getItem("nomeCliente");


/* =====================
IDENTIFICAÇÃO DO CLIENTE
===================== */

if (entrarSite) {

    entrarSite.addEventListener("click", function () {

        let nome =
            nomeCliente.value.trim();

        if (nome === "") {

            erroNome.textContent =
                "Digite seu nome para continuar.";

            return;
        }

        localStorage.setItem(
            "nomeCliente",
            nome
        );

        if (saudacaoCliente) {
    saudacaoCliente.innerHTML = `
        <strong>Olá, ${nome}!</strong>
        <span>Que bom te ver por aqui.</span>
    `;
}

        boasVindas.style.display = "none";

    });

}


// Se já existe nome salvo,
// não mostra novamente a entrada.
if (boasVindas && nomeSalvo) {

    boasVindas.style.display = "none";

}


// Mostra "Olá, Nome!" na página inicial.
if (saudacaoCliente && nomeSalvo) {

    saudacaoCliente.innerHTML = `
    <strong>Olá, ${nomeSalvo}!</strong>
    <span>Que bom te ver por aqui.</span>
`;

}


// Mostra o nome no checkout.
if (nomeCheckout && nomeSalvo) {

    nomeCheckout.textContent =
        nomeSalvo;

}


/* =====================
MENU
===================== */

if (botaoMenu && menuMobile) {

    botaoMenu.addEventListener(
        "click",
        function () {

            menuMobile.classList.toggle("aberto");

            if (
                menuMobile.classList.contains("aberto")
            ) {

                botaoMenu.textContent = "✕";

                botaoMenu.setAttribute(
                    "aria-label",
                    "Fechar menu"
                );

            } else {

                botaoMenu.textContent = "☰";

                botaoMenu.setAttribute(
                    "aria-label",
                    "Abrir menu"
                );

            }

        }
    );


    document.addEventListener(
        "click",
        function (evento) {

            if (
                menuMobile.classList.contains("aberto") &&
                !menuMobile.contains(evento.target) &&
                !botaoMenu.contains(evento.target)
            ) {

                menuMobile.classList.remove("aberto");

                botaoMenu.textContent = "☰";

                botaoMenu.setAttribute(
                    "aria-label",
                    "Abrir menu"
                );

            }

        }
    );

}


/* =====================
ABRIR E FECHAR CARRINHO
===================== */

if (botaoCarrinho && painelCarrinho) {

    botaoCarrinho.addEventListener(
        "click",
        function () {

            painelCarrinho.classList.add("aberto");

        }
    );

}


if (fecharCarrinho && painelCarrinho) {

    fecharCarrinho.addEventListener(
        "click",
        function () {

            painelCarrinho.classList.remove("aberto");

        }
    );

}


/* =====================
FINALIZAR PEDIDO
===================== */

if (finalizarPedido) {

    finalizarPedido.addEventListener(
        "click",
        function () {

            window.location.href =
                "checkout.html";

        }
    );

}


/* =====================
SALVAR CARRINHO
===================== */

function salvarCarrinho() {

    localStorage.setItem(
        "carrinho",
        JSON.stringify(carrinho)
    );

}


/* =====================
ATUALIZAR CONTADOR
===================== */

function atualizarContadorCarrinho() {

    let quantidadeTotal = 0;

    carrinho.forEach(
        function (produto) {

            quantidadeTotal +=
                produto.quantidade;

        }
    );


    if (contadorCarrinho) {

        contadorCarrinho.textContent =
            quantidadeTotal;

    }

}


/* =====================
ADICIONAR PRODUTOS
===================== */

botoesAdicionar.forEach(
    function (botao) {

        botao.addEventListener(
            "click",
            function () {

                let cardProduto =
                    botao.closest(".produto-card");

                let nomeProduto =
                    cardProduto.dataset.nome;

                let precoProduto =
                    Number(
                        cardProduto.dataset.preco
                    );

                let imagemProduto =
                    cardProduto
                        .querySelector("img")
                        .src;


                let produtoExistente =
                    carrinho.find(
                        function (produto) {

                            return (
                                produto.nome === nomeProduto
                            );

                        }
                    );


                if (produtoExistente) {

                    produtoExistente.quantidade++;

                } else {

                    let produto = {

                        nome: nomeProduto,
                        preco: precoProduto,
                        imagem: imagemProduto,
                        quantidade: 1

                    };

                    carrinho.push(produto);

                }


                salvarCarrinho();

                mostrarCarrinho();


                if (mensagemCarrinho) {

                    mensagemCarrinho
                        .classList
                        .add("mostrar");

                    setTimeout(
                        function () {

                            mensagemCarrinho
                                .classList
                                .remove("mostrar");

                        },
                        2000
                    );

                }

            }
        );

    }
);


/* =====================
MOSTRAR PRODUTOS
NO CARRINHO
===================== */

function mostrarCarrinho() {

    atualizarContadorCarrinho();


    if (
        !itensCarrinho ||
        !totalCarrinho
    ) {

        return;

    }


    itensCarrinho.innerHTML = "";

    let total = 0;


    carrinho.forEach(
        function (produto, indice) {

            let subtotal =
                produto.preco *
                produto.quantidade;

            total += subtotal;


            let item =
                document.createElement("div");

            item.classList.add(
                "item-carrinho"
            );


            item.innerHTML = `
                <img
                    src="${produto.imagem}"
                    alt="${produto.nome}"
                >

                <div>

                    <p class="item-carrinho-nome">
                        ${produto.nome}
                    </p>

                    <p class="item-carrinho-quantidade">
                        Qtd. ${produto.quantidade}
                    </p>

                </div>

                <span class="item-carrinho-preco">
                    R$ ${subtotal
                        .toFixed(2)
                        .replace(".", ",")}
                </span>

                <div class="item-carrinho-acoes">

                    <button class="adicionar-mais">
                        + Adicionar
                    </button>

                    <button class="remover-item">

                        <svg
                            class="icone-lixeira"
                            viewBox="0 0 24 24"
                            aria-hidden="true"
                        >
                            <path d="M3 6h18"></path>
                            <path d="M8 6V4h8v2"></path>
                            <path d="M19 6l-1 14H6L5 6"></path>
                            <path d="M10 10v6"></path>
                            <path d="M14 10v6"></path>
                        </svg>

                        Remover

                    </button>

                </div>
            `;


            let botaoAdicionarMais =
                item.querySelector(
                    ".adicionar-mais"
                );


            botaoAdicionarMais.addEventListener(
                "click",
                function () {

                    produto.quantidade++;

                    salvarCarrinho();

                    mostrarCarrinho();

                }
            );


            let botaoRemover =
                item.querySelector(
                    ".remover-item"
                );


            botaoRemover.addEventListener(
                "click",
                function () {

                    if (
                        produto.quantidade > 1
                    ) {

                        produto.quantidade--;

                    } else {

                        carrinho.splice(
                            indice,
                            1
                        );

                    }


                    salvarCarrinho();

                    mostrarCarrinho();

                }
            );


            itensCarrinho.appendChild(
                item
            );

        }
    );


    totalCarrinho.textContent =
        "R$ " +
        total
            .toFixed(2)
            .replace(".", ",");

}


/* =====================
CHECKOUT
===================== */

function mostrarCheckout() {

    if (
        !itensCheckout ||
        !totalCheckout
    ) {

        return;

    }


    itensCheckout.innerHTML = "";

    let total = 0;


    carrinho.forEach(
        function (produto) {

            let subtotal =
                produto.preco *
                produto.quantidade;

            total += subtotal;


            let item =
                document.createElement("div");

            item.classList.add(
                "checkout-item"
            );


            item.innerHTML = `
                <span>
                    ${produto.nome}
                    x${produto.quantidade}
                </span>

                <strong>
                    R$ ${subtotal
                        .toFixed(2)
                        .replace(".", ",")}
                </strong>
            `;


            itensCheckout.appendChild(
                item
            );

        }
    );


    totalCheckout.textContent =
        "R$ " +
        total
            .toFixed(2)
            .replace(".", ",");

}


/* =====================
QUANTIDADE DO KIT FESTA
===================== */

itensKit.forEach(
    function (item) {

        let botaoMais =
            item.querySelector(
                ".aumentar-quantidade"
            );

        let botaoMenos =
            item.querySelector(
                ".diminuir-quantidade"
            );

        let quantidadeTexto =
            item.querySelector(
                ".quantidade-kit"
            );

        let quantidade = 0;


        botaoMais.addEventListener(
            "click",
            function () {

                quantidade++;

                quantidadeTexto.textContent =
                    quantidade;

                calcularTotalKit();

            }
        );


        botaoMenos.addEventListener(
            "click",
            function () {

                if (quantidade > 0) {

                    quantidade--;

                    quantidadeTexto.textContent =
                        quantidade;

                    calcularTotalKit();

                }

            }
        );

    }
);


/* =====================
CALCULAR TOTAL DO KIT
===================== */

function calcularTotalKit() {

    let total = 0;


    itensKit.forEach(
        function (item) {

            let preco =
                Number(
                    item.dataset.preco
                );

            let quantidade =
                Number(
                    item
                        .querySelector(
                            ".quantidade-kit"
                        )
                        .textContent
                );


            total +=
                preco * quantidade;

        }
    );


    if (totalKit) {

        totalKit.textContent =
            "R$ " +
            total
                .toFixed(2)
                .replace(".", ",");

    }

}


/* =====================
ADICIONAR KIT AO CARRINHO
===================== */

if (botaoAdicionarKit) {

    botaoAdicionarKit.addEventListener(
        "click",
        function () {

            let valorTotalKit = 0;


            itensKit.forEach(
                function (item) {

                    let preco =
                        Number(
                            item.dataset.preco
                        );

                    let quantidade =
                        Number(
                            item
                                .querySelector(
                                    ".quantidade-kit"
                                )
                                .textContent
                        );


                    valorTotalKit +=
                        preco * quantidade;

                }
            );


            if (valorTotalKit === 0) {

                if (mensagemCarrinho) {

                    mensagemCarrinho.textContent =
                        "Escolha pelo menos um item para montar seu kit.";

                    mensagemCarrinho
                        .classList
                        .add("erro");

                    mensagemCarrinho
                        .classList
                        .add("mostrar");


                    setTimeout(
                        function () {

                            mensagemCarrinho
                                .classList
                                .remove("mostrar");

                        },
                        2000
                    );

                }

                return;

            }


            let kit = {

                nome: "Kit Festa",
                preco: valorTotalKit,
                imagem: "img/kit-festa-home.jpg",
                quantidade: 1

            };


            carrinho.push(kit);

            salvarCarrinho();

            mostrarCarrinho();


            if (mensagemCarrinho) {

                mensagemCarrinho.textContent =
                    "Kit Festa adicionado ao carrinho com sucesso!";

                mensagemCarrinho
                    .classList
                    .remove("erro");

                mensagemCarrinho
                    .classList
                    .add("mostrar");


                setTimeout(
                    function () {

                        mensagemCarrinho
                            .classList
                            .remove("mostrar");

                    },
                    2000
                );

            }

        }
    );

}


/* =====================
CARREGAR DADOS DA PÁGINA
===================== */

mostrarCarrinho();

mostrarCheckout();