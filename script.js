// Função para alternar a exibição do menu de navegação em dispositivos móveis
function toggleMenu() {
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        // Alterna a classe 'show' para cada link, exceto o ícone do menu
        if (!link.classList.contains('menu-icon')) {
            link.classList.toggle('show');
        }
    });
}