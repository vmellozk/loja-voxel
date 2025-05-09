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


//
interface ProductCardState {
  currentIndex: number;
  images: string[];
}

document.addEventListener("DOMContentLoaded", () => {
  const cards = document.querySelectorAll(".product-card");

  cards.forEach(card => {
    const imageContainer = card.querySelector(".image-carousel") as HTMLElement;
    const imgElement = imageContainer.querySelector(".carousel-img") as HTMLImageElement;
    const prevBtn = imageContainer.querySelector(".prev") as HTMLButtonElement;
    const nextBtn = imageContainer.querySelector(".next") as HTMLButtonElement;

    const imageData = card.getAttribute("data-images");
    if (!imageData) return;

    const images = JSON.parse(imageData) as string[];
    const state: ProductCardState = {
      currentIndex: 0,
      images,
    };

    imgElement.src = state.images[state.currentIndex];

    const updateImage = () => {
      imgElement.src = state.images[state.currentIndex];
    };

    prevBtn.addEventListener("click", (event) => {
      event.preventDefault();
      event.stopPropagation();
      state.currentIndex = (state.currentIndex - 1 + state.images.length) % state.images.length;
      updateImage();
    });

    nextBtn.addEventListener("click", (event) => {
      event.preventDefault();
      event.stopPropagation();
      state.currentIndex = (state.currentIndex + 1) % state.images.length;
      updateImage();
    });

    card.addEventListener("mouseenter", () => {
      if (state.images.length > 1) {
        prevBtn.style.display = "block";
        nextBtn.style.display = "block";
      }
    });

    card.addEventListener("mouseleave", () => {
      prevBtn.style.display = "none";
      nextBtn.style.display = "none";
    });

    // Oculta os botões se só tiver uma imagem
    if (state.images.length <= 1) {
      prevBtn.style.display = "none";
      nextBtn.style.display = "none";
    }
  });
});
