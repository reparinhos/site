// CONFIGURAÇÕES GERAIS
const CONFIG = {
    whatsappNumber: "5521999999999", // Atualize com o WhatsApp real (DDD 21)
    minSearchLength: 2
};

// DATA STORE DE CATEGORIAS
const categoriesData = [
    { id: "cat-hidraulico", name: "Hidráulico", icon: "💧" },
    { id: "cat-eletrico", name: "Elétrico", icon: "⚡" },
    { id: "cat-pintor", name: "Pintor", icon: "🎨" },
    { id: "cat-pedreiro", name: "Pedreiro", icon: "🧱" },
    { id: "cat-limpeza", name: "Auxiliar de Limpeza", icon: "🧹" },
    { id: "cat-rocador", name: "Roçador", icon: "🌿" }
];

// DATA STORE DE SERVIÇOS
const servicesData = [
    // Hidráulico
    { 
        id: "srv-hid-01", 
        categoryId: "cat-hidraulico", 
        title: "Troca de reparo de torneiras", 
        desc: "Fim do 'pinga-pinga'. Substituição rápida das borrachas e vedantes de torneiras e registros de gaveta ou pressão.",
        image: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=600&q=80",
        keywords: ["torneira", "vazamento", "pingando", "vedante", "registro"]
    },
    { 
        id: "srv-hid-02", 
        categoryId: "cat-hidraulico", 
        title: "Instalação de vaso sanitário", 
        desc: "Remoção do vaso antigo, instalação do novo (com caixa acoplada ou válvula) garantindo a vedação perfeita com anel de cera.",
        image: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=600&q=80",
        keywords: ["privada", "banheiro", "caixa acoplada", "sanitário"]
    },
    { 
        id: "srv-hid-03", 
        categoryId: "cat-hidraulico", 
        title: "Instalação de chuveiro elétrico", 
        desc: "Instalação segura do chuveiro, verificação da fiação imediata e testes de vazão.",
        image: "https://images.unsplash.com/photo-1620626011761-996317b8d101?auto=format&fit=crop&w=600&q=80",
        keywords: ["chuveiro", "ducha", "banho", "esquentando"]
    },

    // Elétrico
    { 
        id: "srv-ele-01", 
        categoryId: "cat-eletrico", 
        title: "Substituição de espelhos e tomadas", 
        desc: "Troca do acabamento e miolo de tomadas antigas para o novo padrão brasileiro, garantindo segurança.",
        image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=600&q=80",
        keywords: ["tomada", "espelho", "choque", "padrão novo", "interruptor"]
    },
    { 
        id: "srv-ele-02", 
        categoryId: "cat-eletrico", 
        title: "Instalação de ventilador de teto", 
        desc: "Montagem mecânica, fixação no teto e ligação elétrica completa do motor e lâmpadas do ventilador.",
        image: "https://images.unsplash.com/photo-1615873968403-89e068629265?auto=format&fit=crop&w=600&q=80",
        keywords: ["ventilador", "teto", "calor", "ar"]
    },

    // Pintor
    { 
        id: "srv-pin-01", 
        categoryId: "cat-pintor", 
        title: "Pintura de paredes internas", 
        desc: "Emassamento leve de furos de prego, lixamento e duas demãos de tinta látex ou acrílica no cômodo.",
        image: "https://images.unsplash.com/photo-1562259949-e8e7689d7828?auto=format&fit=crop&w=600&q=80",
        keywords: ["parede", "tinta", "quarto", "sala", "massa corrida"]
    },
    { 
        id: "srv-pin-02", 
        categoryId: "cat-pintor", 
        title: "Aplicação de efeito cimento queimado", 
        desc: "Preparo da parede e aplicação de massa específica de cimento queimado para criar uma parede de destaque moderna.",
        image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=600&q=80",
        keywords: ["cimento queimado", "textura", "decorativa", "parede de destaque"]
    },

    // Pedreiro
    { 
        id: "srv-ped-01", 
        categoryId: "cat-pedreiro", 
        title: "Substituição de azulejos trincados ou soltos", 
        desc: "Remoção cuidadosa das peças estufadas ou quebradas, preparo do cimento cola e assentamento de peças de reposição.",
        image: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=600&q=80",
        keywords: ["azulejo", "piso", "cerâmica", "porcelanato", "trincado"]
    },
    { 
        id: "srv-ped-02", 
        categoryId: "cat-pedreiro", 
        title: "Chumbamento de ganchos de rede", 
        desc: "Perfuração da alvenaria e fixação reforçada com cimento estrutural para garantir total segurança ao deitar na rede.",
        image: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=600&q=80",
        keywords: ["gancho", "rede", "chumbar", "parede", "furo"]
    },

    // Auxiliar de Limpeza
    { 
        id: "srv-lim-01", 
        categoryId: "cat-limpeza", 
        title: "Desengorduramento pesado de azulejos", 
        desc: "Aplicação de produtos específicos para derreter gordura acumulada nas paredes da cozinha e ao redor do fogão.",
        image: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=600&q=80",
        keywords: ["gordura", "cozinha", "fogão", "azulejo", "limpeza pesada"]
    },
    { 
        id: "srv-lim-02", 
        categoryId: "cat-limpeza", 
        title: "Limpeza detalhada de interruptores e rodapés", 
        desc: "Higienização minuciosa e manual. Removemos a sujeira encardida, marcas de dedo em espelhos de tomada e o pó acumulado em rodapés por toda a casa.",
        image: "https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?auto=format&fit=crop&w=600&q=80",
        keywords: ["rodapé", "interruptor", "tomada", "encardido", "detalhes", "mão de obra"]
    },
    { 
        id: "srv-lim-03", 
        categoryId: "cat-limpeza", 
        title: "Higienização profunda de louças sanitárias", 
        desc: "Tratamento com produtos desincrustantes para remover manchas amareladas, calcário e bactérias de pias e vasos sanitários.",
        image: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=600&q=80",
        keywords: ["vaso", "pia", "banheiro", "desinfecção", "manchas"]
    },

    // Roçador
    { 
        id: "srv-roc-01", 
        categoryId: "cat-rocador", 
        title: "Roçada de mato alto em terrenos", 
        desc: "Uso de roçadeira a gasolina para rebaixamento rápido de matagal em quintais médios e pequenos.",
        image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=600&q=80",
        keywords: ["mato", "terreno", "roçadeira", "quintal", "grama"]
    },
    { 
        id: "srv-roc-02", 
        categoryId: "cat-rocador", 
        title: "Pulverização de herbicidas ou inseticidas", 
        desc: "Aplicação técnica de produtos químicos para controle de pragas no jardim ou contenção de ervas daninhas.",
        image: "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?auto=format&fit=crop&w=600&q=80",
        keywords: ["veneno", "praga", "erva daninha", "jardim", "inseto"]
    }
];

