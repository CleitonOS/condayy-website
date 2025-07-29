// Script para destacar a navegação ativa baseada na seção visível
document.addEventListener('DOMContentLoaded', function() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav__header a[href^="#"]');
    const header = document.querySelector('.header');
    
    let lastScrollTop = 0;
    
    // Função para verificar qual seção está visível
    function highlightActiveSection() {
        let current = '';
        const scrollPosition = window.scrollY + 150; // Offset para melhor detecção
        
        // Se estiver no topo da página, destaca "Home"
        if (scrollPosition < 200) {
            current = 'home';
        } else {
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.clientHeight;
                
                if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                    current = section.getAttribute('id');
                }
            });
        }
        
        // Remove a classe ativa de todos os links
        navLinks.forEach(link => {
            link.classList.remove('nav-active');
        });
        
        // Adiciona a classe ativa ao link correspondente
        navLinks.forEach(link => {
            const href = link.getAttribute('href');
            if (href === `#${current}`) {
                link.classList.add('nav-active');
            }
        });
    }
    
    // Função para controlar o comportamento do header no scroll
    function handleHeaderScroll() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Adiciona classe para header compacto quando rolar para baixo
        if (scrollTop > 100) {
            header.classList.add('header-scrolled');
        } else {
            header.classList.remove('header-scrolled');
        }
        
        // Efeito de hide/show baseado na direção do scroll (apenas desktop)
        if (window.innerWidth > 1023) {
            if (scrollTop > lastScrollTop && scrollTop > 200) {
                // Rolando para baixo - esconde header
                header.classList.add('header-hidden');
            } else {
                // Rolando para cima - mostra header
                header.classList.remove('header-hidden');
            }
        }
        
        lastScrollTop = scrollTop;
    }
    
    // Adiciona o evento de scroll com throttling para melhor performance
    let ticking = false;
    function requestTick() {
        if (!ticking) {
            requestAnimationFrame(() => {
                highlightActiveSection();
                handleHeaderScroll();
            });
            ticking = true;
        }
    }
    
    window.addEventListener('scroll', function() {
        ticking = false;
        requestTick();
    });
    
    // Executa uma vez no carregamento para definir o estado inicial
    highlightActiveSection();
    handleHeaderScroll();
}); 