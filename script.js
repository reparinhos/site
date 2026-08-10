const servicesData = [
    { id: 1, category: 'Hidráulico', icon: '💧', title: 'Troca de torneiras', desc: 'Reparo rápido para vazamentos.' },
    { id: 87, category: 'Limpeza', icon: '🧹', title: 'Limpeza de rodapés', desc: 'Higienização profunda.' }
];

function showView(viewId) {
    document.querySelectorAll('.view').forEach(el => el.classList.remove('active'));
    document.getElementById(viewId).classList.add('active');
    document.getElementById('content-area').scrollTop = 0; // Reseta scroll ao mudar tela
    document.getElementById('search-suggestions').style.display = 'none';
}

function openCategory(cat) {
    document.getElementById('list-category-title').textContent = cat;
    const ul = document.getElementById('services-ul');
    ul.innerHTML = '';
    servicesData.filter(s => s.category === cat).forEach(srv => {
        const li = document.createElement('li');
        li.className = 'service-item';
        li.textContent = srv.title;
        li.onclick = () => openService(srv.id);
        ul.appendChild(li);
    });
    showView('view-service-list');
}

function openService(id) {
    const srv = servicesData.find(s => s.id === id);
    document.getElementById('detail-category').textContent = srv.category;
    document.getElementById('detail-title').textContent = srv.title;
    document.getElementById('detail-description').textContent = srv.desc;
    document.getElementById('btn-whatsapp').href = `https://wa.me/5511999999999?text=Orçamento: ${srv.title}`;
    showView('view-service-detail');
}

// Renderiza categorias inicial
const grid = document.getElementById('categories-grid');
[...new Set(servicesData.map(s => s.category))].forEach(cat => {
    const s = servicesData.find(x => x.category === cat);
    const div = document.createElement('div');
    div.className = 'card-category';
    div.onclick = () => openCategory(cat);
    div.innerHTML = `<div style="font-size:2rem">${s.icon}</div>${cat}`;
    grid.appendChild(div);
});