// ESTADO DA APLICAÇÃO
let currentCategoryId = null;
let activeService = null;

// FUNÇÃO PARA PEGAR ELEMENTOS DOM COM SEGURANÇA
function getDOM() {
    return {
        searchInput: document.getElementById('search-input'),
        suggestionsBox: document.getElementById('search-suggestions'),
        categoriesGrid: document.getElementById('categories-grid'),
        servicesUl: document.getElementById('services-ul'),
        listCategoryTitle: document.getElementById('list-category-title'),
        detailCategory: document.getElementById('detail-category'),
        detailTitle: document.getElementById('detail-title'),
        detailDescription: document.getElementById('detail-description'),
        detailImageContainer: document.getElementById('detail-image-container'),
        detailImage: document.getElementById('detail-image'),
        btnCloseList: document.getElementById('btn-close-list'),
        btnCloseDetail: document.getElementById('btn-close-detail'),
        btnOpenForm: document.getElementById('btn-open-form'),
        modalQuote: document.getElementById('modal-quote'),
        btnCloseModal: document.getElementById('btn-close-modal'),
        modalServiceSubtitle: document.getElementById('modal-service-subtitle'),
        formQuote: document.getElementById('form-quote'),
        clientName: document.getElementById('client-name'),
        clientAddress: document.getElementById('client-address'),
        clientBairro: document.getElementById('client-bairro'),
        clientNotes: document.getElementById('client-notes')
    };
}

