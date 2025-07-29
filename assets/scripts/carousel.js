// Carousel simples e robusto
document.addEventListener('DOMContentLoaded', function() {
  console.log('Carousel script carregado');
  
  // Elementos do carousel
  const track = document.querySelector('.carousel-track');
  const items = document.querySelectorAll('.carousel-item');
  const prevBtn = document.querySelector('.nav-btn.prev');
  const nextBtn = document.querySelector('.nav-btn.next');
  
  // Elementos do modal
  const modal = document.getElementById('imageModal');
  const modalImage = document.getElementById('modalImage');
  const modalClose = document.getElementById('modalClose');
  const modalPrev = document.getElementById('modalPrev');
  const modalNext = document.getElementById('modalNext');
  
  console.log('Elementos encontrados:', {
    track: !!track,
    items: items.length,
    prevBtn: !!prevBtn,
    nextBtn: !!nextBtn,
    modal: !!modal
  });
  
  if (!track || !items.length || !prevBtn || !nextBtn) {
    console.error('Elementos do carousel não encontrados');
    return;
  }
  
  let currentIndex = 0;
  let modalIndex = 0; // Índice separado para o modal
  let startX = 0;
  let currentX = 0;
  let startY = 0;
  let currentY = 0;
  let isDragging = false;
  let isScrolling = false;
  
  // Detectar se é dispositivo iOS
  const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) || 
                (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
  
  // Detectar se é mobile
  const isMobile = window.innerWidth <= 768;
  
  console.log('Dispositivo iOS detectado:', isIOS);
  console.log('É mobile:', isMobile);
  
  // Funções básicas do carousel
  function updateCarousel() {
    const itemWidth = items[0].offsetWidth;
    const trackWidth = track.offsetWidth;
    const gap = isMobile ? 0 : 20; // Sem gap no mobile
    
    // No mobile, sempre mostra uma imagem por vez
    if (isMobile) {
      const offset = itemWidth * currentIndex;
      track.style.transform = `translateX(-${offset}px)`;
    } else {
      // Lógica para desktop (múltiplas imagens visíveis)
      const totalItemsWidth = items.length * (itemWidth + gap) - gap;
      const visibleItems = Math.floor(trackWidth / (itemWidth + gap));
      const maxIndex = Math.max(0, items.length - visibleItems);
      
      // Garante que currentIndex esteja dentro dos limites
      currentIndex = Math.max(0, Math.min(currentIndex, maxIndex));
      
      // Calcula o offset máximo para evitar espaço em branco
      const maxOffset = Math.max(0, totalItemsWidth - trackWidth);
      const offset = Math.min((itemWidth + gap) * currentIndex, maxOffset);
      
      track.style.transform = `translateX(-${offset}px)`;
    }
    
    // Atualiza estado dos botões
    updateButtonStates();
  }
  
  function updateButtonStates() {
    let maxIndex;
    
    if (isMobile) {
      // No mobile, pode navegar até a última imagem
      maxIndex = items.length - 1;
    } else {
      // No desktop, considera múltiplas imagens visíveis
      const itemWidth = items[0].offsetWidth + 20;
      const trackWidth = track.offsetWidth;
      const visibleItems = Math.floor(trackWidth / itemWidth);
      maxIndex = Math.max(0, items.length - visibleItems);
    }
    
    // Desabilita botão anterior se estiver no início
    if (prevBtn) {
      prevBtn.style.opacity = currentIndex === 0 ? '0.5' : '1';
      prevBtn.style.cursor = currentIndex === 0 ? 'not-allowed' : 'pointer';
      prevBtn.disabled = currentIndex === 0;
    }
    
    // Desabilita botão próximo se estiver no final
    if (nextBtn) {
      nextBtn.style.opacity = currentIndex >= maxIndex ? '0.5' : '1';
      nextBtn.style.cursor = currentIndex >= maxIndex ? 'not-allowed' : 'pointer';
      nextBtn.disabled = currentIndex >= maxIndex;
    }
  }
  
  function nextSlide() {
    console.log('Próximo slide');
    
    if (isMobile) {
      // No mobile, pode ir até a última imagem
      if (currentIndex < items.length - 1) {
        currentIndex++;
        updateCarousel();
      }
    } else {
      // Lógica para desktop
      const itemWidth = items[0].offsetWidth + 20;
      const trackWidth = track.offsetWidth;
      const visibleItems = Math.floor(trackWidth / itemWidth);
      const maxIndex = Math.max(0, items.length - visibleItems);
      
      if (currentIndex < maxIndex) {
        currentIndex++;
        updateCarousel();
      }
    }
  }
  
  function prevSlide() {
    console.log('Slide anterior');
    if (currentIndex > 0) {
      currentIndex--;
      updateCarousel();
    }
  }
  
  // Event listeners para os botões
  prevBtn.addEventListener('click', function(e) {
    e.preventDefault();
    e.stopPropagation();
    console.log('Botão anterior clicado');
    if (currentIndex > 0) {
      prevSlide();
    }
  });
  
  nextBtn.addEventListener('click', function(e) {
    e.preventDefault();
    e.stopPropagation();
    console.log('Botão próximo clicado');
    
    if (isMobile) {
      if (currentIndex < items.length - 1) {
        nextSlide();
      }
    } else {
      const itemWidth = items[0].offsetWidth + 20;
      const trackWidth = track.offsetWidth;
      const visibleItems = Math.floor(trackWidth / itemWidth);
      const maxIndex = Math.max(0, items.length - visibleItems);
      
      if (currentIndex < maxIndex) {
        nextSlide();
      }
    }
  });
  
  // Modal functions
  function openModal(imageSrc) {
    if (modal && modalImage) {
      modalImage.src = imageSrc;
      // Pequeno delay para garantir que a imagem seja carregada antes de mostrar o modal
      setTimeout(() => {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
      }, 50);
    }
  }
  
  function closeModal() {
    if (modal) {
      modal.classList.remove('active');
      // Aguarda a transição terminar antes de restaurar o overflow
      setTimeout(() => {
        document.body.style.overflow = 'auto';
        // Atualiza o carrossel principal após fechar o modal
        updateCarousel();
      }, 300);
    }
  }
  
  function showImageInModal(index) {
    modalIndex = index; // Usa o índice separado do modal
    const imageSrc = items[index].querySelector('img').src;
    openModal(imageSrc);
  }
  
  // Event listeners para o modal
  if (modalClose) {
    modalClose.addEventListener('click', closeModal);
  }
  
  if (modal) {
    modal.addEventListener('click', function(e) {
      if (e.target === modal) {
        closeModal();
      }
    });
  }
  
  // Navegação no modal
  if (modalPrev) {
    modalPrev.addEventListener('click', function(e) {
      e.preventDefault();
      e.stopPropagation();
      if (modalIndex > 0) {
        modalIndex--;
        showImageInModal(modalIndex);
      }
    });
  }
  
  if (modalNext) {
    modalNext.addEventListener('click', function(e) {
      e.preventDefault();
      e.stopPropagation();
      if (modalIndex < items.length - 1) {
        modalIndex++;
        showImageInModal(modalIndex);
      }
    });
  }
  
  // Event listeners para clicar nas imagens
  items.forEach(function(item, index) {
    item.addEventListener('click', function(e) {
      // Previne conflito com touch events
      if (isDragging) {
        e.preventDefault();
        return;
      }
      modalIndex = index; // Define o índice do modal
      showImageInModal(index);
    });
  });
  
  // Touch events melhorados para mobile
  track.addEventListener('touchstart', function(e) {
    startX = e.touches[0].clientX;
    startY = e.touches[0].clientY;
    currentX = startX;
    currentY = startY;
    isDragging = true;
    isScrolling = false;
    track.style.transition = 'none';
    
    console.log('Touch start:', { startX, startY });
  }, { passive: false });
  
  track.addEventListener('touchmove', function(e) {
    if (!isDragging) return;
    
    currentX = e.touches[0].clientX;
    currentY = e.touches[0].clientY;
    const diffX = currentX - startX;
    const diffY = currentY - startY;
    
    // Se ainda não determinamos se é scroll ou swipe
    if (!isScrolling) {
      // Se o movimento for mais vertical que horizontal, permite o scroll da página
      if (Math.abs(diffY) > Math.abs(diffX) && Math.abs(diffY) > 10) {
        isScrolling = true;
        isDragging = false;
        track.style.transition = 'transform 0.4s ease';
        updateCarousel();
        return;
      }
      
      // Se o movimento for horizontal, previne scroll da página
      if (Math.abs(diffX) > 10) {
        isScrolling = false;
        e.preventDefault();
      }
    }
    
    // Se já determinamos que é um swipe horizontal
    if (!isScrolling && Math.abs(diffX) > 10) {
      e.preventDefault();
      
      const itemWidth = items[0].offsetWidth;
      const currentOffset = itemWidth * currentIndex;
      const newOffset = currentOffset - diffX;
      track.style.transform = `translateX(-${newOffset}px)`;
    }
  }, { passive: false });
  
  track.addEventListener('touchend', function(e) {
    if (!isDragging || isScrolling) {
      isDragging = false;
      isScrolling = false;
      track.style.transition = 'transform 0.4s ease';
      updateCarousel();
      return;
    }
    
    isDragging = false;
    track.style.transition = 'transform 0.4s ease';
    
    const diffX = currentX - startX;
    // Aumenta o threshold para iOS (mais sensível)
    const threshold = isIOS ? 80 : 50;
    
    console.log('Touch end:', { diffX, threshold, isIOS });
    
    if (Math.abs(diffX) > threshold) {
      if (diffX > 0) {
        // Movimento para direita - slide anterior
        if (currentIndex > 0) {
          prevSlide();
        } else {
          updateCarousel(); // Volta para posição inicial
        }
      } else {
        // Movimento para esquerda - próximo slide
        if (isMobile) {
          if (currentIndex < items.length - 1) {
            nextSlide();
          } else {
            updateCarousel(); // Volta para posição final
          }
        } else {
          const itemWidth = items[0].offsetWidth + 20;
          const trackWidth = track.offsetWidth;
          const visibleItems = Math.floor(trackWidth / itemWidth);
          const maxIndex = Math.max(0, items.length - visibleItems);
          
          if (currentIndex < maxIndex) {
            nextSlide();
          } else {
            updateCarousel(); // Volta para posição final
          }
        }
      }
    } else {
      updateCarousel();
    }
  }, { passive: false });
  
  // Previne conflitos de scroll
  track.addEventListener('scroll', function(e) {
    e.preventDefault();
  }, { passive: false });
  
  // Keyboard navigation
  document.addEventListener('keydown', function(e) {
    if (modal && modal.classList.contains('active')) {
      if (e.key === 'Escape') {
        closeModal();
      } else if (e.key === 'ArrowLeft') {
        modalPrev && modalPrev.click();
      } else if (e.key === 'ArrowRight') {
        modalNext && modalNext.click();
      }
    }
  });
  
  // Resize handler
  window.addEventListener('resize', function() {
    // Atualiza a detecção de mobile
    const wasMobile = isMobile;
    const newIsMobile = window.innerWidth <= 768;
    
    if (wasMobile !== newIsMobile) {
      // Se mudou de mobile para desktop ou vice-versa, reinicia o índice
      currentIndex = 0;
    }
    
    updateCarousel();
  });
  
  // Inicialização
  console.log('Inicializando carousel...');
  updateCarousel();
  console.log('Carousel inicializado');
});


