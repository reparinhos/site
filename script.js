// CONFIGURAÇÕES GERAIS
const CONFIG = {
    whatsappNumber: "5511999999999",
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
        keywords: ["torneira", "vazamento", "pingando", "vedante", "registro"]
    },
    { 
        id: "srv-hid-02", 
        categoryId: "cat-hidraulico", 
        title: "Instalação de vaso sanitário", 
        desc: "Remoção do vaso antigo, instalação do novo (com caixa acoplada ou válvula) garantindo a vedação perfeita com anel de cera.",
        keywords: ["privada", "banheiro", "caixa acoplada", "sanitário"]
    },
    { 
        id: "srv-hid-03", 
        categoryId: "cat-hidraulico", 
        title: "Instalação de chuveiro elétrico", 
        desc: "Instalação segura do chuveiro, verificação da fiação imediata e testes de vazão.",
        keywords: ["chuveiro", "ducha", "banho", "esquentando"]
    },

    // Elétrico
    { 
        id: "srv-ele-01", 
        categoryId: "cat-eletrico", 
        title: "Substituição de espelhos e tomadas", 
        desc: "Troca do acabamento e miolo de tomadas antigas para o novo padrão brasileiro, garantindo segurança.",
        keywords: ["tomada", "espelho", "choque", "padrão novo", "interruptor"]
    },
    { 
        id: "srv-ele-02", 
        categoryId: "cat-eletrico", 
        title: "Instalação de ventilador de teto", 
        desc: "Montagem mecânica, fixação no teto e ligação elétrica completa do motor e lâmpadas do ventilador.",
        keywords: ["ventilador", "teto", "calor", "ar"]
    },

    // Pintor
    { 
        id: "srv-pin-01", 
        categoryId: "cat-pintor", 
        title: "Pintura de paredes internas", 
        desc: "Emassamento leve de furos de prego, lixamento e duas demãos de tinta látex ou acrílica no cômodo.",
        keywords: ["parede", "tinta", "quarto", "sala", "massa corrida"]
    },
    { 
        id: "srv-pin-02", 
        categoryId: "cat-pintor", 
        title: "Aplicação de efeito cimento queimado", 
        desc: "Preparo da parede e aplicação de massa específica de cimento queimado para criar uma parede de destaque moderna.",
        keywords: ["cimento queimado", "textura", "decorativa", "parede de destaque"]
    },

    // Pedreiro
    { 
        id: "srv-ped-01", 
        categoryId: "cat-pedreiro", 
        title: "Substituição de azulejos trincados ou soltos", 
        desc: "Remoção cuidadosa das peças estufadas ou quebradas, preparo do cimento cola e assentamento de peças de reposição.",
        keywords: ["azulejo", "piso", "cerâmica", "porcelanato", "trincado"]
    },
    { 
        id: "srv-ped-02", 
        categoryId: "cat-pedreiro", 
        title: "Chumbamento de ganchos de rede", 
        desc: "Perfuração da alvenaria e fixação reforçada com cimento estrutural para garantir total segurança ao deitar na rede.",
        keywords: ["gancho", "rede", "chumbar", "parede", "furo"]
    },

    // Auxiliar de Limpeza
    { 
        id: "srv-lim-01", 
        categoryId: "cat-limpeza", 
        title: "Desengorduramento pesado de azulejos", 
        desc: "Aplicação de produtos específicos para derreter gordura acumulada nas paredes da cozinha e ao redor do fogão.",
        keywords: ["gordura", "cozinha", "fogão", "azulejo", "limpeza pesada"]
    },
    { 
        id: "srv-lim-02", 
        categoryId: "cat-limpeza", 
        title: "Limpeza detalhada de interruptores e rodapés", 
        desc: "Higienização minuciosa e manual. Removemos a sujeira encardida, marcas de dedo em espelhos de tomada e o pó acumulado em rodapés por toda a casa.",
        keywords: ["rodapé", "interruptor", "tomada", "encardido", "detalhes", "mão de obra"]
    },
    { 
        id: "srv-lim-03", 
        categoryId: "cat-limpeza", 
        title: "Higienização profunda de louças sanitárias", 
        desc: "Tratamento com produtos desincrustantes para remover manchas amareladas, calcário e bactérias de pias e vasos sanitários.",
        keywords: ["vaso", "pia", "banheiro", "desinfecção", "manchas"]
    },

    // Roçador
    { 
        id: "srv-roc-01", 
        categoryId: "cat-rocador", 
        title: "Roçada de mato alto em terrenos", 
        desc: "Uso de roçadeira a gasolina para rebaixamento rápido de matagal em quintais médios e pequenos.",
        keywords: ["mato", "terreno", "roçadeira", "quintal", "grama"]
    },
    { 
        id: "srv-roc-02", 
        categoryId: "cat-rocador", 
        title: "Pulverização de herbicidas ou inseticidas", 
        desc: "Aplicação técnica de produtos químicos para controle de pragas no jardim ou contenção de ervas daninhas.",
        keywords: ["veneno", "praga", "erva daninha", "jardim", "inseto"]
    }
];

