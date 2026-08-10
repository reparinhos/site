const NUMERO_WHATSAPP = "5511999999999"; 
const servicesData = [
    { id: 1, category: 'Hidráulico', icon: '💧', title: 'Troca de reparo de torneiras', desc: 'Fim do pinga-pinga em registros e torneiras.' },
    { id: 87, category: 'Auxiliar de Limpeza', icon: '🧹', title: 'Limpeza de interruptores e rodapés', desc: 'Higienização minuciosa e manual de detalhes encardidos.' },
    // Adicione os outros aqui seguindo o mesmo padrão...
];

function showView(viewId) {
    document.querySelectorAll('.view').forEach(el => el.classList.remove('active'));
    document.getElementById(viewId).classList.add('active');
}

function renderCategories() {
    const grid = document.getElementById('categories-grid');
    const cats = [...new Set(servicesData.map(s => s.category))];
    cats.forEach(cat => {
        const item = servicesData.find(s => s.category === cat);
        const div = document.createElement('div');
        div.className = 'card-category';
        div.onclick = () => openCategory(cat);
        div.innerHTML = `<div style="font-size: 2rem">${item.icon}</div><div>${cat}</div>`;
        grid.appendChild(div);
    });
}

function openCategory(category) {
    document.getElementById('list-category-title').textContent = category;
    const ul = document.getElementById('services-ul');
    ul.innerHTML = '';
    servicesData.filter(s => s.category === category).forEach(srv => {
        const li = document.createElement('li');
        li.className = 'service-item';
        li.textContent = srv.title; // Sem o número aqui
        li.onclick = () => openService(srv.id);
        ul.appendChild(li);
    });
    showView('view-service-list');
}

function openService(id) {
    const srv = servicesData.find(s => s.id === id);
    document.getElementById('detail-category').textContent = srv.category;
    document.getElementById('detail-title').textContent = srv.title; // Sem o número aqui
    document.getElementById('detail-description').textContent = srv.desc;
    document.getElementById('btn-whatsapp').href = `https://wa.me/${NUMERO_WHATSAPP}?text=Gostaria de um orçamento para: ${srv.title}`;
    showView('view-service-detail');
}

renderCategories();
