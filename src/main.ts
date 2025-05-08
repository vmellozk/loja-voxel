// Entry point for custom JS if needed
const images: string[] = [
    'images/banner1.png',
    'images/banner2.png',
    'images/banner3.png',
    'images/banner4.png'
  ];
  
  const bannerImg = document.querySelector<HTMLImageElement>('.banner-img');
  const dots = document.querySelectorAll<HTMLSpanElement>('.banner-pagination span');
  let currentIndex = 0;
  let interval: ReturnType<typeof setInterval>;
  
  function showSlide(index: number) {
    if (bannerImg) bannerImg.src = images[index];
    dots.forEach(dot => dot.classList.remove('active'));
    dots[index].classList.add('active');
    currentIndex = index;
  }
  
  function nextSlide() {
    currentIndex = (currentIndex + 1) % images.length;
    showSlide(currentIndex);
  }
  
  function startInterval() {
    interval = setInterval(nextSlide, 5000);
  }
  
  function resetInterval() {
    clearInterval(interval);
    startInterval();
  }
  
  // Clique nos botões
  dots.forEach(dot => {
    dot.addEventListener('click', () => {
      const index = parseInt(dot.getAttribute('data-index') || '0', 10);
      showSlide(index);
      resetInterval();
    });
  });
  
  // Inicializa
  showSlide(currentIndex);
  startInterval();
  