// ESTADO DA APLICAÇÃO
let currentCategoryId = null;

// ELEMENTOS DOM
const DOM = {
    searchInput: document.getElementById('search-input'),
    suggestionsBox: document.getElementById('search-suggestions'),
    categoriesGrid: document.getElementById('categories-grid'),
    servicesUl: document.getElementById('services-ul'),
    listCategoryTitle: document.getElementById('list-category-title'),
    detailCategory: document.getElementById('detail-category'),
    detailTitle: document.getElementById('detail-title'),
    detailDescription: document.getElementById('detail-description'),
    btnWhatsapp: document.getElementById('btn-whatsapp'),
    btnCloseList: document.getElementById('btn-close-list'),
    btnCloseDetail: document.getElementById('btn-close-detail')
};

// HELPERS
const getCategoryById = (id) => categoriesData.find(c => c.id === id);
const getServiceById = (id) => servicesData.find(s => s.id === id);

// INICIALIZAÇÃO
function init() {
    renderCategories();
    setupEventListeners();
}

// EVENT LISTENERS
function setupEventListeners() {
    DOM.btnCloseList.addEventListener('click', closeToCategories);
    DOM.btnCloseDetail.addEventListener('click', closeToCategories);
    DOM.searchInput.addEventListener('input', handleSearch);

    document.addEventListener('click', (e) => {
        if (!e.target.closest('.search-container')) {
            DOM.suggestionsBox.style.display = 'none';
        }
    });
}

// RENDERIZAR CATEGORIAS EM CARDS HORIZONTAIS
function renderCategories() {
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
    document.querySelectorAll('.view').forEach(el => el.classList.remove('active'));
    document.getElementById(viewId).classList.add('active');
    
    DOM.searchInput.value = '';
    DOM.suggestionsBox.style.display = 'none';
}

function closeToCategories() {
    currentCategoryId = null;
    showView('view-categories');
}

// NAVEGAÇÃO DE CATEGORIAS
function openCategory(categoryId) {
    currentCategoryId = categoryId;
    const category = getCategoryById(categoryId);
    
    if (!category) return;

    DOM.listCategoryTitle.textContent = category.name;
    
    const filteredServices = servicesData.filter(s => s.categoryId === categoryId);
    
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

    showView('view-service-list');
}

// ABRIR DETALHE DO SERVIÇO
function openService(serviceId) {
    const service = getServiceById(serviceId);
    if (!service) return;

    const category = getCategoryById(service.categoryId);

    DOM.detailCategory.textContent = category ? category.name : '';
    DOM.detailTitle.textContent = service.title;
    DOM.detailDescription.textContent = service.desc;

    const textWs = `Olá! Gostaria de solicitar um orçamento para o serviço *${service.title}* (${category ? category.name : ''}).`;
    DOM.btnWhatsapp.href = `https://wa.me/${CONFIG.whatsappNumber}?text=${encodeURIComponent(textWs)}`;

    showView('view-service-detail');
}

// PESQUISA
function handleSearch(e) {
    const rawQuery = e.target.value.toLowerCase().trim();
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
                DOM.searchInput.value = '';
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

// INICIALIZAR APLICAÇÃO
init();
