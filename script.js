// 1. Importações do Firebase (Agora com Google Auth)
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";
import { getFirestore, doc, setDoc, getDoc } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

// 2. Chaves do seu Projeto 'Reparinhos'
const firebaseConfig = {
  apiKey: "AIzaSyD3Un6TzwRP_uCMBh_5Icu48ayJpdrifKY",
  authDomain: "reparinhos.firebaseapp.com",
  projectId: "reparinhos",
  storageBucket: "reparinhos.firebasestorage.app",
  messagingSenderId: "723417655069",
  appId: "1:723417655069:web:475bba950ec23453bd23f4"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const googleProvider = new GoogleAuthProvider();
// termina aqui




// Initialize Firebase
const app = initializeApp(firebaseConfig);
// 3. Banco de Dados Local de Reparos
const listagemServicos = {
    'hidraulica': { titulo: 'Hidráulica', reparos: [{ nome: 'Troca de sifão', desc: 'Pia da cozinha/banheiro' }, { nome: 'Conserto de vazamento', desc: 'Torneiras e registros' }, { nome: 'Instalação de chuveiro', desc: 'Chuveiro ou ducha' }, { nome: 'Desentupimento de ralo', desc: 'Pias e ralos' }] },
    'eletrica': { titulo: 'Elétrica', reparos: [{ nome: 'Tomadas/interruptores', desc: 'Troca ou nova instalação' }, { nome: 'Troca de disjuntor', desc: 'Substituição' }, { nome: 'Ventilador de teto', desc: 'Montagem e instalação' }, { nome: 'Luminárias/Lâmpadas', desc: 'Lustres e plafons' }] },
    'montagem': { titulo: 'Montagem', reparos: [{ nome: 'Montagem de móveis', desc: 'Guarda-roupa, mesas' }, { nome: 'Instalação de prateleiras', desc: 'Furação e nivelamento' }, { nome: 'Suporte para TV', desc: 'Fixação na parede' }, { nome: 'Quadros e Espelhos', desc: 'Furação sem sujeira' }] },
    'pintura': { titulo: 'Pintura', reparos: [{ nome: 'Pintura de paredes', desc: 'Até 10m²' }, { nome: 'Retoque de pintura', desc: 'Correção de manchas' }, { nome: 'Massa corrida', desc: 'Tapar pequenos buracos' }, { nome: 'Portas e Janelas', desc: 'Pintura/envernizamento' }] }
};

document.addEventListener("DOMContentLoaded", () => {
    
    // --- NAVEGAÇÃO BÁSICA ---
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

    // --- LÓGICA DAS CATEGORIAS (Cards) ---
    const catCards = document.querySelectorAll('.cat-card');
    const repairsListContainer = document.getElementById('repairs-list');

    catCards.forEach(card => {
        card.addEventListener('click', () => {
            const catKey = card.getAttribute('data-category');
            const data = listagemServicos[catKey];

            if(data) {
                document.getElementById('category-title').textContent = data.titulo;
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

                changeView('view-category-details');
                navItems.forEach(nav => nav.classList.remove('active'));
            }
        });
    });

    document.getElementById('btn-back-home').addEventListener('click', () => {
        changeView('view-home');
        document.querySelector('[data-target="view-home"]').classList.add('active');
    });

    document.getElementById('btn-banner-pedir').addEventListener('click', () => {
        navItems.forEach(nav => nav.classList.remove('active'));
        document.querySelector('[data-target="view-profile"]').classList.add('active');
        changeView('view-profile');
    });

    // --- LÓGICA DO FIREBASE / LOGIN GOOGLE ---
    const loginContainer = document.getElementById('auth-login-container');
    const completionContainer = document.getElementById('auth-completion-container');
    const profileContainer = document.getElementById('user-profile-container');

    // Botão de Login com Google
    document.getElementById('btn-google-login').addEventListener('click', async () => {
        const errorMsg = document.getElementById('auth-error-message');
        errorMsg.textContent = "Abrindo o Google...";
        try {
            await signInWithPopup(auth, googleProvider);
            errorMsg.textContent = "";
        } catch (error) {
            errorMsg.textContent = "Erro ao fazer login: " + error.message;
        }
    });

    // Salvar Dados Complementares do Perfil
    document.getElementById('completion-form').addEventListener('submit', async (e) => {
        e.preventDefault();
        const user = auth.currentUser;
        if (!user) return;

        const btnSave = document.getElementById('btn-save-profile');
        btnSave.textContent = "Salvando...";
        
        const dadosPerfil = {
            nome: document.getElementById('comp-nome').value,
            cpf: document.getElementById('comp-cpf').value,
            whatsapp: document.getElementById('comp-whatsapp').value,
            cep: document.getElementById('comp-cep').value,
            endereco: document.getElementById('comp-endereco').value,
            email: user.email,
            tipo: 'cliente',
            perfilCompleto: true,
            atualizadoEm: new Date()
        };

        try {
            // Salva no banco de dados (mescla com qualquer dado existente)
            await setDoc(doc(db, "usuarios", user.uid), dadosPerfil, { merge: true });
            btnSave.textContent = "Salvo com sucesso!";
            
            // Força a atualização da interface verificando o estado da Auth novamente
            verificarEstadoUsuario(user);
        } catch (error) {
            alert("Erro ao salvar: " + error.message);
            btnSave.textContent = "Tentar Novamente";
        }
    });

    // Botão Sair
    document.getElementById('btn-logout').addEventListener('click', () => {
        signOut(auth);
    });

    // Função que gerencia o que o usuário vê (Login > Completar Perfil > Perfil Logado)
    async function verificarEstadoUsuario(user) {
        const headerUserName = document.getElementById('header-user-name');
        
        if (user) {
            // Usuário logado. Vamos checar se o perfil está completo no Banco de Dados
            const docRef = doc(db, "usuarios", user.uid);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists() && docSnap.data().perfilCompleto === true) {
                // ESTADO 3: PERFIL COMPLETO E LOGADO
                const userData = docSnap.data();
                
                loginContainer.classList.add('hidden');
                completionContainer.classList.add('hidden');
                profileContainer.classList.remove('hidden');

                document.getElementById('profile-name').textContent = userData.nome;
                document.getElementById('profile-email').textContent = userData.email;
                document.getElementById('profile-zap').textContent = userData.whatsapp;
                document.getElementById('profile-end').textContent = userData.endereco;
                
                headerUserName.textContent = `Olá, ${userData.nome.split(' ')[0]} 👋`;

                // Coloca a foto do Google se tiver
                if (user.photoURL) {
                    document.getElementById('profile-icon').style.display = 'none';
                    const pic = document.getElementById('profile-pic');
                    pic.src = user.photoURL;
                    pic.style.display = 'block';
                }

            } else {
                // ESTADO 2: PRECISA COMPLETAR O PERFIL
                loginContainer.classList.add('hidden');
                profileContainer.classList.add('hidden');
                completionContainer.classList.remove('hidden');
                
                // Pré-preenche o nome caso o Google tenha fornecido
                if(user.displayName) {
                    document.getElementById('comp-nome').value = user.displayName;
                }
            }
        } else {
            // ESTADO 1: NÃO LOGADO
            loginContainer.classList.remove('hidden');
            completionContainer.classList.add('hidden');
            profileContainer.classList.add('hidden');
            headerUserName.textContent = "Olá, Visitante 👋";
        }
    }

    // Monitora Mudanças de Estado do Usuário no Firebase
    onAuthStateChanged(auth, verificarEstadoUsuario);
});
