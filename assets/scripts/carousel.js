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
    const itemWidth = items[0].offsetWidth + 20;
    const visibleItems = Math.floor(track.offsetWidth / itemWidth);
    const maxIndex = Math.max(0, items.length - visibleItems);
    currentIndex = Math.min(currentIndex, maxIndex);
    const offset = itemWidth * currentIndex;
    track.style.transform = `translateX(-${offset}px)`;
  }
  
  function nextSlide() {
    console.log('Próximo slide');
    const visibleItems = Math.floor(track.offsetWidth / (items[0].offsetWidth + 20));
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
    prevSlide();
  });
  
  nextBtn.addEventListener('click', function(e) {
    e.preventDefault();
    console.log('Botão próximo clicado');
    nextSlide();
  });
  
  // Modal functions
  function openModal(imageSrc) {
    if (modal && modalImage) {
      modalImage.src = imageSrc;
      modal.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
  }
  
  function closeModal() {
    if (modal) {
      modal.classList.remove('active');
      document.body.style.overflow = 'auto';
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
    isDragging = true;
    track.style.transition = 'none';
  });
  
  track.addEventListener('touchmove', function(e) {
    if (!isDragging) return;
    e.preventDefault();
    currentX = e.touches[0].clientX;
    const diffX = currentX - startX;
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
        prevSlide();
      } else {
        nextSlide();
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


