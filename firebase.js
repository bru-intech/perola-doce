import { initializeApp } from "https://www.gstatic.com/firebasejs/12.19.0/firebase-app.js";
import {
    getAuth
} from "https://www.gstatic.com/firebasejs/12.19.0/firebase-auth.js";

import {
    getFirestore,
    collection,
    addDoc
} from "https://www.gstatic.com/firebasejs/12.19.0/firebase-firestore.js";


// Cole aqui exatamente a configuração
// que aparece no Firebase.
const firebaseConfig = {
    apiKey: "AIzaSyCiCuZdtLejQgbUaFKC3otB-HgWBFLG-Vg",
    authDomain: "perola-doce-6d515.firebaseapp.com",
    projectId: "perola-doce-6d515",
    storageBucket: "perola-doce-6d515.firebasestorage.app",
    messagingSenderId: "395187055698",
    appId: "1:395187055698:web:8524ab10d4af55f056c38b"
};


// Conecta o site ao projeto Firebase.
const app = initializeApp(firebaseConfig);


// Conecta ao banco Cloud Firestore.
const db = getFirestore(app);
const auth = getAuth(app);


// Deixa o banco disponível para usarmos depois.
const confirmarPedido = document.getElementById("confirmarPedido");

if (confirmarPedido) {
    confirmarPedido.addEventListener("click", async () => {

        const nome = localStorage.getItem("nomeCliente");
        const carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];

        if (!nome || carrinho.length === 0) {
            alert("Não foi possível finalizar o pedido.");
            return;
        }

        let total = 0;

        carrinho.forEach(produto => {
            total += produto.preco * produto.quantidade;
        });

        await addDoc(collection(db, "pedidos"), {
            nome: nome,
            itens: carrinho,
            total: total,
            status: "novo"
        });

        alert("Pedido enviado com sucesso! 🎉");
    });
}
export { db, auth };