const getCategoryById = (id) => categoriesData.find(c => c.id === id);
const getServiceById = (id) => servicesData.find(s => s.id === id);

// INICIALIZAÇÃO
function init() {
    renderCategories();
    setupEventListeners();
}

// EVENT LISTENERS
function setupEventListeners() {
    const DOM = getDOM();

    if (DOM.btnCloseList) DOM.btnCloseList.addEventListener('click', closeToCategories);
    if (DOM.btnCloseDetail) DOM.btnCloseDetail.addEventListener('click', closeToCategories);
    if (DOM.searchInput) DOM.searchInput.addEventListener('input', handleSearch);

    // Modal Events
    if (DOM.btnOpenForm) DOM.btnOpenForm.addEventListener('click', openModalForm);
    if (DOM.btnCloseModal) DOM.btnCloseModal.addEventListener('click', closeModalForm);
    if (DOM.formQuote) DOM.formQuote.addEventListener('submit', handleFormSubmit);

    // Fechar sugestões ao clicar fora
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.search-container') && DOM.suggestionsBox) {
            DOM.suggestionsBox.style.display = 'none';
        }
    });
}

// RENDERIZAR CATEGORIAS
function renderCategories() {
    const DOM = getDOM();
    if (!DOM.categoriesGrid) return;

    DOM.categoriesGrid.innerHTML = '';
    categoriesData.forEach(cat => {
        const div = document.createElement('div');
        div.className = 'card-category';
        div.onclick = () => openCategory(cat.id);
        div.innerHTML = `
            <div class="icon">${cat.icon}</div>
            <div class="cat-name">${cat.name}</div>
        `;
        DOM.categoriesGrid.appendChild(div);
    });
}

// TROCA DE TELAS
function showView(viewId) {
    const DOM = getDOM();
    document.querySelectorAll('.view').forEach(el => el.classList.remove('active'));
    
    const targetView = document.getElementById(viewId);
    if (targetView) targetView.classList.add('active');
    
    if (DOM.searchInput) DOM.searchInput.value = '';
    if (DOM.suggestionsBox) DOM.suggestionsBox.style.display = 'none';
}

