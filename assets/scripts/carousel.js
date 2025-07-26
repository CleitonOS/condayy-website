
  const track = document.querySelector('.carousel-track');
  const items = document.querySelectorAll('.carousel-item');
  const prevBtn = document.querySelector('.nav-btn.prev');
  const nextBtn = document.querySelector('.nav-btn.next');

  let currentIndex = 0;
  let startX = 0;
  let currentX = 0;
  let isDragging = false;

  function getVisibleItemsCount() {
    const containerWidth = document.querySelector('.carousel-wrapper').offsetWidth;
    const itemWidth = items[0].offsetWidth + 20; // considera o gap de 20px
    return Math.floor(containerWidth / itemWidth);
  }

  function updateCarousel() {
    const itemWidth = items[0].offsetWidth + 20;
    const visibleItems = getVisibleItemsCount();
    const maxIndex = Math.max(0, items.length - visibleItems);
    currentIndex = Math.min(currentIndex, maxIndex);
    const offset = itemWidth * currentIndex;
    track.style.transform = `translateX(-${offset}px)`;
  }

  function nextSlide() {
    const visibleItems = getVisibleItemsCount();
    const maxIndex = Math.max(0, items.length - visibleItems);
    if (currentIndex < maxIndex) {
      currentIndex++;
      updateCarousel();
    }
  }

  function prevSlide() {
    if (currentIndex > 0) {
      currentIndex--;
      updateCarousel();
    }
  }

  // Event listeners para os botões
  nextBtn.addEventListener('click', nextSlide);
  prevBtn.addEventListener('click', prevSlide);

  // Touch events para gestos (apenas mobile)
  track.addEventListener('touchstart', (e) => {
    startX = e.touches[0].clientX;
    isDragging = true;
    track.style.transition = 'none'; // Remove transição durante o drag
  });

  track.addEventListener('touchmove', (e) => {
    if (!isDragging) return;
    
    e.preventDefault(); // Previne scroll da página
    currentX = e.touches[0].clientX;
    const diffX = currentX - startX;
    
    // Aplica transformação em tempo real durante o swipe
    const itemWidth = items[0].offsetWidth + 20;
    const currentOffset = itemWidth * currentIndex;
    const newOffset = currentOffset - diffX;
    
    track.style.transform = `translateX(-${newOffset}px)`;
  });

  track.addEventListener('touchend', (e) => {
    if (!isDragging) return;
    
    isDragging = false;
    track.style.transition = 'transform 0.4s ease'; // Restaura transição
    
    const diffX = currentX - startX;
    const threshold = 50; // Distância mínima para considerar como swipe
    
    if (Math.abs(diffX) > threshold) {
      if (diffX > 0) {
        // Swipe para direita - slide anterior
        prevSlide();
      } else {
        // Swipe para esquerda - próximo slide
        nextSlide();
      }
    } else {
      // Volta para a posição atual se o swipe foi muito pequeno
      updateCarousel();
    }
  });

  window.addEventListener('resize', () => {
    updateCarousel();
  });

  window.addEventListener('load', () => {
    updateCarousel();
  });

