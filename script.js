let botaoMenu = document.getElementById("botaoMenu");
let menuMobile = document.getElementById("menuMobile");
let botaoCarrinho = document.getElementById("botaoCarrinho");
let painelCarrinho = document.getElementById("painelCarrinho");
let fecharCarrinho = document.getElementById("fecharCarrinho");

let botoesAdicionar = document.querySelectorAll(".adicionar-carrinho");
let contadorCarrinho = document.getElementById("contadorCarrinho");
let mensagemCarrinho = document.getElementById("mensagemCarrinho");
let itensCarrinho = document.getElementById("itensCarrinho");
let totalCarrinho = document.getElementById("totalCarrinho");

let itensKit = document.querySelectorAll(".item-kit");
let totalKit = document.getElementById("totalKit");
let botaoAdicionarKit =
    document.getElementById("adicionarKitCarrinho");


// Recupera o carrinho salvo no navegador.
// Se não existir nenhum carrinho salvo, começa com um array vazio.
let carrinho =
    JSON.parse(localStorage.getItem("carrinho")) || [];


/* =====================
MENU
===================== */

if (botaoMenu && menuMobile) {

    botaoMenu.addEventListener("click", function() {

        menuMobile.classList.toggle("aberto");

        if (menuMobile.classList.contains("aberto")) {

            botaoMenu.textContent = "✕";
            botaoMenu.setAttribute("aria-label", "Fechar menu");

        } else {

            botaoMenu.textContent = "☰";
            botaoMenu.setAttribute("aria-label", "Abrir menu");

        }

    });


    document.addEventListener("click", function(evento) {

        if (
            menuMobile.classList.contains("aberto") &&
            !menuMobile.contains(evento.target) &&
            !botaoMenu.contains(evento.target)
        ) {

            menuMobile.classList.remove("aberto");

            botaoMenu.textContent = "☰";
            botaoMenu.setAttribute("aria-label", "Abrir menu");

        }

    });

}


/* =====================
ABRIR E FECHAR CARRINHO
===================== */

if (botaoCarrinho && painelCarrinho) {

    botaoCarrinho.addEventListener("click", function() {

        painelCarrinho.classList.add("aberto");

    });

}


if (fecharCarrinho && painelCarrinho) {

    fecharCarrinho.addEventListener("click", function() {

        painelCarrinho.classList.remove("aberto");

    });

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

    carrinho.forEach(function(produto) {

        quantidadeTotal += produto.quantidade;

    });


    if (contadorCarrinho) {

        contadorCarrinho.textContent = quantidadeTotal;

    }

}


/* =====================
ADICIONAR PRODUTOS
===================== */

botoesAdicionar.forEach(function(botao) {

    botao.addEventListener("click", function() {

        let cardProduto =
            botao.closest(".produto-card");

        let nomeProduto =
            cardProduto.dataset.nome;

        let precoProduto =
            Number(cardProduto.dataset.preco);

        let imagemProduto =
            cardProduto.querySelector("img").src;


        let produtoExistente =
            carrinho.find(function(produto) {

                return produto.nome === nomeProduto;

            });


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

            mensagemCarrinho.classList.add("mostrar");

            setTimeout(function() {

                mensagemCarrinho.classList.remove("mostrar");

            }, 2000);

        }

    });

});


/* =====================
MOSTRAR PRODUTOS NO CARRINHO
===================== */

