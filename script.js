// Importando SDKs do Firebase via CDN
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { 
    getAuth, 
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword, 
    signOut, 
    onAuthStateChanged 
} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";
import { 
    getFirestore, 
    doc, 
    setDoc, 
    getDoc 
} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

// Configurações do seu Projeto no Firebase
const firebaseConfig = {
  apiKey: "AIzaSyD3Un6TzwRP_uCMbH_5Icu48ayJpdrifKY",
  authDomain: "reparinhos.firebaseapp.com",
  projectId: "reparinhos",
  storageBucket: "reparinhos.firebasestorage.app",
  messagingSenderId: "723417655069",
  appId: "1:723417655069:web:475bba950ec23453bd23f4"
};

// Inicializações
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Estado atual da aba de autenticação (login ou register)
let isLoginMode = true;

document.addEventListener("DOMContentLoaded", () => {
    // 1. Navegação Bottom Bar
    const navItems = document.querySelectorAll('.nav-item');
    const views = document.querySelectorAll('.app-content');

    navItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            navItems.forEach(nav => nav.classList.remove('active'));
            item.classList.add('active');

            const targetViewId = item.getAttribute('data-target');
            views.forEach(view => view.classList.remove('active'));

            const targetView = document.getElementById(targetViewId);
            if (targetView) targetView.classList.add('active');
        });
    });

    // 2. Elementos da Interface de Autenticação
    const tabLogin = document.getElementById('tab-login');
    const tabRegister = document.getElementById('tab-register');
    const groupName = document.getElementById('group-name');
    const groupType = document.getElementById('group-type');
    const btnSubmit = document.getElementById('btn-auth-submit');
    const authForm = document.getElementById('auth-form');
    const authMessage = document.getElementById('auth-message');

    // Alternar para aba Login
    tabLogin.addEventListener('click', () => {
        isLoginMode = true;
        tabLogin.classList.add('active');
        tabRegister.classList.remove('active');
        groupName.classList.add('hidden');
        groupType.classList.add('hidden');
        btnSubmit.textContent = "Entrar";
        authMessage.textContent = "";
    });

    // Alternar para aba Cadastro
    tabRegister.addEventListener('click', () => {
        isLoginMode = false;
        tabRegister.classList.add('active');
        tabLogin.classList.remove('active');
        groupName.classList.remove('hidden');
        groupType.classList.remove('hidden');
        btnSubmit.textContent = "Criar Conta";
        authMessage.textContent = "";
    });

    // 3. Processo de Envio do Formulário (Login / Cadastro)
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
                // Fazer Login
                await signInWithEmailAndPassword(auth, email, password);
                authMessage.className = "auth-message success";
                authMessage.textContent = "Login efetuado com sucesso!";
            } else {
                // Fazer Cadastro
                if (!name) {
                    authMessage.className = "auth-message error";
                    authMessage.textContent = "Por favor, digite seu nome.";
                    return;
                }

                // 1. Cria usuário no Firebase Auth
                const userCredential = await createUserWithEmailAndPassword(auth, email, password);
                const user = userCredential.user;

                // 2. Salva dados adicionais no Firestore Database
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
            // Traduzindo mensagens de erro comuns do Firebase
            switch (error.code) {
                case 'auth/email-already-in-use':
                    authMessage.textContent = "Este e-mail já está em uso.";
                    break;
                case 'auth/weak-password':
                    authMessage.textContent = "A senha deve ter pelo menos 6 caracteres.";
                    break;
                case 'auth/invalid-credential':
                case 'auth/user-not-found':
                case 'auth/wrong-password':
                    authMessage.textContent = "E-mail ou senha incorretos.";
                    break;
                default:
                    authMessage.textContent = "Erro: " + error.message;
            }
        }
    });

    // 4. Botão de Logout
    document.getElementById('btn-logout').addEventListener('click', () => {
        signOut(auth);
    });

    // 5. Monitorar Estado do Usuário (Logado / Deslogado) em Tempo Real
    onAuthStateChanged(auth, async (user) => {
        const authContainer = document.getElementById('auth-container');
        const profileContainer = document.getElementById('user-profile-container');
        const headerUserName = document.getElementById('header-user-name');
        const headerUserStatus = document.getElementById('header-user-status');

        if (user) {
            // Usuário está logado: Oculta form e mostra Perfil
            authContainer.classList.add('hidden');
            profileContainer.classList.remove('hidden');

            // Busca os dados adicionais no Firestore
            const docRef = doc(db, "usuarios", user.uid);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                const userData = docSnap.data();
                document.getElementById('profile-name').textContent = userData.nome;
                document.getElementById('profile-email').textContent = userData.email;
                document.getElementById('profile-type-badge').textContent = userData.tipo === 'cliente' ? 'Cliente' : 'Profissional';
                
                headerUserName.textContent = `Olá, ${userData.nome.split(' ')[0]} 👋`;
                headerUserStatus.textContent = userData.tipo === 'cliente' ? 'O que vamos consertar hoje?' : 'Pronto para os serviços de hoje?';
            }
        } else {
            // Usuário está deslogado: Mostra form e Oculta Perfil
            authContainer.classList.remove('hidden');
            profileContainer.classList.add('hidden');

            headerUserName.textContent = "Olá, Visitante 👋";
            headerUserStatus.textContent = "O que vamos consertar hoje?";
        }
    });
});
