// 1. Importações do SDK do Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";
import { getFirestore, doc, setDoc, getDoc } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

// 2. Chaves do seu Projeto 'Reparinhos'
const firebaseConfig = {
    apiKey: "AIzaSyD3Un6TzwRP_uCMbH_5Icu48ayJpdrifKY",
    authDomain: "reparinhos.firebaseapp.com",
    projectId: "reparinhos",
    storageBucket: "reparinhos.firebasestorage.app",
    messagingSenderId: "723417655069",
    appId: "1:723417655069:web:475bba950ec23453bd23f4"
};

// Inicializa o Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// 3. Banco de Dados Local de Reparos (A lista do app)
const listagemServicos = {
    'hidraulica': {
        titulo: 'Hidráulica',
        reparos: [
            { nome: 'Troca de sifão', desc: 'Pia da cozinha ou banheiro' },
            { nome: 'Conserto de vazamento', desc: 'Torneiras e registros pingando' },
            { nome: 'Instalação de chuveiro', desc: 'Chuveiro elétrico ou ducha' },
            { nome: 'Desentupimento de ralo', desc: 'Pias e ralos superficiais' }
        ]
    },
    'eletrica': {
        titulo: 'Elétrica',
        reparos: [
            { nome: 'Tomadas e interruptores', desc: 'Troca ou nova instalação' },
            { nome: 'Troca de disjuntor', desc: 'Substituição de peça defeituosa' },
            { nome: 'Ventilador de teto', desc: 'Montagem e instalação elétrica' },
            { nome: 'Luminárias/Lâmpadas', desc: 'Lustres, plafons e spots' }
        ]
    },
    'montagem': {
        titulo: 'Montagem',
        reparos: [
            { nome: 'Montagem de móveis', desc: 'Guarda-roupa, mesas, estantes' },
            { nome: 'Instalação de prateleiras', desc: 'Furação e nivelamento' },
            { nome: 'Suporte para TV', desc: 'Fixação segura na parede' },
            { nome: 'Quadros e Espelhos', desc: 'Furação sem sujeira' }
        ]
    },
    'pintura': {
        titulo: 'Pintura',
        reparos: [
            { nome: 'Pintura de pequenas paredes', desc: 'Até 10m²' },
            { nome: 'Retoque de pintura', desc: 'Correção de manchas' },
            { nome: 'Massa corrida', desc: 'Tapar furos e pequenos buracos' },
            { nome: 'Portas e Janelas', desc: 'Pintura ou envernizamento' }
        ]
    }
};