function mostrarCarrinho() {

    // Atualiza o número do carrinho
    atualizarContadorCarrinho();


    // Algumas páginas ainda não possuem
    // o painel visual do carrinho.
    if (!itensCarrinho || !totalCarrinho) {

        return;

    }


    itensCarrinho.innerHTML = "";

    let total = 0;


    carrinho.forEach(function(produto, indice) {

        total +=
            produto.preco * produto.quantidade;


        let item =
            document.createElement("div");


        item.classList.add("item-carrinho");


        item.innerHTML = `
            <img src="${produto.imagem}" alt="${produto.nome}">

            <div>

                <p class="item-carrinho-nome">
                    ${produto.nome}
                </p>

                <p class="item-carrinho-quantidade">
                    Qtd. ${produto.quantidade}
                </p>

            </div>

            <span class="item-carrinho-preco">

                R$ ${(produto.preco * produto.quantidade)
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
            item.querySelector(".adicionar-mais");


        botaoAdicionarMais.addEventListener(
            "click",
            function() {

                produto.quantidade++;

                salvarCarrinho();

                mostrarCarrinho();

            }
        );


        let botaoRemover =
            item.querySelector(".remover-item");


        botaoRemover.addEventListener(
            "click",
            function() {

                if (produto.quantidade > 1) {

                    produto.quantidade--;

                } else {

                    carrinho.splice(indice, 1);

                }


                salvarCarrinho();

                mostrarCarrinho();

            }
        );


        itensCarrinho.appendChild(item);

    });


    totalCarrinho.textContent =
        "R$ " +
        total.toFixed(2).replace(".", ",");

}


/* =====================
QUANTIDADE DO KIT FESTA
===================== */

itensKit.forEach(function(item) {

    let botaoMais =
        item.querySelector(".aumentar-quantidade");

    let botaoMenos =
        item.querySelector(".diminuir-quantidade");

    let quantidadeTexto =
        item.querySelector(".quantidade-kit");

    let quantidade = 0;


    botaoMais.addEventListener(
        "click",
        function() {

            quantidade++;

            quantidadeTexto.textContent =
                quantidade;

            calcularTotalKit();

        }
    );


    botaoMenos.addEventListener(
        "click",
        function() {

            if (quantidade > 0) {

                quantidade--;

                quantidadeTexto.textContent =
                    quantidade;

                calcularTotalKit();

            }

        }
    );

});


/* =====================
CALCULAR TOTAL DO KIT
===================== */

function calcularTotalKit() {

    let total = 0;


    itensKit.forEach(function(item) {

        let preco =
            Number(item.dataset.preco);

        let quantidade =
            Number(
                item.querySelector(
                    ".quantidade-kit"
                ).textContent
            );


        total += preco * quantidade;

    });


    if (totalKit) {

        totalKit.textContent =
            "R$ " +
            total.toFixed(2).replace(".", ",");

    }

}


/* =====================
CARREGAR CARRINHO SALVO
===================== */

// Quando uma página é aberta,
// mostra o carrinho que estava salvo.
mostrarCarrinho();

/* =====================
ADICIONAR KIT AO CARRINHO
===================== */

if (botaoAdicionarKit) {

    botaoAdicionarKit.addEventListener("click", function() {

        let valorTotalKit = 0;


        // Calcula o valor total do kit montado
        itensKit.forEach(function(item) {

            let preco =
                Number(item.dataset.preco);

            let quantidade =
                Number(
                    item.querySelector(
                        ".quantidade-kit"
                    ).textContent
                );

            valorTotalKit += preco * quantidade;

        });


        // Se nenhum produto foi escolhido
        if (valorTotalKit === 0) {

            if (mensagemCarrinho) {

                mensagemCarrinho.textContent =
                    "Escolha pelo menos um item para montar seu kit.";

                mensagemCarrinho.classList.add("erro");
                mensagemCarrinho.classList.add("mostrar");
                

                setTimeout(function() {

                    mensagemCarrinho.classList.remove("mostrar");

                }, 2000);

            }

            return;

        }


        // Cria o Kit Festa
        let kit = {

            nome: "Kit Festa",
            preco: valorTotalKit,
            imagem: "img/kit-festa-home.jpg",
            quantidade: 1

        };


        // Adiciona o kit ao carrinho
        carrinho.push(kit);

        salvarCarrinho();

        atualizarContadorCarrinho();


        // Mostra mensagem de sucesso
        if (mensagemCarrinho) {

            mensagemCarrinho.textContent =
                "Kit Festa adicionado ao carrinho com sucesso!";
            
            mensagemCarrinho.classList.remove("erro");
            mensagemCarrinho.classList.add("mostrar");

            setTimeout(function() {

                mensagemCarrinho.classList.remove("mostrar");

            }, 2000);

        }

    });

}