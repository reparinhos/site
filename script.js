// ==========================================================================
// RESOLVEAÍ - LÓGICA COMPLETA DA APLICAÇÃO
// ==========================================================================

const CONFIG = {
    whatsappNumber: "5521999999999", // Número para receber os orçamentos no WhatsApp
    minSearchLength: 2
};

// BANCO DE DADOS DE CATEGORIAS
const categoriesData = [
    { id: "cat-hidraulico", name: "Hidráulico", icon: "💧" },
    { id: "cat-eletrico", name: "Elétrico", icon: "⚡" },
    { id: "cat-pintor", name: "Pintor", icon: "🎨" },
    { id: "cat-pedreiro", name: "Pedreiro", icon: "🧱" },
    { id: "cat-limpeza", name: "Auxiliar de Limpeza", icon: "🧹" },
    { id: "cat-rocador", name: "Roçador & Jardinagem", icon: "🌿" }
];

// BANCO DE DADOS DE SERVIÇOS (COM IMAGENS)
const servicesData = [
    // Hidráulico
    { 
        id: "srv-hid-01", 
        categoryId: "cat-hidraulico", 
        title: "Troca de reparo de torneiras", 
        desc: "Fim do 'pinga-pinga'. Substituição rápida de vedantes, reparos de gaveta e estanqueidade de torneiras de cozinha e banheiro.",
        image: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=600&q=80",
        keywords: ["torneira", "vazamento", "pingando", "vedante", "registro"]
    },
    { 
        id: "srv-hid-02", 
        categoryId: "cat-hidraulico", 
        title: "Instalação de vaso sanitário", 
        desc: "Instalação completa de vaso sanitário com caixa acoplada, incluindo vedação com anel de cera e fixação no piso.",
        image: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=600&q=80",
        keywords: ["privada", "banheiro", "caixa acoplada", "sanitário"]
    },
    { 
        id: "srv-hid-03", 
        categoryId: "cat-hidraulico", 
        title: "Instalação de chuveiro elétrico", 
        desc: "Fixação e instalação segura de chuveiro ou ducha, verificação de fiação e testes de vazão de água.",
        image: "https://images.unsplash.com/photo-1620626011761-996317b8d101?auto=format&fit=crop&w=600&q=80",
        keywords: ["chuveiro", "ducha", "banho", "esquentando"]
    },

    // Elétrico
    { 
        id: "srv-ele-01", 
        categoryId: "cat-eletrico", 
        title: "Substituição de espelhos e tomadas", 
        desc: "Troca de módulos e espelhos velhos por modelos novos do padrão brasileiro, garantindo segurança contra choques e curtos.",
        image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=600&q=80",
        keywords: ["tomada", "espelho", "choque", "padrão novo", "interruptor"]
    },
    { 
        id: "srv-ele-02", 
        categoryId: "cat-eletrico", 
        title: "Instalação de ventilador de teto", 
        desc: "Montagem mecânica das pás, fixação segura no teto e ligação da chave de controle do ventilador e lâmpada.",
        image: "https://images.unsplash.com/photo-1615873968403-89e068629265?auto=format&fit=crop&w=600&q=80",
        keywords: ["ventilador", "teto", "calor", "ar"]
    },

    // Pintor
    { 
        id: "srv-pin-01", 
        categoryId: "cat-pintor", 
        title: "Pintura de paredes internas", 
        desc: "Preparo da superfície com emassamento de furos, lixamento e duas demãos de tinta acrílica no tom desejado.",
        image: "https://images.unsplash.com/photo-1562259949-e8e7689d7828?auto=format&fit=crop&w=600&q=80",
        keywords: ["parede", "tinta", "quarto", "sala", "massa corrida"]
    },
    { 
        id: "srv-pin-02", 
        categoryId: "cat-pintor", 
        title: "Efeito Cimento Queimado", 
        desc: "Aplicação de textura decorativa estilo cimento queimado para destacar ambientes modernos.",
        image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=600&q=80",
        keywords: ["cimento queimado", "textura", "decorativa", "parede de destaque"]
    },

    // Pedreiro
    { 
        id: "srv-ped-01", 
        categoryId: "cat-pedreiro", 
        title: "Troca de azulejos e cerâmicas", 
        desc: "Remoção de peças quebradas ou estufadas, limpeza do piso/parede e recolocação com argamassa apropriada.",
        image: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=600&q=80",
        keywords: ["azulejo", "piso", "cerâmica", "porcelanato", "trincado"]
    },
    { 
        id: "srv-ped-02", 
        categoryId: "cat-pedreiro", 
        title: "Instalação de ganchos de rede", 
        desc: "Furação e chumbamento resistente de ganchos na alvenaria para sustentação de redes com máxima segurança.",
        image: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=600&q=80",
        keywords: ["gancho", "rede", "chumbar", "parede", "furo"]
    },

    // Auxiliar de Limpeza
    { 
        id: "srv-lim-01", 
        categoryId: "cat-limpeza", 
        title: "Limpeza pesada de azulejos e engordurados", 
        desc: "Remoção de gordura impregnada em azulejos de cozinha, exaustores e superfícies engorduradas.",
        image: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=600&q=80",
        keywords: ["gordura", "cozinha", "fogão", "azulejo", "limpeza pesada"]
    },
    { 
        id: "srv-lim-02", 
        categoryId: "cat-limpeza", 
        title: "Limpeza de interruptores e rodapés", 
        desc: "Higienização detalhada de pontos encardidos, marcas de dedo e poeira acumulada em rodapés.",
        image: "https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?auto=format&fit=crop&w=600&q=80",
        keywords: ["rodapé", "interruptor", "tomada", "encardido", "detalhes"]
    },

    // Roçador
    { 
        id: "srv-roc-01", 
        categoryId: "cat-rocador", 
        title: "Roçada de terrenos e quintais", 
        desc: "Limpeza de mato alto e vegetação em quintais e terrenos com roçadeira a gasolina.",
        image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=600&q=80",
        keywords: ["mato", "terreno", "roçadeira", "quintal", "grama"]
    }
];

