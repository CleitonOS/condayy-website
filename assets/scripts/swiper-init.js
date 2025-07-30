// Inicialização do Swiper
document.addEventListener('DOMContentLoaded', function() {
    const swiper = new Swiper('.swiper-container', {
        // Configurações básicas
        slidesPerView: 1,
        spaceBetween: 20,
        loop: false, // Removido o loop infinito
        centeredSlides: true,
        
        // Configurações responsivas
        breakpoints: {
            // Mobile (até 768px)
            320: {
                slidesPerView: 1,
                spaceBetween: 15,
                centeredSlides: true,
            },
            // Tablet (768px - 1024px)
            768: {
                slidesPerView: 2,
                spaceBetween: 20,
                centeredSlides: true,
            },
            // Desktop (1024px+)
            1024: {
                slidesPerView: 3,
                spaceBetween: 25,
                centeredSlides: true,
            },
            // Telas grandes (1200px+)
            1200: {
                slidesPerView: 4,
                spaceBetween: 30,
                centeredSlides: true,
            }
        },
        
        // Navegação
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        
        // Paginação
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
            dynamicBullets: true,
        },
        
        // Autoplay (opcional)
        autoplay: {
            delay: 5000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
        },
        
        // Efeitos
        effect: 'slide',
        speed: 600,
        
        // Touch e gestos
        grabCursor: true,
        touchRatio: 1,
        touchAngle: 45,
        resistance: true,
        resistanceRatio: 0.85,
        
        // Melhorias para touch
        touchStartPreventDefault: true,
        touchMoveStopPropagation: true,
        touchReleaseOnEdges: true,
        touchEventsTarget: 'container',
        
        // Sensibilidade do touch
        shortSwipes: true,
        longSwipes: true,
        longSwipesRatio: 0.5,
        longSwipesMs: 300,
        followFinger: true,
        threshold: 10,
        
        // Melhorias para mobile
        watchOverflow: true,
        watchSlidesProgress: true,
        watchSlidesVisibility: true,
        
        // Prevenção de conflitos
        preventInteractionOnTransition: false,
        
        // Callbacks
        on: {
            init: function() {
                console.log('Swiper inicializado com sucesso!');
            },
            slideChange: function() {
                // Callback quando o slide muda
            }
        }
    });
    
    // Modal para visualização das imagens
    const slides = document.querySelectorAll('.swiper-slide img');
    const modal = document.createElement('div');
    modal.className = 'image-modal';
    modal.innerHTML = `
        <div class="modal-content">
            <img class="modal-image" src="" alt="Imagem ampliada">
        </div>
        <button class="modal-close">&times;</button>
        <button class="modal-nav modal-prev">&#10094;</button>
        <button class="modal-nav modal-next">&#10095;</button>
    `;
    document.body.appendChild(modal);
    
    let currentSlideIndex = 0;
    
    // Abrir modal ao clicar nos slides
    const slideElements = document.querySelectorAll('.swiper-slide');
    slideElements.forEach((slide, index) => {
        slide.addEventListener('click', (e) => {
            // Só abre o modal se não foi um swipe
            if (!swiper.isAnimating) {
                e.preventDefault();
                e.stopPropagation();
                currentSlideIndex = index;
                openModal(index);
            }
        });
    });
    
    // Fechar modal
    const closeBtn = modal.querySelector('.modal-close');
    closeBtn.addEventListener('click', closeModal);
    
    // Navegação no modal
    const prevBtn = modal.querySelector('.modal-prev');
    const nextBtn = modal.querySelector('.modal-next');
    
    prevBtn.addEventListener('click', () => {
        currentSlideIndex = (currentSlideIndex - 1 + slides.length) % slides.length;
        updateModalImage();
    });
    
    nextBtn.addEventListener('click', () => {
        currentSlideIndex = (currentSlideIndex + 1) % slides.length;
        updateModalImage();
    });
    
    // Fechar modal com ESC
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeModal();
        }
    });
    
    // Fechar modal clicando fora da imagem
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });
    
    function openModal(index) {
        const modalImg = modal.querySelector('.modal-image');
        modalImg.src = slides[index].src;
        modalImg.alt = slides[index].alt;
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
    
    function closeModal() {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
    
    function updateModalImage() {
        const modalImg = modal.querySelector('.modal-image');
        modalImg.src = slides[currentSlideIndex].src;
        modalImg.alt = slides[currentSlideIndex].alt;
    }
}); 