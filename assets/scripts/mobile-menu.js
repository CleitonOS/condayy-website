// Script para controlar o menu mobile
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuToggle = document.getElementById('mobileMenuToggle');
    const navHeader = document.getElementById('navHeader');
    const navLinks = document.querySelectorAll('.nav__header .links__header');
    
    // Criar overlay para fechar o menu
    const overlay = document.createElement('div');
    overlay.className = 'nav-overlay';
    document.body.appendChild(overlay);
    
    // Função para abrir o menu
    function openMenu() {
        mobileMenuToggle.classList.add('active');
        navHeader.classList.add('active');
        overlay.classList.add('active');
        document.body.style.overflow = 'hidden'; // Previne scroll do body
    }
    
    // Função para fechar o menu
    function closeMenu() {
        mobileMenuToggle.classList.remove('active');
        navHeader.classList.remove('active');
        overlay.classList.remove('active');
        document.body.style.overflow = ''; // Restaura scroll do body
    }
    
    // Event listener para o botão do menu
    mobileMenuToggle.addEventListener('click', function() {
        if (navHeader.classList.contains('active')) {
            closeMenu();
        } else {
            openMenu();
        }
    });
    
    // Fechar menu ao clicar no overlay
    overlay.addEventListener('click', closeMenu);
    
    // Fechar menu ao clicar em um link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            // Pequeno delay para permitir a navegação
            setTimeout(closeMenu, 300);
        });
    });
    
    // Fechar menu ao redimensionar a tela para desktop
    window.addEventListener('resize', function() {
        if (window.innerWidth > 1023) {
            closeMenu();
        }
    });
    
    // Fechar menu ao pressionar ESC
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && navHeader.classList.contains('active')) {
            closeMenu();
        }
    });
}); 