// ESTADO GLOBAL
let currentCategoryId = null;
let activeService = null;

// HELPERS
const getCategoryById = (id) => categoriesData.find(c => c.id === id);
const getServiceById = (id) => servicesData.find(s => s.id === id);

// INICIALIZAÇÃO
document.addEventListener('DOMContentLoaded', () => {
    initApp();
});

function initApp() {
    renderCategories();
    bindEvents();
}

// BIND DOS EVENTOS
function bindEvents() {
    const brandLogo = document.getElementById('brand-logo');
    const btnCloseList = document.getElementById('btn-close-list');
    const btnCloseDetail = document.getElementById('btn-close-detail');
    const btnOpenForm = document.getElementById('btn-open-form');
    const btnCloseModal = document.getElementById('btn-close-modal');
    const modalQuote = document.getElementById('modal-quote');
    const formQuote = document.getElementById('form-quote');
    const searchInput = document.getElementById('search-input');

    if (brandLogo) brandLogo.addEventListener('click', closeToCategories);
    if (btnCloseList) btnCloseList.addEventListener('click', closeToCategories);
    if (btnCloseDetail) btnCloseDetail.addEventListener('click', closeToCategories);

    // EVENTO PRINCIPAL: ABRIR O FORMULÁRIO (MODAL)
    if (btnOpenForm) {
        btnOpenForm.addEventListener('click', (e) => {
            e.preventDefault();
            openModalForm();
        });
    }

    // EVENTOS DO MODAL
    if (btnCloseModal) {
        btnCloseModal.addEventListener('click', closeModalForm);
    }

    // Fechar modal clicando fora da caixa
    if (modalQuote) {
        modalQuote.addEventListener('click', (e) => {
            if (e.target === modalQuote) {
                closeModalForm();
            }
        });
    }

    // SUBMIT DO FORMULÁRIO
    if (formQuote) {
        formQuote.addEventListener('submit', handleFormSubmit);
    }

    // PESQUISA EM TEMPO REAL
    if (searchInput) {
        searchInput.addEventListener('input', handleSearch);
    }

    // Fechar sugestões ao clicar fora
    document.addEventListener('click', (e) => {
        const searchBox = document.querySelector('.search-container');
        const suggestionsBox = document.getElementById('search-suggestions');
        if (searchBox && !searchBox.contains(e.target) && suggestionsBox) {
            suggestionsBox.style.display = 'none';
        }
    });
}

