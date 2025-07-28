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
  let startX = 0;
  let currentX = 0;
  let isDragging = false;
  
  // Funções básicas do carousel
  function updateCarousel() {
    const itemWidth = items[0].offsetWidth + 20; // 20px é o gap
    const trackWidth = track.offsetWidth;
    const totalItemsWidth = items.length * itemWidth;
    
    // Calcula quantos itens são visíveis na tela
    const visibleItems = Math.floor(trackWidth / itemWidth);
    
    // Calcula o índice máximo permitido
    const maxIndex = Math.max(0, items.length - visibleItems);
    
    // Garante que currentIndex esteja dentro dos limites
    currentIndex = Math.max(0, Math.min(currentIndex, maxIndex));
    
    // Calcula o offset máximo para evitar espaço em branco
    const maxOffset = Math.max(0, totalItemsWidth - trackWidth);
    const offset = Math.min(itemWidth * currentIndex, maxOffset);
    
    track.style.transform = `translateX(-${offset}px)`;
    
    // Atualiza estado dos botões
    updateButtonStates();
  }
  
  function updateButtonStates() {
    const itemWidth = items[0].offsetWidth + 20;
    const trackWidth = track.offsetWidth;
    const visibleItems = Math.floor(trackWidth / itemWidth);
    const maxIndex = Math.max(0, items.length - visibleItems);
    
    // Desabilita botão anterior se estiver no início
    if (prevBtn) {
      prevBtn.style.opacity = currentIndex === 0 ? '0.5' : '1';
      prevBtn.style.cursor = currentIndex === 0 ? 'not-allowed' : 'pointer';
    }
    
    // Desabilita botão próximo se estiver no final
    if (nextBtn) {
      nextBtn.style.opacity = currentIndex >= maxIndex ? '0.5' : '1';
      nextBtn.style.cursor = currentIndex >= maxIndex ? 'not-allowed' : 'pointer';
    }
  }
  
  function nextSlide() {
    console.log('Próximo slide');
    const itemWidth = items[0].offsetWidth + 20;
    const trackWidth = track.offsetWidth;
    const visibleItems = Math.floor(trackWidth / itemWidth);
    const maxIndex = Math.max(0, items.length - visibleItems);
    
    if (currentIndex < maxIndex) {
      currentIndex++;
      updateCarousel();
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
    console.log('Botão anterior clicado');
    if (currentIndex > 0) {
      prevSlide();
    }
  });
  
  nextBtn.addEventListener('click', function(e) {
    e.preventDefault();
    console.log('Botão próximo clicado');
    const itemWidth = items[0].offsetWidth + 20;
    const trackWidth = track.offsetWidth;
    const visibleItems = Math.floor(trackWidth / itemWidth);
    const maxIndex = Math.max(0, items.length - visibleItems);
    
    if (currentIndex < maxIndex) {
      nextSlide();
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
      }, 300);
    }
  }
  
  function showImageInModal(index) {
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
    modalPrev.addEventListener('click', function() {
      if (currentIndex > 0) {
        currentIndex--;
        showImageInModal(currentIndex);
      }
    });
  }
  
  if (modalNext) {
    modalNext.addEventListener('click', function() {
      if (currentIndex < items.length - 1) {
        currentIndex++;
        showImageInModal(currentIndex);
      }
    });
  }
  
  // Event listeners para clicar nas imagens
  items.forEach(function(item, index) {
    item.addEventListener('click', function() {
      currentIndex = index;
      showImageInModal(index);
    });
  });
  
  // Touch events para mobile
  track.addEventListener('touchstart', function(e) {
    startX = e.touches[0].clientX;
    const startY = e.touches[0].clientY;
    isDragging = true;
    track.style.transition = 'none';
    
    // Armazena a posição inicial do Y para detectar movimento vertical
    track.startY = startY;
  });
  
  track.addEventListener('touchmove', function(e) {
    if (!isDragging) return;
    
    currentX = e.touches[0].clientX;
    const currentY = e.touches[0].clientY;
    const diffX = currentX - startX;
    const diffY = currentY - track.startY;
    
    // Se o movimento for mais vertical que horizontal, permite o scroll da página
    if (Math.abs(diffY) > Math.abs(diffX)) {
      isDragging = false;
      track.style.transition = 'transform 0.4s ease';
      updateCarousel();
      return;
    }
    
    // Só previne o comportamento padrão se o movimento for horizontal
    if (Math.abs(diffX) > 10) {
      e.preventDefault();
    }
    
    const itemWidth = items[0].offsetWidth + 20;
    const currentOffset = itemWidth * currentIndex;
    const newOffset = currentOffset - diffX;
    track.style.transform = `translateX(-${newOffset}px)`;
  });
  
  track.addEventListener('touchend', function(e) {
    if (!isDragging) return;
    isDragging = false;
    track.style.transition = 'transform 0.4s ease';
    const diffX = currentX - startX;
    const threshold = 50;
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
    } else {
      updateCarousel();
    }
  });
  
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
  window.addEventListener('resize', updateCarousel);
  
  // Inicialização
  console.log('Inicializando carousel...');
  updateCarousel();
  console.log('Carousel inicializado');
});


