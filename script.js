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