// RENDERIZAR CATEGORIAS
function renderCategories() {
    const grid = document.getElementById('categories-grid');
    if (!grid) return;

    grid.innerHTML = '';
    categoriesData.forEach(cat => {
        const card = document.createElement('div');
        card.className = 'card-category';
        card.onclick = () => openCategory(cat.id);
        card.innerHTML = `
            <div class="icon">${cat.icon}</div>
            <div class="cat-name">${cat.name}</div>
        `;
        grid.appendChild(card);
    });
}

// TROCA DE TELAS
function showView(viewId) {
    document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));
    
    const target = document.getElementById(viewId);
    if (target) {
        target.classList.add('active');
    }

    const suggestionsBox = document.getElementById('search-suggestions');
    if (suggestionsBox) suggestionsBox.style.display = 'none';
}

function closeToCategories() {
    currentCategoryId = null;
    activeService = null;
    showView('view-categories');
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// NAVEGAÇÃO
function openCategory(categoryId) {
    currentCategoryId = categoryId;
    const category = getCategoryById(categoryId);
    if (!category) return;

    const listTitle = document.getElementById('list-category-title');
    if (listTitle) listTitle.textContent = category.name;

    const servicesUl = document.getElementById('services-ul');
    if (servicesUl) {
        servicesUl.innerHTML = '';
        const filtered = servicesData.filter(s => s.categoryId === categoryId);

        filtered.forEach(srv => {
            const li = document.createElement('li');
            li.className = 'service-item';
            li.onclick = () => openService(srv.id);
            li.innerHTML = `
                <span>${srv.title}</span>
                <span class="arrow">›</span>
            `;
            servicesUl.appendChild(li);
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

    const detailCategory = document.getElementById('detail-category');
    const detailTitle = document.getElementById('detail-title');
    const detailDescription = document.getElementById('detail-description');
    const detailImage = document.getElementById('detail-image');
    const detailImageContainer = document.getElementById('detail-image-container');

    if (detailCategory) detailCategory.textContent = category ? category.name : '';
    if (detailTitle) detailTitle.textContent = service.title;
    if (detailDescription) detailDescription.textContent = service.desc;

    if (service.image && detailImage && detailImageContainer) {
        detailImage.src = service.image;
        detailImageContainer.style.display = 'block';
    } else if (detailImageContainer) {
        detailImageContainer.style.display = 'none';
    }

    showView('view-service-detail');
}

// ABRIR O FORMULÁRIO (MODAL)
function openModalForm() {
    const modalQuote = document.getElementById('modal-quote');
    const subtitle = document.getElementById('modal-service-subtitle');

    if (activeService && subtitle) {
        const cat = getCategoryById(activeService.categoryId);
        subtitle.textContent = `${activeService.title} (${cat ? cat.name : ''})`;
    }

    if (modalQuote) {
        modalQuote.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

// FECHAR O FORMULÁRIO (MODAL)
function closeModalForm() {
    const modalQuote = document.getElementById('modal-quote');
    if (modalQuote) {
        modalQuote.classList.remove('active');
        document.body.style.overflow = '';
    }
}

// ENVIAR ORÇAMENTO VIA WHATSAPP
function handleFormSubmit(e) {
    e.preventDefault();

    if (!activeService) {
        alert("Por favor, selecione um serviço primeiro.");
        return;
    }

    const name = document.getElementById('client-name').value.trim();
    const address = document.getElementById('client-address').value.trim();
    const bairro = document.getElementById('client-bairro').value.trim();
    const notes = document.getElementById('client-notes').value.trim();

    const category = getCategoryById(activeService.categoryId);

    let message = `*SOLICITAÇÃO DE ORÇAMENTO - RESOLVEAÍ* 🛠️\n\n`;
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
    
    const form = document.getElementById('form-quote');
    if (form) form.reset();
}

// PESQUISA
function handleSearch(e) {
    const rawQuery = e.target.value.toLowerCase().trim();
    const suggestionsBox = document.getElementById('search-suggestions');

    if (!suggestionsBox) return;

    suggestionsBox.innerHTML = '';

    if (rawQuery.length < CONFIG.minSearchLength) {
        suggestionsBox.style.display = 'none';
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
                suggestionsBox.style.display = 'none';
                document.getElementById('search-input').value = '';
                openService(match.id);
            };
            
            suggestionsBox.appendChild(div);
        });
        suggestionsBox.style.display = 'block';
    } else {
        suggestionsBox.style.display = 'block';
        suggestionsBox.innerHTML = '<div class="suggestion-item" style="color: var(--text-muted)">Nenhum serviço encontrado.</div>';
    }
}
