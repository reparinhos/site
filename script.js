// Importando as ferramentas do Firebase via CDN (compatível com GitHub Pages)
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

// SUAS CHAVE DO PROJETO REPARINHOS
const firebaseConfig = {
  apiKey: "AIzaSyD3Un6TzwRP_uCMbH_5Icu48ayJpdrifKY",
  authDomain: "reparinhos.firebaseapp.com",
  projectId: "reparinhos",
  storageBucket: "reparinhos.firebasestorage.app",
  messagingSenderId: "723417655069",
  appId: "1:723417655069:web:475bba950ec23453bd23f4"
};

// Inicializando o Firebase, Autenticação e Banco de Dados
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Lógica de navegação entre telas do app
document.addEventListener("DOMContentLoaded", () => {
    const navItems = document.querySelectorAll('.nav-item');
    const views = document.querySelectorAll('.app-content');

    navItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();

            navItems.forEach(nav => nav.classList.remove('active'));
            item.classList.add('active');

            const targetViewId = item.getAttribute('data-target');

            views.forEach(view => {
                view.classList.remove('active');
            });

            const targetView = document.getElementById(targetViewId);
            if (targetView) {
                targetView.classList.add('active');
            }
        });
    });
});



document.addEventListener("DOMContentLoaded", () => {
    // Seleciona todos os botões da navegação inferior
    const navItems = document.querySelectorAll('.nav-item');
    // Seleciona todas as áreas de conteúdo (telas)
    const views = document.querySelectorAll('.app-content');

    // Adiciona o evento de toque/clique para cada botão do menu
    navItems.forEach(item => {
        item.addEventListener('click', (e) => {
            // Evita o comportamento padrão
            e.preventDefault();

            // 1. Remove a classe 'active' de todos os botões
            navItems.forEach(nav => nav.classList.remove('active'));
            
            // 2. Adiciona a classe 'active' no botão tocado
            item.classList.add('active');

            // 3. Pega o ID da tela que deve ser aberta (via data-target)
            const targetViewId = item.getAttribute('data-target');

            // 4. Esconde todas as telas
            views.forEach(view => {
                view.classList.remove('active');
            });

            // 5. Mostra apenas a tela solicitada
            const targetView = document.getElementById(targetViewId);
            if (targetView) {
                targetView.classList.add('active');
            }
        });
    });
});