document.addEventListener("DOMContentLoaded", () => {
    
    // --- LÓGICA DE NAVEGAÇÃO BÁSICA (MENU INFERIOR) ---
    const navItems = document.querySelectorAll('.nav-item');
    const views = document.querySelectorAll('.app-content');

    function changeView(viewId) {
        views.forEach(view => view.classList.remove('active'));
        const target = document.getElementById(viewId);
        if(target) target.classList.add('active');
    }

    navItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            navItems.forEach(nav => nav.classList.remove('active'));
            item.classList.add('active');
            changeView(item.getAttribute('data-target'));
        });
    });


    // --- LÓGICA DAS CATEGORIAS (CLICAR NO CARD E ABRIR LISTA) ---
    const catCards = document.querySelectorAll('.cat-card');
    const btnBackHome = document.getElementById('btn-back-home');
    const categoryTitle = document.getElementById('category-title');
    const repairsListContainer = document.getElementById('repairs-list');

    // Ao clicar em uma categoria da Home
    catCards.forEach(card => {
        card.addEventListener('click', () => {
            const catKey = card.getAttribute('data-category');
            const data = listagemServicos[catKey];

            if(data) {
                // Atualiza o título
                categoryTitle.textContent = data.titulo;
                
                // Limpa a lista antiga e gera os novos cards de serviço
                repairsListContainer.innerHTML = '';
                data.reparos.forEach(servico => {
                    const itemDiv = document.createElement('div');
                    itemDiv.className = 'repair-item';
                    itemDiv.innerHTML = `
                        <div class="repair-info">
                            <h5>${servico.nome}</h5>
                            <p>${servico.desc}</p>
                        </div>
                        <button class="btn-agendar">Pedir</button>
                    `;
                    repairsListContainer.appendChild(itemDiv);
                });

                // Muda de tela
                changeView('view-category-details');
                // Remove seleção visual do menu inferior pois estamos em uma sub-tela
                navItems.forEach(nav => nav.classList.remove('active'));
            }
        });
    });

    // Botão Voltar da tela de Categorias
    btnBackHome.addEventListener('click', () => {
        changeView('view-home');
        // Devolve seleção visual ao botão Home
        document.querySelector('[data-target="view-home"]').classList.add('active');
    });

    // Botão "Pedir Agora" do Banner vai para o perfil
    document.getElementById('btn-banner-pedir').addEventListener('click', () => {
        navItems.forEach(nav => nav.classList.remove('active'));
        document.querySelector('[data-target="view-profile"]').classList.add('active');
        changeView('view-profile');
    });


    // --- LÓGICA DE AUTENTICAÇÃO (FIREBASE) ---
    let isLoginMode = true;
    const tabLogin = document.getElementById('tab-login');
    const tabRegister = document.getElementById('tab-register');
    const groupName = document.getElementById('group-name');
    const groupType = document.getElementById('group-type');
    const btnSubmit = document.getElementById('btn-auth-submit');
    const authForm = document.getElementById('auth-form');
    const authMessage = document.getElementById('auth-message');

    tabLogin.addEventListener('click', () => {
        isLoginMode = true;
        tabLogin.classList.add('active');
        tabRegister.classList.remove('active');
        groupName.classList.add('hidden');
        groupType.classList.add('hidden');
        btnSubmit.textContent = "Entrar";
        authMessage.textContent = "";
    });

    tabRegister.addEventListener('click', () => {
        isLoginMode = false;
        tabRegister.classList.add('active');
        tabLogin.classList.remove('active');
        groupName.classList.remove('hidden');
        groupType.classList.remove('hidden');
        btnSubmit.textContent = "Criar Conta";
        authMessage.textContent = "";
    });

    // Cadastro / Login Envio
    authForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const email = document.getElementById('input-email').value;
        const password = document.getElementById('input-password').value;
        const name = document.getElementById('input-name').value;
        const userType = document.getElementById('select-type').value;

        authMessage.className = "auth-message";
        authMessage.textContent = "Aguarde...";

        try {
            if (isLoginMode) {
                await signInWithEmailAndPassword(auth, email, password);
                authMessage.className = "auth-message success";
                authMessage.textContent = "Login efetuado com sucesso!";
            } else {
                if (!name) {
                    authMessage.className = "auth-message error";
                    authMessage.textContent = "Por favor, digite seu nome.";
                    return;
                }
                const userCredential = await createUserWithEmailAndPassword(auth, email, password);
                const user = userCredential.user;

                // Salva no Firestore
                await setDoc(doc(db, "usuarios", user.uid), {
                    nome: name,
                    email: email,
                    tipo: userType,
                    criadoEm: new Date()
                });
                authMessage.className = "auth-message success";
                authMessage.textContent = "Conta criada com sucesso!";
            }
        } catch (error) {
            authMessage.className = "auth-message error";
            switch (error.code) {
                case 'auth/email-already-in-use': authMessage.textContent = "E-mail já cadastrado."; break;
                case 'auth/weak-password': authMessage.textContent = "Senha muito fraca (mín. 6)."; break;
                case 'auth/invalid-credential':
                case 'auth/user-not-found':
                case 'auth/wrong-password': authMessage.textContent = "Dados incorretos."; break;
                default: authMessage.textContent = "Erro: " + error.message;
            }
        }
    });

    // Logout
    document.getElementById('btn-logout').addEventListener('click', () => {
        signOut(auth);
    });

    // Monitora Mudanças de Estado do Usuário
    onAuthStateChanged(auth, async (user) => {
        const authContainer = document.getElementById('auth-container');
        const profileContainer = document.getElementById('user-profile-container');
        const headerUserName = document.getElementById('header-user-name');
        const headerUserStatus = document.getElementById('header-user-status');

        if (user) {
            authContainer.classList.add('hidden');
            profileContainer.classList.remove('hidden');

            const docRef = doc(db, "usuarios", user.uid);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                const userData = docSnap.data();
                document.getElementById('profile-name').textContent = userData.nome;
                document.getElementById('profile-email').textContent = userData.email;
                document.getElementById('profile-type-badge').textContent = userData.tipo === 'cliente' ? 'Cliente' : 'Profissional';
                
                headerUserName.textContent = `Olá, ${userData.nome.split(' ')[0]} 👋`;
                headerUserStatus.textContent = userData.tipo === 'cliente' ? 'O que vamos consertar hoje?' : 'Pronto para os serviços?';
            }
        } else {
            authContainer.classList.remove('hidden');
            profileContainer.classList.add('hidden');
            headerUserName.textContent = "Olá, Visitante 👋";
            headerUserStatus.textContent = "O que vamos consertar hoje?";
        }
    });
});