function closeToCategories() {
    currentCategoryId = null;
    activeService = null;
    showView('view-categories');
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// NAVEGAÇÃO DE CATEGORIAS
function openCategory(categoryId) {
    currentCategoryId = categoryId;
    const category = getCategoryById(categoryId);
    const DOM = getDOM();
    
    if (!category) return;

    if (DOM.listCategoryTitle) DOM.listCategoryTitle.textContent = category.name;
    
    const filteredServices = servicesData.filter(s => s.categoryId === categoryId);
    
    if (DOM.servicesUl) {
        DOM.servicesUl.innerHTML = '';
        filteredServices.forEach(srv => {
            const li = document.createElement('li');
            li.className = 'service-item';
            li.onclick = () => openService(srv.id);
            li.innerHTML = `
                <span>${srv.title}</span>
                <span class="arrow">›</span>
            `;
            DOM.servicesUl.appendChild(li);
        });
    }

    showView('view-service-list');
}

// ABRIR DETALHE DO SERVIÇO
function openService(serviceId) {
    const service = getServiceById(serviceId);
    if (!service) return;

    activeService = service;
    const category = getCategoryById(service.categoryId);
    const DOM = getDOM();

    if (DOM.detailCategory) DOM.detailCategory.textContent = category ? category.name : '';
    if (DOM.detailTitle) DOM.detailTitle.textContent = service.title;
    if (DOM.detailDescription) DOM.detailDescription.textContent = service.desc;

    // Atualiza a imagem do serviço
    if (service.image && DOM.detailImage) {
        DOM.detailImage.src = service.image;
        if (DOM.detailImageContainer) DOM.detailImageContainer.style.display = 'block';
    } else {
        if (DOM.detailImageContainer) DOM.detailImageContainer.style.display = 'none';
    }

    showView('view-service-detail');
}

// ABRIR MODAL DO FORMULÁRIO
function openModalForm() {
    if (!activeService) return;
    const DOM = getDOM();
    const category = getCategoryById(activeService.categoryId);
    
    if (DOM.modalServiceSubtitle) {
        DOM.modalServiceSubtitle.textContent = `${activeService.title} (${category ? category.name : ''})`;
    }
    
    if (DOM.modalQuote) {
        DOM.modalQuote.classList.add('active');
    }
}

// FECHAR MODAL DO FORMULÁRIO
function closeModalForm() {
    const DOM = getDOM();
    if (DOM.modalQuote) {
        DOM.modalQuote.classList.remove('active');
    }
}

// ENVIAR FORMULÁRIO PARA O WHATSAPP
function handleFormSubmit(e) {
    e.preventDefault();
    if (!activeService) return;

    const DOM = getDOM();
    const category = getCategoryById(activeService.categoryId);

    const name = DOM.clientName ? DOM.clientName.value.trim() : '';
    const address = DOM.clientAddress ? DOM.clientAddress.value.trim() : '';
    const bairro = DOM.clientBairro ? DOM.clientBairro.value.trim() : '';
    const notes = DOM.clientNotes ? DOM.clientNotes.value.trim() : '';

    let message = `*NOVA SOLICITAÇÃO DE ORÇAMENTO* 🛠️\n\n`;
    message += `*Serviço:* ${activeService.title}\n`;
    message += `*Categoria:* ${category ? category.name : '-'}\n\n`;
    message += `-----------------------------------\n`;
    message += `👤 *Nome:* ${name}\n`;
    message += `📍 *Endereço:* ${address}\n`;
    message += `🏘️ *Bairro:* ${bairro}\n`;
    
    if (notes) {
        message += `📝 *Observações:* ${notes}\n`;
    }
    
    message += `-----------------------------------`;

    const whatsappUrl = `https://wa.me/${CONFIG.whatsappNumber}?text=${encodeURIComponent(message)}`;
    
    window.open(whatsappUrl, '_blank');
    closeModalForm();
    if (DOM.formQuote) DOM.formQuote.reset();
}

// PESQUISA
function handleSearch(e) {
    const DOM = getDOM();
    const rawQuery = e.target.value.toLowerCase().trim();
    if (!DOM.suggestionsBox) return;

    DOM.suggestionsBox.innerHTML = '';

    if (rawQuery.length < CONFIG.minSearchLength) {
        DOM.suggestionsBox.style.display = 'none';
        return;
    }

    const query = rawQuery.normalize("NFD").replace(/[\u0300-\u036f]/g, "");

    const matches = servicesData.filter(service => {
        const category = getCategoryById(service.categoryId);
        const categoryName = category ? category.name.toLowerCase() : '';
        
        const titleMatch = service.title.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").includes(query);
        const descMatch = service.desc.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").includes(query);
        const categoryMatch = categoryName.normalize("NFD").replace(/[\u0300-\u036f]/g, "").includes(query);
        const keywordMatch = service.keywords && service.keywords.some(k => k.toLowerCase().includes(query));

        return titleMatch || descMatch || categoryMatch || keywordMatch;
    });

    if (matches.length > 0) {
        matches.forEach(match => {
            const category = getCategoryById(match.categoryId);
            const div = document.createElement('div');
            div.className = 'suggestion-item';
            div.innerHTML = `
                <div class="suggestion-title">${match.title}</div>
                <div class="suggestion-meta">${category ? category.name : ''}</div>
            `;
            
            div.onclick = () => {
                DOM.suggestionsBox.style.display = 'none';
                if (DOM.searchInput) DOM.searchInput.value = '';
                currentCategoryId = match.categoryId;
                openService(match.id);
            };
            
            DOM.suggestionsBox.appendChild(div);
        });
        DOM.suggestionsBox.style.display = 'block';
    } else {
        DOM.suggestionsBox.style.display = 'block';
        DOM.suggestionsBox.innerHTML = '<div class="suggestion-item" style="color: var(--text-muted)">Nenhum serviço encontrado.</div>';
    }
}

// GARANTE QUE O CÓDIGO SÓ RODE QUANDO O HTML ESTIVER TOTALMENTE CARREGADO
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}
